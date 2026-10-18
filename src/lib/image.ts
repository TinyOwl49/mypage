import { asset } from '$app/paths';

export function imageSrc(src: string): string {
	return /^https?:\/\//.test(src) ? src : asset(src as any);
}
