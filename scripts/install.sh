#! /bin/sh
#
# install.sh
# Copyright (C) 2015 adelciotto <anthdel.developer@gmail.com>
#
# Distributed under terms of the MIT license.

# check if cmd args supplied
if [[ -z "$1" || -z "$2" ]]; then
  echo "usage: ./install.sh <github-username> <prototype-repo-name>"
  exit 0
fi

# check if node and npm is installed
echo "checking if node is installed..."
if !hash node 2>/dev/null; then
  echo "install node bro..."
  exit 0
fi
echo "node is installed"

## set the new remote repo
git remote set-url origin git@github.com:$1/$2.git
echo "set the new remote origin url to git@github.com:$1/$2.git"

## install dependencies
echo "installing npm dependencies (may take a few minutes)..."
npm i
echo ""
echo "start developing: run npm dev"
