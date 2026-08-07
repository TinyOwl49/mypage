---
title: このブログについて
description: このブログの誕生秘話です。
date: 2026-05-01
tags: [日記]
thumbnail: /thumbnails/helloblog.png
---

<script>
    import EmbedLink from '$lib/components/EmbedLink.svelte';
	import { resolve } from "$app/paths";
</script>

## 自己紹介
こんにちは。猫梟犬、そういう種類の犬です。  
大学で主に物理学と情報科学を学んでいます。
趣味はプログラミングとお絵描きです。  

## 個人ブログを作った理由
私の趣味のことを書ける場所が欲しかったからです。
もちろん、SNSや有名どころのブログサービスを利用する手がありますが、
もっと自由に何かを書いたり作ったりしてみたいと常々思っていたので、自分で作ることにしました。  
最近はAIちゃんが優秀なので、色々作りやすくなりましたね。

## 使った技術
このブログはSvelteKit + Typescript + SCSSで作られています。  
SvelteはReactのようなUIライブラリで、SvelteKitはNext.jsやNuxt.jsと同じ立ち位置のフレームワークです。
記法がシンプルで直感的なことや、レンダリング時ではなくコンパイラ次に最適化を施すため、Reactに比べて軽量という特徴があります。  
私の好きなライブラリです。おすすめです。
<EmbedLink url="https://svelte.jp/" />

UIの設計にはSCSSを使用しました。CSSに変数や関数のような機能を追加したCSSの拡張言語です。  
最初はTailwind CSSを使っていたのですが、逆に整ってないレイアウトにしたい気持ちが生えてきたのでSCSSに変えました。
結果的にあんまり変わらない見た目になりました。


Markdownパーサーにはmdsvexを使用しました。
これはMDXというライブラリのSvelte版で、設定が簡単な上にSvelteコンポーネントを埋め込めるのが非常に良い点です。
```html
<script>
    import EmbedLink from '$lib/components/EmbedLink.svelte';
</script>

**埋め込みリンク** を使用できる
<EmbedLink url="https://mdsvex.com/" />
```
みたいなことができます。  

デプロイ先にはVercelを選びました。
元々はGithub Pagesを使っていたのですが、VercelだとSveltekitのSSRが使える、すなわちサーバーサイドの実装ができるので、今後の拡張性を考えて選びました。
かなりシンプルで使いやすい上に、噂通り表示が早いです。
<EmbedLink url="https://vercel.com/tiny-owl" />

## 最後に
ソースコードは[こちら](https://github.com/TinyOwl49/mypage)  
ぼちぼち更新していきたいと思います。
