#!/usr/bin/env bash

sudo docker build -t lxc-platform-webui .
sudo docker-compose -f docker-compose-local.yml up