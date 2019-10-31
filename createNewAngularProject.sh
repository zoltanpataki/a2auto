#!/bin/bash
set -euo pipefail

# This script allows the creation of a new project with
# the defined blueprint folder structure

PROJECT_NAME=${1:-}

if [[ "$PROJECT_NAME" =~ ^[a-z-]+$ ]] && [[ -n "$PROJECT_NAME" ]]
then
	echo "Creating Angular Project..."
else
	echo "usage: $0 project-name"
	echo ""
	echo "parameters:"
	echo "	project-name: Name of the project in kebab-case"
	exit 1;
fi

ng new $PROJECT_NAME

mkdir $PROJECT_NAME/.blueprint
mkdir $PROJECT_NAME/src/app/@core
touch $PROJECT_NAME/src/app/@core/.gitkeep
mkdir $PROJECT_NAME/src/app/@store
touch $PROJECT_NAME/src/app/@store/.gitkeep
mkdir $PROJECT_NAME/src/app/@store/actions
touch $PROJECT_NAME/src/app/@store/actions/.gitkeep
mkdir $PROJECT_NAME/src/app/@store/effects
touch $PROJECT_NAME/src/app/@store/effects/.gitkeep
mkdir $PROJECT_NAME/src/app/@store/reducers
touch $PROJECT_NAME/src/app/@store/reducers/.gitkeep
mkdir $PROJECT_NAME/src/app/@ui
touch $PROJECT_NAME/src/app/@ui/.gitkeep

echo "#############################################################"
echo "Project $PROJECT_NAME was created successfully"
echo ""
