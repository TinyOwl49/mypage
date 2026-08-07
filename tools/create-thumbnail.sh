#!/usr/bin/env bash
set -euo pipefail

SIZE=512
OUTDIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/static/thumbnails"

usage() {
	echo "使い方: $(basename "$0") [-s SIZE] [-o OUTDIR] <入力画像> [出力ファイル名]" >&2
	echo "  -s SIZE    出力する正方形サムネイルの一辺のピクセル数 (デフォルト: ${SIZE})" >&2
	echo "  -o OUTDIR  出力先ディレクトリ (デフォルト: static/thumbnails)" >&2
	exit 1
}

while getopts "s:o:h" opt; do
	case "$opt" in
	s) SIZE="$OPTARG" ;;
	o) OUTDIR="$OPTARG" ;;
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
	OUTNAME="$2"
else
	BASENAME="$(basename "$INPUT")"
	OUTNAME="${BASENAME%.*}.png"
fi

mkdir -p "$OUTDIR"
OUTPUT="${OUTDIR}/${OUTNAME}"

magick "$INPUT" \
	-auto-orient \
	-resize "${SIZE}x${SIZE}^" \
	-gravity center \
	-extent "${SIZE}x${SIZE}" \
	"$OUTPUT"

echo "サムネイルを作成しました: ${OUTPUT}"
