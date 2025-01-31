#!/bin/sh

# Ensure script stops on first failure
set -e

# Base directory (script's location)
BASE_DIR="$(dirname "$0")"

# Check if the directory exists
if [ ! -d "$BASE_DIR" ]; then
    echo "Error: Directory $BASE_DIR does not exist."
    exit 1
fi

# Find and apply all YAML files in subdirectories
find "$BASE_DIR" -type f -name "*.yaml" -exec sh -c 'kubectl apply -f {}' \;

echo "All YAML files applied successfully."
