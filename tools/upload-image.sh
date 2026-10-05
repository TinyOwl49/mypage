#!/usr/bin/env bash
set -euo pipefail

# 画像を WebP に変換・リサイズして Cloudflare R2 にアップロードし、
# 記事に貼るためのスニペットを出力する。

MAX_SIZE=1600
QUALITY=80
PREFIX="$(date +%Y/%m)"
DRY_RUN=0
BUCKET="${R2_BUCKET:-mypage}"
BASE_URL="${IMG_BASE_URL:-https://img.nyanowl.me}"
WRANGLER="${WRANGLER:-pnpm dlx wrangler@4}"

usage() {
	echo "使い方: $(basename "$0") [-s MAX_SIZE] [-q QUALITY] [-p PREFIX] [-n] <入力画像> [出力名]" >&2
	echo "  -s MAX_SIZE  長辺の最大ピクセル数。これより小さい画像は拡大しない (デフォルト: ${MAX_SIZE})" >&2
	echo "  -q QUALITY   WebP の品質 0-100 (デフォルト: ${QUALITY})" >&2
	echo "  -p PREFIX    R2 上の保存先フォルダ (デフォルト: 今月の YYYY/MM)" >&2
	echo "  -n           変換だけしてアップロードしない (確認用)" >&2
	echo "  出力名       拡張子なしのファイル名 (デフォルト: 入力ファイル名)" >&2
	echo "" >&2
	echo "環境変数: R2_BUCKET (${BUCKET}), IMG_BASE_URL (${BASE_URL}), WRANGLER (${WRANGLER})" >&2
	exit 1
}

while getopts "s:q:p:nh" opt; do
	case "$opt" in
	s) MAX_SIZE="$OPTARG" ;;
	q) QUALITY="$OPTARG" ;;
	p) PREFIX="${OPTARG%/}" ;;
	n) DRY_RUN=1 ;;
	h) usage ;;
	*) usage ;;
	esac
done
shift $((OPTIND - 1))

if [ $# -lt 1 ]; then
	usage
fi

INPUT="$1"

if [ ! -f "$INPUT" ]; then
	echo "エラー: 入力ファイルが見つかりません: ${INPUT}" >&2
	exit 1
fi

if ! command -v magick >/dev/null 2>&1; then
	echo "エラー: ImageMagick (magick コマンド) が見つかりません" >&2
	exit 1
fi

if [ $# -ge 2 ]; then
	NAME="$2"
else
	BASENAME="$(basename "$INPUT")"
	NAME="${BASENAME%.*}"
fi

if [ "$DRY_RUN" -eq 1 ]; then
	# 入力が WebP でも上書きしないように、別の名前でカレントディレクトリに残す
	TMP_OUTPUT="$(pwd)/${NAME}.preview.webp"
else
	WORKDIR="$(mktemp -d)"
	trap 'rm -rf "$WORKDIR"' EXIT
	TMP_OUTPUT="${WORKDIR}/${NAME}.webp"
fi

# -coalesce: GIF などのアニメーションを崩さずにリサイズするため
# -strip:    撮影場所 (GPS) などの EXIF 情報を公開しないように削除する
# "N>":      N より大きいときだけ縮小する
magick "$INPUT" \
	-auto-orient \
	-coalesce \
	-strip \
	-resize "${MAX_SIZE}x${MAX_SIZE}>" \
	-quality "$QUALITY" \
	-define webp:method=6 \
	"$TMP_OUTPUT"

# immutable でキャッシュさせるので、内容が変われば URL も変わるようにハッシュを付ける
HASH="$(shasum -a 256 "$TMP_OUTPUT" | cut -c1-8)"
KEY="${PREFIX}/${NAME}-${HASH}.webp"
URL="${BASE_URL}/${KEY}"

read -r WIDTH HEIGHT < <(magick identify -format "%w %h\n" "$TMP_OUTPUT" | head -n 1)
IN_SIZE="$(du -h "$INPUT" | cut -f1)"
OUT_SIZE="$(du -h "$TMP_OUTPUT" | cut -f1)"

echo "変換しました: ${INPUT} (${IN_SIZE}) → ${WIDTH}x${HEIGHT} WebP (${OUT_SIZE})"

if [ "$DRY_RUN" -eq 1 ]; then
	echo "-n が指定されたのでアップロードしません: ${TMP_OUTPUT}"
	echo "アップロード先になる予定の URL: ${URL}"
	exit 0
fi

$WRANGLER r2 object put "${BUCKET}/${KEY}" \
	--file "$TMP_OUTPUT" \
	--content-type "image/webp" \
	--cache-control "public, max-age=31536000, immutable" \
	--remote

cat <<EOF

アップロードしました: ${URL}

--- 本文に貼る ---
<ZoomableImage src="${URL}" alt="" openwidth={${WIDTH}} openheight={${HEIGHT}} />

--- サムネイルにする (frontmatter) ---
thumbnail: ${URL}
EOF
