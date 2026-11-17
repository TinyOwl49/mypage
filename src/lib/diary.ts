export type Diary = {
    slug: string;
    title: string;
    content: any; // Svelte コンポーネント
    description: string;
    date: string;
    thumbnail?: string;
};

async function getDiaryData(path: string, slug?: string) {
    if (!slug) {
        slug = path.split('/').pop()?.replace('.md', '') || '';
    }
    const allDiaryFiles = import.meta.glob('/diary/*.md');

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

export async function getDiaryBySlug(slug: string) {
    const allDiaryFiles = import.meta.glob('/diary/*.md');
    const path = `/diary/${slug}.md`;

    if (!(path in allDiaryFiles)) {
        return null;
    }

    return await getDiaryData(path, slug);
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

export async function getLatestDiary() {
    const allDiaryFiles = import.meta.glob('/diary/*.md');
    const filepaths = Object.keys(allDiaryFiles);
    if (filepaths.length <= 0) return null;

    const path = filepaths[filepaths.length - 1];

    return await getDiaryData(path);
}

export function getNextAndPreviousDiarySlug(date: string) {
    const allDiaryFiles = import.meta.glob('/diary/*.md');
    const filepaths = Object.keys(allDiaryFiles);
    if (filepaths.length <= 0) return null;

    const index = filepaths.indexOf(`/diary/${date}.md`);
    if (index == -1) return null;

    let next = null;
    if (index < filepaths.length - 1) {
        const nextPath = filepaths[index + 1];
        next = nextPath.split('/').pop()?.replace('.md', '') || '';
    }
    let previous = null;
    if (index > 0) {
        const previousPath = filepaths[index - 1];
        previous = previousPath.split('/').pop()?.replace('.md', '') || '';
    }

    return { next: next, previous: previous };
}
