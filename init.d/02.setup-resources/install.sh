#!/bin/sh

set -e

DIR="$(cd "$(dirname "$0")" >/dev/null 2>&1; pwd -P)"

echo "Apply all manifests except kustomization ..."
find "$DIR/manifests/" -name '*.yaml' ! -name 'kustomization.yaml' -exec kubectl apply -f {} \;

echo "Apply kustomize manifests ..."
kustomize build ${DIR}/manifests | kubectl apply -f -
