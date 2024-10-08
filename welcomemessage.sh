#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
LIGHTBLUE='\033[1;34m'
LIGHTPURPLE='\033[1;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

printf "\n\n"
printf "Welcome to the\n"
printf "${CYAN} _   __      _                          _              _____                          ______                      ${NC}\n"
printf "${CYAN}| | / /     | |                        | |            |  ___|                         | ___ \                     ${NC}\n"
printf "${CYAN}| |/ / _   _| |__   ___ _ __ _ __   ___| |_ ___  ___  | |__ ___  ___ __ _ _ __   ___  | |_/ /___   ___  _ __ ___  ${NC}\n"
printf "${CYAN}|    \| | | | '_ \ / _ \ '__| '_ \ / _ \ __/ _ \/ __| |  __/ __|/ __/ _\` | '_ \ / _ \ |    // _ \ / _ \| '_ \` _ \ ${NC}\n"
printf "${CYAN}| |\  \ |_| | |_) |  __/ |  | | | |  __/ ||  __/\__ \ | |__\__ \ (_| (_| | |_) |  __/ | |\ \ (_) | (_) | | | | | |${NC}\n"
printf "${CYAN}\_| \_/\__,_|_.__/ \___|_|  |_| |_|\___|\__\___||___/ \____/___/\___\__,_| .__/ \___| \_| \_\___/ \___/|_| |_| |_|${NC}\n"
printf "${CYAN}                                                                         | |                                      ${NC}\n"
printf "${CYAN}                                                                         |_|                                      ${NC}\n"
printf "\n"
printf "To initialize a new local cluster run '${GREEN}. init.sh${NC}'.\n"
printf "To remove most resources (without deleting the cluster) run '${YELLOW}./remove-resources.sh${NC}'.\n"
printf "To delete a local cluster run '${RED}./delete-cluster.sh${NC}'.\n"
printf "\n"
printf "Depending on your environment open the url to see the room.\n"
printf "Github codespaces: '${LIGHTBLUE}<codespaces-auto-forward-port-url>/${NC}'\n"
printf "Locally: '${LIGHTBLUE}http://localhost/${NC}'\n"
printf "You can use '${LIGHTPURPLE}k9s${NC}' to see the state of the local cluster.\n"
printf "\n"