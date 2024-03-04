#!/bin/false

set -e

DIR="$(cd "$(dirname "$0")" >/dev/null 2>&1; pwd -P)"

INIT_DIR="$DIR/init.d"

for f in $(ls "${INIT_DIR}"); do
  CURDIR="${INIT_DIR}/${f}"
  echo -e "\e[1m\e[92mProcessing ${f}...\e[0m"
  "${CURDIR}"/install.sh
done


if [ -f .kubeconfig ]; then
    export KUBECONFIG="$DIR/.kubeconfig"
fi

# DO NOT REMOVE!
# re-activate default behavior of shell,
# required because we source the init script!
set +e
