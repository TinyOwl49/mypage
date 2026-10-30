import { getLatestDiary } from "$lib/diary";
import { error } from "@sveltejs/kit";

export async function load({ }) {
	const latestDiary = await getLatestDiary();
	return { latestDiary: latestDiary || error(404, "日報が見つかりませんでした") };
}
