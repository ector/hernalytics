#!/bin/bash

export DOCKER_TOOL=docker

function network_name_exists() {  
  local network_name="$1"
  local existing_network=$( $DOCKER_TOOL network ls --format '{{.Name}}' | grep -w "^${network_name}$")
  if [[ -n "$existing_network" ]]; then
    return 0
  fi
  return 1
}

function does_image_name_exists() {
    local name="$1"
    local ids=$(docker images -q "$name")
    if [[ -n $ids ]]; then
       return 0
    fi 
    return 1
}

function get_container_id_by_name() {
    local container_name="$1"
    local container_id=$(docker ps -q --filter "name=${container_name}")
    echo "$container_id"
}

