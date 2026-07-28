export const prerender = false;

import { json, type RequestHandler } from '@sveltejs/kit';
import ogs from 'open-graph-scraper';

export const GET: RequestHandler = async ({ url }) => {
	const targetUrl = url.searchParams.get('url');

	if (!targetUrl) {
		return json({ error: 'URLが指定されていません' }, { status: 400 });
	}

	try {
		const { result, error } = await ogs({ url: targetUrl });

		if (error) {
			throw new Error('OGPデータの取得に失敗しました');
		}

		// 画像URLの抽出 (ogImageは配列で返ってくる場合があるため対処)
		let imageUrl = '';
		if (result.ogImage && result.ogImage.length > 0) {
			imageUrl = result.ogImage[0].url;
		}

		return json({
			title: result.ogTitle || result.twitterTitle || targetUrl,
			description: result.ogDescription || result.twitterDescription || '',
			image: imageUrl,
			url: result.ogUrl || result.requestUrl || targetUrl
		});

	} catch (error) {
		console.error('OGP Fetch Error (ogs):', error);
		return json({ error: 'OGPの取得に失敗しました' }, { status: 500 });
	}
};
