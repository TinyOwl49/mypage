---
title: シマウマのシマシマ、どうしてシマシマ？
description: ずんだゼミの部誌に投稿した内容です。
date: 2026-11-21
tags: [数学, Programming]
thumbnail: https://img.nyanowl.me/articles/shimauma/shimauma_gray-8cec0b0d.webp
---

<script>
  import ZoomableImage from "$lib/components/ZoomableImage.svelte";
</script>

## はじめに
この記事は2026年の東北大学祭にて販売した<a href="https://x.com/ZundaSeminar" target="_blank" rel="noopener noreferrer">ずんだゼミ</a>の部誌へ投稿したものです。

## 動物の縞模様

<br>
<ZoomableImage src="https://img.nyanowl.me/articles/shimauma/shimauma_gray-8cec0b0d.webp" class="img-center" />
<div class="img-caption">
<span>
図1: シマウマ
</span>
</div>
<br>

シマウマと聞いて一番最初に思い浮かべるのは、やはりその特徴的な縞模様でしょう。
そもそもどうしてシマウマはあんなにシマシマなのか。
ライオンなどの捕食者に見つかりにくくなる、虫がつきにくくなるなどがよく理由として挙げられますが、実のところ本当の理由はいまだにわかってないそうです。

シマウマのようなシマシマをもつ生き物は他にもたくさんいます。
特にウミウシや熱帯魚など海の生き物では、このような特徴的な模様を持つものが何種類か知られています。
例えば、ヤマトヤッコという熱帯魚は画像のような縞模様を持っています。
この魚は性転換をするのですが、面白いことにメスの時は縞模様がなくオスになると模様が出てくるようです。

<ZoomableImage src="https://img.nyanowl.me/articles/shimauma/fish_image-d17694aa.webp" class="img-center" />

<div class="img-caption">
<span>
図2: ヤマトヤッコ（左）とヒレナガヤッコ（右）の縞模様。
画像は Shoji H, Mochizuki A, Iwasa Y, Hirata M, Watanabe T, Hioki S, et al. Origin of directionality in the fish stripe pattern. Dev Dyn. 2003;226:627-633. より引用
</span>
</div>
<br>
  
こんなにも特徴的な模様、一体どうやってできるのでしょうか。この問題に対して、コンピュータ科学の父として有名なアラン・チューリングは「チューリングパターン」と呼ばれるモデルを考案しました。
このモデルでは活性化因子と抑制因子という性質の異なる２つの化学物質を仮定します。
活性化因子がシマウマの黒い部分を作り出し、抑制因子が増えると活性化因子の数が抑えられるとします。
このような状況を表す最も簡単なモデルとして、以下のようなものが考えられます。

$$
\begin{align}
\frac{du}{dt} & = \lambda + a u - b v \tag{1} \\
\frac{dv}{dt} & = \mu    + c u - d v \tag{2}
\end{align}
$$

ただし、$u$は活性化因子の濃度、$v$は抑制因子の濃度、$a, b, c, d, \lambda, \mu$は正の定数です。
$au$は活性因子が自分自身が多いとさらに多く生成されることを、$-bv$は抑制因子が多いと活性因子の増加が抑えられることを表します。
$\lambda$は活性因子の自然生成、$\mu$は抑制因子の自然生成を表します。
これらの式は一様な平衡状態($u_0, v_0$)を持ち、これが安定だとします<sup id="fnref-1"><a href="#fn-1">1</a></sup>。しかしながら、このモデルでは単に安定解に収束していくだけで、縞模様はできません。

## 拡散
このモデルに物質の拡散を表す項を加えることを考えます。
時刻 $t$ における位置 $x$ での物質の濃度を $u(x, t)$ とします。
時間 $\Delta t$ の間に、その場所にある物質のうち $m$ の割合の物質が流出し、そのうち半分は $\Delta x$ 離れた右に、もう半分は左に流出していくとします。当然位置 $x - \Delta x$ と $x + \Delta x$ からの流入もあるので、その収支を式で書くと、

$$
u(x, t + \Delta t) - u(x, t)
= \frac{m}{2} u(x - \Delta x, t)
+ \frac{m}{2} u(x + \Delta x, t)
- m u(x, t)
$$

となります。
両辺を $\Delta t$ で割ると、

$$
\frac{u(x, t + \Delta t) - u(x, t)}{\Delta t}
= \frac{m}{2 \Delta t}
\left[ u(x - \Delta x, t) + u(x + \Delta x, t) - 2 u(x, t) \right]
\tag{4}
$$

となります。右辺の $u(x - \Delta x, t)$ と $u(x + \Delta x, t)$ を $x$ についてテイラー展開すると、

$$
\begin{align*}
u(x - \Delta x, t)
 & = u(x, t)
- \frac{\partial u(x, t)}{\partial x} \Delta x
+ \frac{\partial^2 u(x, t)}{\partial x^2} \frac{(\Delta x)^2}{2} \\
& - \frac{\partial^3 u(x, t)}{\partial x^3} \frac{(\Delta x)^3}{6}
+ O\bigl((\Delta x)^4\bigr), \\
u(x + \Delta x, t)
 & = u(x, t)
+ \frac{\partial u(x, t)}{\partial x} \Delta x
+ \frac{\partial^2 u(x, t)}{\partial x^2} \frac{(\Delta x)^2}{2} \\
& + \frac{\partial^3 u(x, t)}{\partial x^3} \frac{(\Delta x)^3}{6}
+ O\bigl((\Delta x)^4\bigr)
\end{align*}
$$

となります。この２つを足し合わせると、1 次と 3 次の項は打ち消し合うので、

$$
u(x - \Delta x, t) + u(x + \Delta x, t) - 2 u(x, t)
= \frac{\partial^2 u(x, t)}{\partial x^2} (\Delta x)^2
+ O\bigl((\Delta x)^4\bigr)
$$

となります。これを式(4)に代入すると、

$$
\frac{u(x, t + \Delta t) - u(x, t)}{\Delta t}
= \frac{m (\Delta x)^2}{2 \Delta t}
\frac{\partial^2 u(x, t)}{\partial x^2}
+ O\!\left( \frac{(\Delta x)^4}{\Delta t} \right)
$$

が得られます。ここで、$\Delta x \to 0$、$\Delta t \to 0$ の以下の極限が存在すると仮定します。

$$
\frac{m (\Delta x)^2}{2 \Delta t} \to D
$$

このとき誤差項 $O\!\left( (\Delta x)^4 / \Delta t \right)$ も 0 に収束するので、最終的に以下のような偏微分方程式が与えられます。

$$
\frac{\partial}{\partial t} u(x, t)
= D \frac{\partial^2}{\partial x^2} u(x, t)
$$

いわゆる拡散方程式が導出できました。

そうすると、空間内の拡散も考慮したモデルは

$$
\begin{align*}
\frac{\partial u}{\partial t} & = D_u \frac{\partial^2 u}{\partial x^2} + \lambda + a u - b v \\
\frac{\partial v}{\partial t} & = D_v \frac{\partial^2 v}{\partial x^2} + \mu    + c u - d v
\end{align*}
$$

となります。このようなモデルを反応拡散方程式といいます。  
また、同様の議論で二次元以上へ拡張することができます。

$$
\begin{align*}
\frac{\partial u}{\partial t} & = D_u \nabla^2 u + \lambda + a u - b v \\
\frac{\partial v}{\partial t} & = D_v \nabla^2 v + \mu    + c u - d v
\end{align*}
$$

## チューリングパターン
式(1)、(2)の安定解は、拡散項が加わったことで安定性が変化することがあります。
安定性解析という手法を用いると、$D_v > D_u$という条件が安定解が不安定化するための必要条件となることがわかります。
これは抑制因子の拡散が活性化因子の拡散よりも速いため、局所的に活性化因子が増加し、模様が形成されるためです。

しかし、このモデルでもまだ縞模様はできません。
なぜなら、このモデルでは活性化因子と抑制因子の反応が線形であるため、$(u, v) = (u_0, v_0)$の均一分布が不安定なとき、そのずれは時間とともにどんどん大きくなり発散してしまうからです。
そこで線形部分を非線形にし、ずれを押さえ込むことを考えます。
このようなモデル全般を「チューリングパターン」と呼びます<sup id="fnref-2"><a href="#fn-2">2</a></sup>。

$$
\begin{align*}
& \frac{\partial u}{\partial t} = D_u \nabla^2 u + f(u, v) \\
& \frac{\partial v}{\partial t} = D_v \nabla^2 v + g(u, v)
\end{align*}
$$

この非線形項$f(u, v)$と$g(u, v)$の選び方で、模様にもそれぞれ特徴が現れます。
有名なモデルとして、以下のようなGray-Scottモデルが知られています。

$$
\begin{align*}
&\frac{\partial u}{\partial t} = D_u \nabla^2 u + F(1-u) - u v^2 \\
&\frac{\partial v}{\partial t} = D_v \nabla^2 v + u v^2 - (F + k)v
\end{align*}
$$

このモデルを用いてPythonでシミュレーションしたところ、図3のような模様が見られました。
パラメータ$F, k$を変化させることで、模様にも変化が表れます。

<div style="display: flex; gap: 0.5rem;">
    <ZoomableImage src="https://img.nyanowl.me/articles/shimauma/Gray_scott_1-ba7950fe.webp" alt="Gray-Scottモデルによるシミュレーション1" width="100%" />
    <ZoomableImage src="https://img.nyanowl.me/articles/shimauma/Gray_scott_2-00b25a2e.webp" alt="Gray-Scottモデルによるシミュレーション2" width="100%"/>
    <ZoomableImage src="https://img.nyanowl.me/articles/shimauma/Gray_scott_3-b63ad4ac.webp" alt="Gray-Scottモデルによるシミュレーション3" width="100%"/>
</div>

<div class="img-caption">
<span>
図3: Gray-Scottモデルによるシミュレーション。パラメータが変化すると模様も水玉から迷路のような形へ変化します。
</span>
</div>
<br>

また、拡散に方向性を持たせる（すなわち、拡散定数$D_u, D_v$をx方向とy方向で異なる値にする）ことで、横や縦に伸びる模様を作ることができます（図4）。

<ZoomableImage src="https://img.nyanowl.me/articles/shimauma/Gray_scott_direction-836c5f05.webp" alt="方向性ありのGray-Scottモデルによるシミュレーション" openwidth={640} openheight={480} class="img-center" />

<div class="img-caption">
<span>
図4: 方向性ありのGray-Scottモデルによるシミュレーション
</span>
</div>
<br>

少しシマウマの縞模様に近づいたような...？また、ヤマトヤッコやヒレナガヤッコの縞模様にも似ていると思います。
パラメータをうまく変化させればよりシマウマらしい模様になると思いますが、ぴったりなのはなかなか見つかりませんでした。

実際の動物の縞模様は、Gray-Scottモデルのような単純なモデルでは完全には説明できず、さらに体の形に合った境界条件や、成長段階での体の変化なども考慮する必要があります。
ですが、このような反応拡散モデルを用いることで、シマウマや熱帯魚の縞模様のような複雑な模様を数学的に理解することができるのは非常に面白いことだと思います。
シマシマを見る時にはぜひ思い出してみてください。

---

1. 安定<span id="fn-1"></span>であるとは、平衡状態の近傍で初期値を与えたとき、時間が経つにつれて平衡状態に収束していくことを意味します。
   安定性解析という手法を用いると、平衡状態の安定性はヤコビ行列の固有値の符号で決まることが知られています。
   この常微分方程式のヤコビ行列は$A = \begin{pmatrix} a & -b \\ c & -d \end{pmatrix}$であり、このAの固有値の実部が全て負であれば安定な軌道になります。<a href="#fnref-1">↩</a>
2. 正確<span id="fn-2"></span>には、平衡状態の近傍でのヤコビ行列が式(1)、(2)の線形モデルと同じで、常微分方程式では安定なのに拡散が加わることでパターンが出現する偏微分方程式を指します。<a href="#fnref-2">↩</a>

## 参考文献

1. 巌佐庸(2008). 『生命の数理』. 共立出版.
2. Hirsch MW, Smale S, Devaney RL(2017). 『力学系入門 原著第3版: 微分方程式からカオスまで』. 桐木紳, 三波篤郎, 谷川清隆, 辻井正人, 訳. 共立出版.

<br>

## おまけ：Pythonコード
図3を生成するのに使用したPythonのコードです。図4のように方向性を持たせるには、laplacian関数の計算の部分でdxとdyの変化量をそれぞれ異なる割合にすれば実現できます。

```python
import numpy as np
import matplotlib.pyplot as plt
from tqdm import tqdm

# 変化させるパラメータ
Du, Dv = 0.16, 0.08
# f, k = 0.028, 0.060  
f, k = 0.035, 0.060  
# f, k = 0.038, 0.060  

dt = 0.2
dx = 0.5

N = 400
U = np.ones((N, N))
V = np.zeros((N, N))
# 中央に模様ができるように小さな乱数を設定する
seed_lo, seed_hi = int(N * 0.4), int(N * 0.6)
seed_size = seed_hi - seed_lo
U[seed_lo:seed_hi, seed_lo:seed_hi] = 0.5 + 0.1 * np.random.random((seed_size, seed_size))
V[seed_lo:seed_hi, seed_lo:seed_hi] = 0.25 + 0.1 * np.random.random((seed_size, seed_size))

def laplacian(Z, dx):
    # 上下左右のセルとの差分を計算（境界条件）
    return (np.roll(Z, 1, axis=0) + np.roll(Z, -1, axis=0) +
            np.roll(Z, 1, axis=1) + np.roll(Z, -1, axis=1) - 4 * Z) / (dx ** 2)

steps = 35000
for i in tqdm(range(steps)):
    lapU = laplacian(U, dx)
    lapV = laplacian(V, dx)
    
    uvv = U * V * V
    
    # Gray-Scottの計算
    U += dt * (Du * lapU - uvv + f * (1 - U))
    V += dt * (Dv * lapV + uvv - (f + k) * V)

plt.imshow(V, cmap='gray')
plt.axis('off')
plt.show()
```



<style>
    :global(.img-center) {
        width: 50%;
        min-width: 300px;
        display:block;
        margin: 0 auto;
    }

    .img-caption {
        width: 60%;
        min-width: 300px;
        margin: 0 auto;
        text-align: center;
    }
    .img-caption > span {
        font-size: 0.8em;
    }
</style>
