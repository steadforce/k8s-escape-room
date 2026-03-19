#!/bin/sh

set -e

DIR="$(cd "$(dirname "$0")" >/dev/null 2>&1; pwd -P)"
ROOT_DIR="$(cd "$DIR/../.." >/dev/null 2>&1; pwd -P)"
VCLUSTER_NAME="${VCLUSTER_NAME:-escape-room}"
VCLUSTER_DRIVER="${VCLUSTER_DRIVER:-docker}"
VCLUSTER_LOCAL_PORT="${VCLUSTER_LOCAL_PORT:-18443}"
INGRESS_HOST_PORT="${INGRESS_HOST_PORT:-8085}"
INGRESS_NODE_PORT="${INGRESS_NODE_PORT:-30080}"
VCLUSTER_CONFIG_PATH="${VCLUSTER_CONFIG_PATH:-$HOME/.vcluster/config.json}"

mkdir -p "$(dirname "$VCLUSTER_CONFIG_PATH")"

if [ -n "$VCLUSTER_SERVER_HOST" ]; then
  KUBECONFIG_SERVER_HOST="$VCLUSTER_SERVER_HOST"
elif [ -f "/.dockerenv" ]; then
  KUBECONFIG_SERVER_HOST="host.docker.internal"
else
  KUBECONFIG_SERVER_HOST="localhost"
fi

export KUBECONFIG_SERVER_HOST
export VCLUSTER_LOCAL_PORT

if ! command -v vcluster >/dev/null 2>&1; then
  echo "vcluster CLI is required but was not found in PATH" >&2
  exit 1
fi

if vcluster --config "$VCLUSTER_CONFIG_PATH" describe "$VCLUSTER_NAME" --driver "$VCLUSTER_DRIVER" >/dev/null 2>&1; then
  echo "vCluster $VCLUSTER_NAME already exists."
else
  echo "Create vCluster $VCLUSTER_NAME ..."
  vcluster --config "$VCLUSTER_CONFIG_PATH" create "$VCLUSTER_NAME" \
    --driver "$VCLUSTER_DRIVER" \
    --set "experimental.docker.ports[0]=${VCLUSTER_LOCAL_PORT}:8443" \
    --set "experimental.docker.ports[1]=${INGRESS_HOST_PORT}:${INGRESS_NODE_PORT}" \
    --set experimental.docker.loadBalancer.enabled=false \
    --set experimental.docker.loadBalancer.forwardPorts=false \
    --add=false \
    --connect=false
fi

echo "Export kubeconfig ..."
vcluster --config "$VCLUSTER_CONFIG_PATH" connect "$VCLUSTER_NAME" \
  --driver "$VCLUSTER_DRIVER" \
  --print \
  --insecure \
  --local-port "$VCLUSTER_LOCAL_PORT" \
  --server "https://${KUBECONFIG_SERVER_HOST}:${VCLUSTER_LOCAL_PORT}" > "$ROOT_DIR/.kubeconfig"
yq -i '(.clusters[].cluster.server = "https://" + env(KUBECONFIG_SERVER_HOST) + ":" + env(VCLUSTER_LOCAL_PORT))' "$ROOT_DIR/.kubeconfig"
chmod 600 "$ROOT_DIR/.kubeconfig"

export KUBECONFIG="$ROOT_DIR/.kubeconfig"

echo "Wait for node readiness ..."
kubectl wait --for=condition=Ready nodes --all --timeout=180s

echo "Deploy ingress controller ..."
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx >/dev/null 2>&1 || true
helm repo update ingress-nginx >/dev/null
helm upgrade --install ingress-nginx ingress-nginx/ingress-nginx \
  --namespace ingress-nginx \
  --create-namespace \
  --set controller.service.type=NodePort \
  --set controller.service.nodePorts.http="$INGRESS_NODE_PORT" \
  --set controller.ingressClassResource.default=true

echo "Waiting for ingress-nginx controller to be ready..."
kubectl rollout status deployment/ingress-nginx-controller -n ingress-nginx --timeout=180s
