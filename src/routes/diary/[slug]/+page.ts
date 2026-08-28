import { getDiaryBySlug } from "$lib/diary";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
	const post = await getDiaryBySlug(params.slug);
	return { post: post || error(404, "日報が見つかりませんでした") };
}
