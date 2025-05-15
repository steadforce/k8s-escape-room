#! /bin/sh

set -e

DIR="$(cd "$(dirname "$0")" >/dev/null 2>&1; pwd -P)"

NAME="escape-room-frontend"
SRC_DIR="$DIR/$NAME"

echo "Get frontend version ..."
VERSION=$(jq -r .version "$SRC_DIR/package.json")

echo "Build docker image for frontend ..."
docker build \
  -t "$NAME:$VERSION" \
  -t "$NAME:latest" \
  "$SRC_DIR"
kind load docker-image "$NAME:$VERSION" "$NAME:latest" --name escape-room 
