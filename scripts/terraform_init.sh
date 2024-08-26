#!/bin/bash

chmod +x ./scripts/utils.sh  && . ./scripts/utils.sh

function delete_terraform_init_files(){
  folder_exists ".terraform"
  local status=$?
  if [ $status = 0 ]; then
    echo "Deleting cached files"
    rm  -rf ".terraform"
    rm -rf ".terraform.lock.hcl"
  fi
  echo "Terraform init clean"
}


function terraform_init(){
  local variables_file="$1"
  if [ -z "${variables_file}" ] ; then
    variables_file='backend.tfvars'
  fi

  pushd "${TERRAFORM_DIRECTORY}"
    echo "TERRAFORM DIR = $(pwd)"
    terraform init  -upgrade --backend-config=$variables_file --reconfigure
  popd

  local status=$?
  if [ $status != 0 ]; then
    echo "Terraform init failed"
    exit $status
  fi
  # Validate the terraform configuration
  terraform validate -json
  status=$?
  if [ $status != 0 ]; then
    echo "Terraform validation failed"
  fi
  return $status
}

function run_initiation(){
  delete_terraform_init_files
  terraform_init
  return $?
}

run_initiation


