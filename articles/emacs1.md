---
title: Emacsに入門してみた
description: Emacsに入門してみました
date: 2026-05-01
tags: [日記, Programming]
thumbnail: /thumbnails/helloblog.png
---

<script>
  import EmbedLink from '$lib/components/EmbedLink.svelte';
</script>


## なぜ？
私は今までずっとNeovimを愛用してきました。かっこいいからです。  
Emacsも同じくらいかっこいいと思ったので、いつか触りたいと思っていました。
Emacsは入門のハードルが高いイメージがどうしてもあったので先伸ばしていましたが、なんだか急にやる気が出てきたので入門することにしました。  

もう一つ大きな理由があります。Org Modeの存在です。
近年AIが出てきたためタスク管理, 日記からプロジェクトの管理まで、全てをテキストベースで管理したい欲求が出てきました。
そこでMarkdownよりもカスタマイズ性の高いものがないかなと思い調べていたところ、Org Modeに辿り着きました。
Org ModeはEmacsの専門分野らしい、ということでEmacsを使うときです。

## 導入
### 参考にしたサイト
<EmbedLink url="https://qiita.com/yasushi00/items/cb1d228d9d74b0014cea" />
<EmbedLink url="https://dev.classmethod.jp/articles/emacs-org-mode-kwsh-2025/" />
<EmbedLink url="https://tamura70.hatenadiary.org/entry/20100203/org" />

init.elの設定は以下のサイトを参考にしました。
<EmbedLink url="https://a.conao3.com/blog/2024/7c7c265/" />
<EmbedLink url="https://emacs-jp.github.io/tips/emacs-in-2020" />

- [Emacs使いがMacOSで行う設定メモ](https://qiita.com/yasushi00/items/cb1d228d9d74b0014cea)
- [Emacs org-modeを使ったタスク管理一例(2025年)](https://dev.classmethod.jp/articles/emacs-org-mode-kwsh-2025/)
- [Emacs org-modeを使ってみる: (1) インストール](https://tamura70.hatenadiary.org/entry/20100203/org)

init.elの設定は以下のサイトを参考にしました。  
- [2025年からを生きるためのEmacs入門](https://a.conao3.com/blog/2024/7c7c265/)
- [2020年代のEmacs入門](emacs-jp.github.io/tips/emacs-in-2020)

## 感想
### 動かせない
最初の画面はVimみたいで親近感が湧きました。  
しかし、キーを押してびっくり。何のキーが何の機能か全くわかりません。キーをガチャガチャしてたら変なページに飛ばされて、戻れなくなりました。  
そもそもどうやって終了するの？MacはCommand+Qでアプリを終了できるのですが、謎の操作に割り当てられているようで終了できません。
実は、終了はCtrl+Xを押した後にCtrl+Cを押すとできるのですが、そんなの初見でわかるわけありません！厳しいって...  

とっつきにくさがVim以上とは、驚きました。  
まともにコードを書けるようになるまでに１週間以上がかかりました。

### Evilが素晴らしい
Emacsのキーが独特すぎてまともに動かせずに数時間を過ごし、Vimのキーバインドが恋しくなったため調べて見たところ、Evilというプラグインがあると知り早速導入しました。
これがかなり快適で、Vimのキーバインディングでできることがほとんどできる印象です。  
とりあえずこれに頼れば、Emacsのキーバインドを覚えなくてもいけるかもしれない。

### Org-modeがすごい
Org-modeはMarkdownのようにプレーンテキストで文章の装飾をできるような記法なのですが、Markdownよりもだいぶ拡張性があります。  
TODOリストの作成やカレンダーとの連携、表の計算、プログラムの実行、数式の表示...などなど。これらが一つのファイルで書けるのは非常にロマンがありますね。  

ただ、これもできることが多すぎる上に初期設定ではほとんど何もできないため、非常にハードルが高いと感じました。  
また、同じことですが拡張性がほぼ無限にあるため、どのように運用していけばいいか非常に悩みます。
多分詳しい人の設定を真似るのがいいのでしょう。これは沼どころじゃない...  

### Markdown-modeがすごい
Emacsは当然Markdownもかけます。個人的にはEmacsの書き心地がかなり高いと感じました。
ほぼObsidianです。  

### 意外と見た目はモダン（にできる）
Emacsは見た目が古いイメージがあったのですが、結局設定次第でモダンにすることができます。  


