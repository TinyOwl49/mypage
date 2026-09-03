export type Diary = {
	slug: string;
	title: string;
	content: any; // Svelte コンポーネント
	description: string;
	date: string;
	thumbnail?: string;
};

export async function getDiaryBySlug(slug: string) {
	const allDiaryFiles = import.meta.glob('/diary/*.md');
	const path = `/diary/${slug}.md`;

	if (!(path in allDiaryFiles)) {
		return null;
	}

	try {
		const diary = (await allDiaryFiles[path]()) as any;

		return {
			slug,
			title: diary.metadata.title,
			description: diary.metadata.description || '',
			content: diary.default,
			date: diary.metadata.date,
			thumbnail: diary.metadata.thumbnail || null
		} as Diary;
	} catch (e) {
		console.error(`Error loading diary ${slug}:`, e);
		return null;
	}
}

export function getAllDiary(): { diaries: Diary[] } {
	const allDiaryFiles = import.meta.glob('/diary/[^_]*.md', { eager: true });

	const diaries = Object.entries(allDiaryFiles).map(([path, file]) => {
		const module = file as any;
		const slug = path.split('/').pop()?.replace('.md', '') || '';
		const metadata = module.metadata;

		return {
			slug,
			title: metadata.title,
			description: metadata.description || '',
			content: module.default,
			date: metadata.date,
			thumbnail: metadata.thumbnail || null
		} as Diary;
	});

	diaries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return { diaries: diaries };
}
