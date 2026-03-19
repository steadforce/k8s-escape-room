#!/bin/sh

set -e

VCLUSTER_NAME="${VCLUSTER_NAME:-escape-room}"
VCLUSTER_DRIVER="${VCLUSTER_DRIVER:-docker}"
VCLUSTER_CONFIG_PATH="${VCLUSTER_CONFIG_PATH:-$HOME/.vcluster/config.json}"

vcluster --config "$VCLUSTER_CONFIG_PATH" delete "$VCLUSTER_NAME" --driver "$VCLUSTER_DRIVER" --ignore-not-found

if [ -f .kubeconfig ]; then
    rm -rf .kubeconfig
fi
