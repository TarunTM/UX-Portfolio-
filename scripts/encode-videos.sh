#!/usr/bin/env bash
# Re-encodes the portfolio videos for the web and writes, next to each source:
#   <name>.webm          VP9 (Chrome, Firefox, Android); re-encoded only when the source is heavy
#   <name>.mp4           H.264, or HEVC with alpha for transparent videos (Safari / iOS)
#   <name>.poster.webp   first frame, shown before the video loads
#
# Usage: FFMPEG=/path/to/ffmpeg scripts/encode-videos.sh [out_dir]
# Needs an ffmpeg built with libvpx-vp9, libx264 and (on macOS) hevc_videotoolbox.
# Without out_dir, files are written into src/assets and the heavy .webm sources are
# replaced, so run it against the original exports (re-running re-encodes twice).
set -euo pipefail

FFMPEG="${FFMPEG:-ffmpeg}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/src/assets"
OUT="${1:-$SRC}"

# relative path | target width | re-encode webm? | transparent?
VIDEOS=(
  "Rizen Img/rizen mockup video.webm|1440|yes|no"
  "Quantel Img/quantel mockup vid.webm|1440|yes|no"
  "Sanctum Img:Video/Sanctum Home mockup.webm|1280|yes|no"
  "Rizen Img/Outcome Prototype.webm|720|yes|yes"
  "Sanctum Img:Video/Hero Video.webm|1920|no|yes"
  "Sanctum Img:Video/Training Recovery Iteration.webm|1600|no|no"
  "Sanctum Img:Video/Training Scroll video.webm|1440|no|no"
  "Insta Reels Prototype.webm|816|no|yes"
)

for entry in "${VIDEOS[@]}"; do
  IFS='|' read -r rel width reencode alpha <<<"$entry"
  in="$SRC/$rel"
  base="$OUT/${rel%.webm}"
  mkdir -p "$(dirname "$base")"
  scale="scale='min($width,iw)':-2:flags=lanczos"
  # libvpx is the only VP9 decoder that keeps the alpha channel.
  dec=(-c:v libvpx-vp9)
  echo "── $rel"

  if [[ $reencode == yes ]]; then
    tmp="$base.tmp.webm"
    if [[ $alpha == yes ]]; then
      "$FFMPEG" -v error -y "${dec[@]}" -i "$in" -vf "$scale,format=yuva420p" -an \
        -c:v libvpx-vp9 -crf 34 -b:v 0 -row-mt 1 -deadline good -cpu-used 2 -auto-alt-ref 0 "$tmp"
    else
      "$FFMPEG" -v error -y -i "$in" -vf "$scale" -an -pix_fmt yuv420p \
        -c:v libvpx-vp9 -crf 36 -b:v 0 -row-mt 1 -deadline good -cpu-used 2 "$tmp"
    fi
  elif [[ "$OUT" != "$SRC" ]]; then
    cp "$in" "$base.webm"
  fi

  if [[ $alpha == yes ]]; then
    "$FFMPEG" -v error -y "${dec[@]}" -i "$in" -vf "$scale,format=bgra" -an \
      -c:v hevc_videotoolbox -alpha_quality 0.6 -q:v 35 -tag:v hvc1 -movflags +faststart "$base.mp4"
  else
    "$FFMPEG" -v error -y -i "$in" -vf "$scale" -an -pix_fmt yuv420p \
      -c:v libx264 -crf 26 -preset slow -profile:v high -tag:v avc1 -movflags +faststart "$base.mp4"
  fi

  "$FFMPEG" -v error -y "${dec[@]}" -i "$in" -frames:v 1 -vf "scale='min(1200,iw)':-2:flags=lanczos" \
    -c:v libwebp -quality 80 "$base.poster.webp"

  # Replace the webm last, so the MP4 and poster above are made from the original.
  if [[ $reencode == yes ]]; then mv "$base.tmp.webm" "$base.webm"; fi

  ls -la "$base".webm "$base".mp4 "$base".poster.webp | awk '{printf "   %8.0f KB  %s\n", $5/1024, $NF}'
done
