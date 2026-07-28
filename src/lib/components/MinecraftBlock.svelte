<script lang="ts">
	import { T, useTask } from "@threlte/core";
	import { OrbitControls } from "@threlte/extras";
	import * as THREE from "three";
	import { resolve } from "$app/paths";

	// Svelte 5 Props
	let {
		rotationSpeed = 1,
		wireframe = false,
		lightIntensity = 1.5,
		spinSpeed = 0,
	} = $props();

	let meshRef = $state<THREE.Mesh>();
	let cameraRef = $state<THREE.PerspectiveCamera>();

	// Load textures (served from public/static folder mapped to root /)
	const loader = new THREE.TextureLoader();
const topTex = loader.load(`${resolve('/')}imgs/minecraft/default_grass.png`);
	const bottomTex = loader.load(
		`${resolve('/')}imgs/minecraft/default_dirt.png`,
	);
	const sideTex = loader.load(
		`${resolve('/')}imgs/minecraft/default_grass_side.png`,
	);

	// Configure textures for pixel art (Minecraft look)
	[topTex, bottomTex, sideTex].forEach((tex) => {
		tex.magFilter = THREE.NearestFilter;
		tex.minFilter = THREE.NearestFilter;
		tex.colorSpace = THREE.SRGBColorSpace;
	});

	// BoxGeometry materials order: px, nx, py, ny, pz, nz
	// px = Right, nx = Left, py = Top, ny = Bottom, pz = Front, nz = Back
	const materials = [
		new THREE.MeshStandardMaterial({
			map: sideTex,
			roughness: 0.85,
			metalness: 0.05,
		}), // px
		new THREE.MeshStandardMaterial({
			map: sideTex,
			roughness: 0.85,
			metalness: 0.05,
		}), // nx
		new THREE.MeshStandardMaterial({
			map: topTex,
			roughness: 0.85,
			metalness: 0.05,
		}), // py
		new THREE.MeshStandardMaterial({
			map: bottomTex,
			roughness: 0.85,
			metalness: 0.05,
		}), // ny
		new THREE.MeshStandardMaterial({
			map: sideTex,
			roughness: 0.85,
			metalness: 0.05,
		}), // pz
		new THREE.MeshStandardMaterial({
			map: sideTex,
			roughness: 0.85,
			metalness: 0.05,
		}), // nz
	];

	// Reactively toggle wireframe mode
	$effect(() => {
		materials.forEach((mat) => {
			mat.wireframe = wireframe;
		});
	});

	// Simple frame task to rotate, bob the block, and keep camera aligned
	useTask((delta: number) => {
		if (meshRef) {
			// Base rotation
			meshRef.rotation.y += delta * 0.5 * rotationSpeed;

			// Gentle bobbing effect using sine wave
			meshRef.rotation.x =
				Math.sin(Date.now() * 0.0015) * 0.12;

			// Apply spin speed boost if active
			if (spinSpeed > 0) {
				meshRef.rotation.y += delta * spinSpeed;
			}
		}

		// Keep the camera aligned to look at the block center
		if (cameraRef) {
			cameraRef.lookAt(0, 0, 0);
		}
	});
</script>

<!-- Camera setup with a beautiful elevated isometric view angle -->
<T.PerspectiveCamera
	makeDefault
	bind:ref={cameraRef}
	position={[2.0, 1.6, 2.0]}
	fov={45}
>
	<!-- OrbitControls for interactive drag-to-rotate and zoom -->
	<OrbitControls enableDamping enableZoom={true} />

	<!-- Primary light source matching camera angle for good highlight visibility -->
	<T.DirectionalLight
		position={[5, 10, 5]}
		intensity={lightIntensity}
		castShadow
	/>
</T.PerspectiveCamera>

<!-- Ambient lighting to keep shaded sides recognizable -->
<T.AmbientLight intensity={0.65} />

<!-- Subtle fill light from the opposite direction -->
<T.DirectionalLight position={[-5, 3, -5]} intensity={0.3} />

<!-- The Dirt/Grass Block Mesh -->
<T.Mesh bind:ref={meshRef} material={materials}>
	<T.BoxGeometry args={[1, 1, 1]} />
</T.Mesh>
