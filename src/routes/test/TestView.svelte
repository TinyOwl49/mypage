<script lang="ts">
	import { T, useTask } from "@threlte/core";
	import { Grid, Sky } from "@threlte/extras";
	import * as THREE from "three";

	// Svelte 5 Props: Receive count from parent
	let { count = 8 }: { count: number } = $props();

	// Structure to store each sphere's Lorenz attractor state
	interface SphereData {
		id: number;
		x: number;
		y: number;
		z: number;
		renderX: number;
		renderY: number;
		renderZ: number;
		color: string;
		trailPoints: THREE.Vector3[];
		meshRef?: THREE.Mesh;
		geomRef?: THREE.BufferGeometry;
	}

	let cameraRef = $state<THREE.PerspectiveCamera>();
	let spheres = $state<SphereData[]>([]);
	let cameraAngle = 0;

	let nextId = 0;
	function addSphere() {
		const id = nextId++;
		// Tiny difference in initial position to show chaos divergence (butterfly effect)
		const perturbation = id * 0.005;
		const hue = (id * 137.5) % 360; // Distinct and beautiful colors via golden angle distribution
		const color = `hsl(${hue}, 95%, 65%)`;

		spheres.push({
			id,
			x: 0.1,
			y: 0.0,
			z: 20.0 + perturbation,
			renderX: 0.1,
			renderY: 20.0 + perturbation - 25,
			renderZ: 0.0,
			color,
			trailPoints: [],
		});
	}

	// Svelte 5 reactive effect to match the prop count
	$effect(() => {
		while (spheres.length < count) {
			addSphere();
		}
		while (spheres.length > count) {
			spheres.pop();
		}
	});

	useTask((delta: number) => {
		// Limit delta to prevent massive jumps when tab is inactive/lagging
		const dt = Math.min(delta, 0.1) * 0.9;

		// Lorenz Attractor parameters
		const sigma = 10;
		const rho = 28;
		const beta = 8 / 3;

		for (const sphere of spheres) {
			// Lorenz ODEs calculation
			const dx = sigma * (sphere.y - sphere.x) * dt;
			const dy =
				(sphere.x * (rho - sphere.z) - sphere.y) * dt;
			const dz = (sphere.x * sphere.y - beta * sphere.z) * dt;

			sphere.x += dx;
			sphere.y += dy;
			sphere.z += dz;

			// Map Lorenz coordinates to Three.js coordinates:
			// Lorenz Z is vertical, map it to Three.js Y (centered by subtracting 25)
			// Lorenz X and Y map to Three.js X and Z
			sphere.renderX = sphere.x;
			sphere.renderY = sphere.z - 25;
			sphere.renderZ = sphere.y;

			// Update the sphere's mesh position directly for optimal performance
			if (sphere.meshRef) {
				sphere.meshRef.position.set(
					sphere.renderX,
					sphere.renderY,
					sphere.renderZ,
				);
			}

			// Record history for the path trail
			const currentPos = new THREE.Vector3(
				sphere.renderX,
				sphere.renderY,
				sphere.renderZ,
			);
			sphere.trailPoints.push(currentPos);
			if (sphere.trailPoints.length > 300) {
				sphere.trailPoints.shift();
			}

			// Update buffer geometry points
			if (sphere.geomRef) {
				sphere.geomRef.setFromPoints(
					sphere.trailPoints,
				);
			}
		}

		if (cameraRef) {
			cameraRef.position.x = Math.cos(cameraAngle) * 55;
			cameraRef.position.z = Math.sin(cameraAngle) * 55;
			cameraRef.position.y = 12; // Elevated perspective
			cameraRef.lookAt(0, 0, 0); // Always look at the center of the attractor
		}
	});
</script>

<T.PerspectiveCamera
	makeDefault
	bind:ref={cameraRef}
	position={[55, 12, 55]}
	fov={45}
/>

<!-- Bright Lighting Setup -->
<T.AmbientLight intensity={0.9} />
<T.DirectionalLight position={[20, 50, 20]} intensity={2.5} castShadow />
<T.DirectionalLight position={[-20, -50, -20]} intensity={1.0} />

<!-- Render spheres and their trails -->
{#each spheres as sphere (sphere.id)}
	<!-- Spheres -->
	<T.Mesh
		bind:ref={sphere.meshRef}
		position={[sphere.renderX, sphere.renderY, sphere.renderZ]}
		castShadow
	>
		<T.SphereGeometry args={[0.7]} />
		<T.MeshStandardMaterial
			roughness={0.15}
			metalness={0.9}
			color={sphere.color}
		/>
	</T.Mesh>

	<!-- Colorful Trails -->
	<T.Line>
		<T.BufferGeometry bind:ref={sphere.geomRef} />
		<T.LineBasicMaterial
			color={sphere.color}
			linewidth={2.5}
			transparent
			opacity={0.7}
		/>
	</T.Line>
{/each}

<!-- Bottom Floor Grid to ground the 3D space -->
<Grid
	position.y={-25}
	cellColor="#333333"
	sectionColor="#ffffff"
	sectionThickness={0.5}
	fadeDistance={80}
	cellSize={5}
/>
