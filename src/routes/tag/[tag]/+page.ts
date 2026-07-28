import { getAllArticles } from "$lib/article";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
	const { articles } = getAllArticles();
	const tag = decodeURIComponent(params.tag);

	const filteredArticles = articles.filter((article) =>
		article.tags?.includes(tag)
	);

	if (filteredArticles.length === 0) {
		return error(404, `タグ "${tag}" の記事が見つかりませんでした`);
	}

	return {
		tag,
		articles: filteredArticles
	};
}
