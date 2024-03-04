#! /bin/sh

set -e

# set KUBECONFIG to temporary local file
export KUBECONFIG=$(pwd)/.kubeconfig

DIR="$(cd "$(dirname "$0")" >/dev/null 2>&1; pwd -P)"

kustomize build ${DIR}/manifests | kubectl apply -f -
