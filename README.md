# Kubernetes Escape Room Game

You are a wizard apprentice. While your teacher is out of house you decided to sneak into his study to practice some spells. 
Maybe try out some magic artifacts you find there. 
But while reciting an incantation you found in a hidden tome something went horribly wrong. 
Important things are missing or not working anymore. It is now on you to fix what has been broken.

**Broken parts in the study are marked with a red circle. 
Hovering there with your cursor gives you a hint for what you might be looking for.**

## Inspired By
[The Great Escape](https://github.com/t-gmn/the-great-escape)

## Usage
![K8s Escape Room in web](.images/k8s-escape-room-web-unsolved.png)

[Github codespaces](.docs/codespaces.md)

[Local](.docs/local.md)

## Get started
Regardless of execution environment, there are certain tools you can use to interact with the escape room.
Once you are in the workbench and have initialized the cluster with `. init.sh`, you can use [k9s](https://k9scli.io/) to see cluster resources in the terminal.
You can also use [kubectl](https://kubernetes.io/docs/reference/kubectl/).

The following steps need to be done before changes will reflect in the cluster / browser:
1. Changes to the code need to be saved
1. The changed resource yaml files need to be applied to the cluster
1. The browser tab needs to be reloaded, often times a hard reload is neccessary

### Note
Tooltip hints are available when hovering with the cursor over the red circles. Note that in the firefox browser the tooltip hints only appear when the browser window is focused.
Please use another browser or keep in mind to focus the browser window for tooltips when using firefox.
