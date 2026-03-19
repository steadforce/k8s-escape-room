#! /bin/sh

set -e

DIR="$(cd "$(dirname "$0")" >/dev/null 2>&1; pwd -P)"
ROOT_DIR="$(cd "$DIR/../.." >/dev/null 2>&1; pwd -P)"
VCLUSTER_CONFIG_PATH="${VCLUSTER_CONFIG_PATH:-$HOME/.vcluster/config.json}"

NAME="escape-room-frontend"
SRC_DIR="$DIR/$NAME"
BUILD_CONTEXT="$DIR/build-context"

export KUBECONFIG="$ROOT_DIR/.kubeconfig"
VCLUSTER_CONTEXT="$(kubectl config current-context)"
VCLUSTER_NODES="$(kubectl get nodes -o jsonpath='{range .items[*]}{.metadata.name}{"\n"}{end}')"

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

if [ -z "$VCLUSTER_NODES" ]; then
  echo "No vCluster nodes found to load frontend image into." >&2
  exit 1
fi

printf '%s\n' "$VCLUSTER_NODES" | while IFS= read -r NODE_NAME; do
  [ -n "$NODE_NAME" ] || continue
  vcluster --config "$VCLUSTER_CONFIG_PATH" node load-image "$NODE_NAME" --image "$NAME:$VERSION" --context "$VCLUSTER_CONTEXT"
  vcluster --config "$VCLUSTER_CONFIG_PATH" node load-image "$NODE_NAME" --image "$NAME:latest" --context "$VCLUSTER_CONTEXT"
done