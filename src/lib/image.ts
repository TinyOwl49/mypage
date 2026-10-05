import { asset } from '$app/paths';

// R2 などの外部 URL はそのまま、static 内のパスは asset() を通して返す
// (asset() に外部 URL を渡すとビルド時にエラーになるため)
export function imageSrc(src: string): string {
	return /^https?:\/\//.test(src) ? src : asset(src as any);
}
