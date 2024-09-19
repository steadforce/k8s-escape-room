#!/bin/false

set -e

DIR="$(cd "$(dirname "$0")" >/dev/null 2>&1; pwd -P)"

INIT_DIR="$DIR/init.d"

# install all escape room modules
echo -e "\e[1m\e[4m\e[33mInstalling Kubernetes Escape Room\e[0m"
for f in $(ls "${INIT_DIR}"); do
  CURDIR="${INIT_DIR}/${f}"
  echo -e "\e[1m\e[92mProcessing ${f}...\e[0m"
  "${CURDIR}"/install.sh
done

# install all modules of add-ons
# directories of addons are given as parameter to init script
for addOnPath in "$@"; do
  INIT_DIR="$DIR/${addOnPath}/init.d"
  echo ""
  echo -e "\e[1m\e[4m\e[33mInstalling Add-on "$(basename "$addOnPath")"\e[0m"
  for f in $(ls "${INIT_DIR}"); do
    CURDIR="${INIT_DIR}/${f}"
    echo -e "\e[1m\e[92mProcessing ${f}...\e[0m"
    "${CURDIR}"/install.sh
  done
done

# export kubeconfig variable
if [ -f .kubeconfig ]; then
    export KUBECONFIG="$DIR/.kubeconfig"
fi

# DO NOT REMOVE!
# re-activate default behavior of shell,
# required because we source the init script!
set +e
