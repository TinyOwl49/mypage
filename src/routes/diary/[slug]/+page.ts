import { getDiaryBySlug, getNextAndPreviousDiarySlug } from "#lib/diary.ts";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
    const diary = await getDiaryBySlug(params.slug);
    const np = getNextAndPreviousDiarySlug(params.slug);
    return {
        post: diary || error(404, "日記が見つかりませんでした"),
        next: np?.next,
        previous: np?.previous
    }
}
