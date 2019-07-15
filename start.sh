#!/usr/bin/env bash

docker build -t lxc-platform-webui .
docker-compose -f docker-compose.local.yml up