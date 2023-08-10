#!/bin/sh

set -e

DIR="$(cd "$(dirname "$0")" >/dev/null 2>&1; pwd -P)"

echo "Apply all manifests ..."
kubectl apply -f $DIR/manifests/
