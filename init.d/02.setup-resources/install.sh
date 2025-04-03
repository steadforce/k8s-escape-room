#!/bin/sh

set -e

DIR="$(cd "$(dirname "$0")" >/dev/null 2>&1; pwd -P)"

echo "Apply all manifests ..."
for file in $(ls ${DIR}/manifests/*.yaml | grep -v 'kustomization.yaml'); do
  kubectl apply -f $file
done

echo "Apply kustomize manifests ..."
kustomize build ${DIR}/manifests | kubectl apply -f -
