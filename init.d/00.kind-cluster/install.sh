#!/bin/sh

set -e

DIR="$(cd "$(dirname "$0")" >/dev/null 2>&1; pwd -P)"

if [ "0" -eq $(kind get clusters | grep escape-room | wc -l) ]; then
  kind create cluster --config $DIR/cluster.yaml
  
  echo "put config into temporary local file"
  kind get kubeconfig --name escape-room --internal > .kubeconfig
  chmod 600 .kubeconfig

else
  echo "Cluster already installed."
fi

echo "Create storage classes ..."
kubectl apply -f $DIR/storage-classes.yaml

echo "Deploy ingress controller ..."
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml

until kubectl get pod -n ingress-nginx --selector=app.kubernetes.io/component=controller -o go-template='{{.items | len}}' | grep -qxF 1; do
  echo "Waiting for ingress-nginx controller..."
  sleep 5
done

echo "Waiting for ingress-nginx controller to be ready..."
kubectl wait --namespace ingress-nginx \
  --for=condition=ready pod \
  --selector=app.kubernetes.io/component=controller \
  --timeout=90s
