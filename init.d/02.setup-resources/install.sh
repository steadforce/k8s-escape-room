#!/bin/sh

set -e

DIR="$(cd "$(dirname "$0")" >/dev/null 2>&1; pwd -P)"

# Build the Docker image
docker build -f "$DIR/../../frontend/frontend.dockerfile" -t frontend-image "$DIR/../../frontend"

# Load the Docker image into the kind cluster
kind load docker-image frontend-image --name escape-room

echo "Apply all manifests ..."
kubectl apply -f $DIR/frontend/
