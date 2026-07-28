import { getArticleBySlug } from "$lib/article";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
	const post = await getArticleBySlug(params.slug);

	return {
		post: post || error(404, "記事が見つかりませんでした")
	};
}
