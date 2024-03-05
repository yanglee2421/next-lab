#!/bin/bash

# For macOS
brew install docker

docker network create wd_web_net

mkdir -p ~/data_lake/app
cp ../sql/database.sqlite ~/data_lake/app