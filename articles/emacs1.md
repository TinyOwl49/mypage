---
title: Emacs に入門してみた
description: Emacs に入門してみました
date: 2026-08-22
tags: [日記, Programming]
thumbnail: /thumbnails/EmacsIcon.svg
---

<script>
  import EmbedLink from '$lib/components/EmbedLink.svelte';
  import ZoomableImage from "$lib/components/ZoomableImage.svelte";
  import { asset } from "$app/paths";
</script>


## なぜ？
私は今までずっと Neovim を愛用してきました。かっこいいからです。  
Emacs も同じくらいかっこいいと思ったので、いつか触りたいと思っていました。
入門のハードルが高いイメージがどうしてもあったので先伸ばしていましたが、なんだか急にやる気が出てきたので入門します。

もう一つの理由として、Org Mode の存在があります。
最近は AI がすごーいため、タスク管理,日記,プロジェクトの管理,勉強ノートなど全てをテキストベースで管理したい欲求が出てきました。
そこで Markdown よりもカスタマイズ性の高いものがないかなと思い調べていたところ、Org Mode に辿り着きました。
Org Mode は Emacs の専門分野らしい、ということで Emacs を使うときです。

## 導入
### 参考にしたサイト
<EmbedLink url="https://qiita.com/yasushi00/items/cb1d228d9d74b0014cea" />
<EmbedLink url="https://dev.classmethod.jp/articles/emacs-org-mode-kwsh-2025/" />
<EmbedLink url="https://tamura70.hatenadiary.org/entry/20100203/org" />

init.el の設定は以下のサイトを参考にしました。
<EmbedLink url="https://a.conao3.com/blog/2024/7c7c265/" />
<EmbedLink url="https://emacs-jp.github.io/tips/emacs-in-2020" />

Doom Emacs の導入など
<EmbedLink url="https://qiita.com/futomaru/items/5a2c5ad1d450f695d1cd" />

なんか同じEmacsでもいくつか種類があるらしいですが、全然わからん！のでとりあえずemacs-macというやつを導入しました。

## 感想
### 動かせない
キーバインドが独特すぎて、最初はまともに動かせません。というか、終了する方法すら分からなかった。  
ハードル高いです。

### Emacs Lispが難しい
Emacsの設定ファイルはEmacs Lispという言語で書くのですが、この言語がなかなか癖があります。
今だにあんまりわかっていないので、ちゃんと学びたい。

### Evil が素晴らしい
Vim のキーバインドが恋しくなったため調べて見たところ、Evil というプラグインがあると知り早速導入しました。
これがかなり快適で、Vim のキーバインディングでできることがほとんどできる印象です。  
Doom Emacs の場合、最初から入っているみたい。

### Org-mode がすごい
Org-mode は Markdown のようにプレーンテキストで文章の装飾をできる記法なのですが、Markdown よりもだいぶ拡張性があります。  
TODO リストの作成やカレンダーとの連携、表の計算、プログラムの実行、数式の表示...などなど。これらが一つのファイルで書けるのは非常にロマンがありますね。  
最初聞いた時ナニソレ？と思ったのですが、実際に使ってみると確かに一言で説明するのが難しいものだな...という印象を受けました。
もはやこのファイル単体で動くアプリケーションのようなものらしい？

ただ、これもできることが多すぎる上に初期設定ではほとんど何もできないため、非常にハードルが高いと感じました。  
拡張性がほぼ無限にあるため、どのように運用していけばいいか非常に悩みます。
多分詳しい人の設定を真似るのがいいのでしょう。これは沼どころじゃない...  

### 意外と見た目はモダン（にできる）
Emacs は見た目が古いイメージがあったのですが、結局設定次第でモダンにすることができます。  
ただ、どうしても限界があるらしく、変えられない部分もあるようです。

### Doom Emacs
初期設定が難し過ぎたので、結局 Doom Emacs を導入しました。
これは設定が最初からある程度整っている状態で使える Emacs です。
lsp や org-mode がすぐ使えるのが嬉しい。
<EmbedLink url="https://github.com/doomemacs/core" />
今のところはこれで十分かなと思っています。
ちなみに見た目はこんな感じです。

<ZoomableImage src={asset("/imgs/articles/emacs-beginner/screen.webp")} alt="Emacs の画面" width="100%"/>

### Org mode 再び
Org mode で勉強ノートを取りたかったので、LaTeX の設定を追加しました。
```lisp
(after! org
  ;; LaTeX の数式を SVG で表示する(そのままだと数式がガビガビになります)
  (setq org-preview-latex-default-process 'dvisvgm)
  ;; LaTeX の数式のサイズを大きくする(デフォルトだと小さく感じました)
  (setq org-format-latex-options (plist-put org-format-latex-options :scale 1.2))
)
```
org-mode で以下のように LaTeX を使うことができます。
```org
#+LATEX_HEADER: \usepackage{amsmath}
#+LATEX_HEADER: \DeclareMathOperator*{\Res}{Res}

* 複素関数
    ** コーシー・リーマンの関係式
    \(z = x + iy\), \(f(z) = u(x, y) + iv(x, y)\) とおく。\(f(z)\) が領域 D で正則であるための必要十分条件は、以下の２つの条件が成り立つことである。
    1. \(u(x, y)\), \(v(x, y)\) が領域 D で偏微分可能でその導関数が連続
    2. コーシー・リーマンの関係式
        \[
        \frac{\partial u(x, y)}{\partial x} = \frac{\partial v(x, y)}{\partial y}
        \]
        \[
        \frac{\partial u(x, y)}{\partial y} = - \frac{\partial v(x, y)}{\partial x}
        \]
    が成り立つ。
```
数式をプレビューするとき C-c C-x C-l , 画像をプレビューするときは C-c C-x C-v です。  
こんな感じに表示されます。

<ZoomableImage src={asset("/imgs/articles/emacs-beginner/latex_sample.webp")} alt="Emacs LaTeX" width="100%"/>

### 今の悩み
- 起動が遅いのと、動作がもっさりしています。速度はしょうがない部分もあるみたいですが、たまにフリーズするのは直したい。
- 結局プログラミングをするときは慣れてる Neovim を使ってしまっています。軽いし、CLIでサクサク動かせるのが便利すぎます。
- 奥が深過ぎてまだ全然使いこなせていないです。本とかで体系的に学んだ方がいいのかなと思いはじめた。
