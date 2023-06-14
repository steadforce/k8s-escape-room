#!/bin/sh

kind delete clusters escape-room

if [ -f .kubeconfig ]; then
    rm -rf .kubeconfig
fi
