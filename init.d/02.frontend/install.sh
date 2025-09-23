#! /bin/sh

set -e

DIR="$(cd "$(dirname "$0")" >/dev/null 2>&1; pwd -P)"

NAME="escape-room-frontend"
SRC_DIR="$DIR/$NAME"
BUILD_CONTEXT="$DIR/build-context"

echo "Prepare build context ..."
rm -rf "$BUILD_CONTEXT"
mkdir -p "$BUILD_CONTEXT/addons"

echo "Copy frontend files ..."
tar -C "$SRC_DIR" --exclude-from="$SRC_DIR/.dockerignore" -cf - . | tar -C "$BUILD_CONTEXT" -xf -

# Remove .dockerignore and .gitignore from build context
# We don't need these files in the build context as we 
# have only the files we need
rm -f "$BUILD_CONTEXT/.dockerignore" "$BUILD_CONTEXT/.gitignore"

echo "Copy add-ons from VITE_ADDON_PATHS: $VITE_ADDON_PATHS"
if [ -n "$VITE_ADDON_PATHS" ]; then
  OLDIFS="$IFS"
  IFS=','

  set -- $VITE_ADDON_PATHS
  for ADDON in "$@"; do
    ADDON_NAME=$(basename "$ADDON")
    echo "Processing add-on: $ADDON_NAME"
    SRC_ADDON="$ADDON/frontend"
    DEST_ADDON="$BUILD_CONTEXT/addons/$ADDON_NAME"
    if [ -d "$SRC_ADDON" ]; then
      echo "Copying $SRC_ADDON to $DEST_ADDON"
      cp -r "$SRC_ADDON" "$DEST_ADDON"
    else
      echo "Warning: Add-on directory $SRC_ADDON does not exist, skipping."
    fi
  done

  IFS="$OLDIFS"
fi

echo "Get frontend version ..."
VERSION=$(jq -r .version "$SRC_DIR/package.json")

echo "Build docker image for frontend ..."
docker build \
  -t "$NAME:$VERSION" \
  -t "$NAME:latest" \
  --build-arg VITE_ADDON_PATHS="${VITE_ADDON_PATHS}" \
  "$BUILD_CONTEXT"

kind load docker-image "$NAME:$VERSION" "$NAME:latest" --name escape-room