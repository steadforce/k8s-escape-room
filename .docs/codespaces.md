# Github codespaces
The k8s-escape-room can be played within a [Github codespaces](https://github.com/features/codespaces) environment.

Depending on the account, [Github offers an amount of free hours per month](https://docs.github.com/en/billing/managing-billing-for-github-codespaces/about-billing-for-github-codespaces) to run codespaces.

## Requirements
Create codespace

![Create codespace](../.images/github-codespaces-create.png)

kind network
```bash
docker network create --driver=bridge --subnet=10.172.242.0/24 --ip-range=10.172.242.0/28 --gateway=10.172.242.1 kind
```

## Setup

```bash
./workbench.codespaces
. init.sh
```

Wait a short time while everything is being set up.

![K8s Escape Room in terminal](../.images/k8s-escape-room-terminal.png)

## Play
As soon as the cluster and its resources are ready you can start playing.

To access the escape room UI in your Github codespace, please open one of the auto forwarded ports (80 and 443 should both work):

![Open port](.images/github-codespaces-ports.png)

Add `/game/` to the url.
(Right now the last slash is important).

Broken parts in the study are marked with a red circle. 
Hovering there with your cursor gives you a hint for what you might be looking for.

![K8s Escape Room in web](../.images/k8s-escape-room-web-unsolved.png)

After playing, the Github codespace should be [stopped](https://docs.github.com/en/codespaces/developing-in-a-codespace/stopping-and-starting-a-codespace?tool=webui#stopping-a-codespace) or deleted.

## Available tools
* K9s
* kubectl