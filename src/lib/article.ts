export type Article = {
	slug: string;
	title: string;
	content: any; // Svelte コンポーネント
	description: string;
	date: string;
	tags?: string[];
	thumbnail?: string;
};

export async function getArticleBySlug(slug: string) {
	const allPostFiles = import.meta.glob('/articles/*.md');
	const path = `/articles/${slug}.md`;

	if (!(path in allPostFiles)) {
		return null;
	}

	try {
		const post = (await allPostFiles[path]()) as any;

		return {
			slug,
			title: post.metadata.title,
			description: post.metadata.description || '',
			content: post.default,
			date: post.metadata.date,
			tags: post.metadata.tags || [],
			thumbnail: post.metadata.thumbnail || null
		} as Article;
	} catch (e) {
		console.error(`Error loading article ${slug}:`, e);
		return null;
	}
}

export function getAllArticles(): { articles: Article[] } {
	const allPostFiles = import.meta.glob('/articles/[^_]*.md', { eager: true });

	const posts = Object.entries(allPostFiles).map(([path, file]) => {
		const module = file as any;
		const slug = path.split('/').pop()?.replace('.md', '') || '';
		const metadata = module.metadata;

		return {
			slug,
			title: metadata.title,
			description: metadata.description || '',
			content: module.default,
			date: metadata.date,
			tags: metadata.tags || [],
			thumbnail: metadata.thumbnail || null
		} as Article;
	});


	posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return { articles: posts };
}
