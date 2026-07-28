<div class="night-sky">
	<div class="stars"></div>
</div>

<style lang="scss">
	@use "sass:math";
	@use "sass:string";

	/* 指定した数の星（box-shadow）をランダムに生成する関数 */
	@function create-stars($n) {
		$value: "#{math.random(2000)}px #{math.random(2000)}px #FFF";

		@for $i from 2 through $n {
			$value: "#{$value}, #{math.random(2000)}px #{math.random(2000)}px #FFF";
		}
		@return string.unquote($value);
	}

	.stars {
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
		/* マイクラ風にするため、星の形をあえて四角い2pxにする */
		width: 1px;
		height: 1px;
		background: transparent;

		/* ここで700個の星を生成 */
		box-shadow: create-stars(700);

		/* ゆっくり上へ流れるアニメーション（回転させたい場合はrotateを使用） */
		animation: animStar 100s linear infinite;

		/* 無限ループを自然にするための疑似要素（同じ星空を複製して下に配置） */
		&::after {
			content: " ";
			position: absolute;
			top: 2000px;
			width: 2px;
			height: 2px;
			background: transparent;
			box-shadow: create-stars(700);
		}
	}

	@keyframes animStar {
		from {
			transform: translateY(0px);
		}
		to {
			transform: translateY(-2000px);
		}
	}
</style>
