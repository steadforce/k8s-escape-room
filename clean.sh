#!/bin/sh

delete="kubectl -n default delete"

$delete configmaps --all
$delete secrets --all
$delete deployments --all
