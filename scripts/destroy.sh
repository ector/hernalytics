#!/bin/bash

chmod +x ./scripts/utils.sh  && . ./scripts/utils.sh

function terraform_destroy(){ 
  select_terraform_workspace
  export_variables_to_terraform
  pushd "$TERRAFORM_DIRECTORY"
    $TERRAFORM_CXX  destroy -auto-approve -input=false -var-file="inputs.tfvars"
  popd
  local status="$?"
  if [ $status != 0 ]; then
     echo "Terraform Destroy failed"
     return 1
  fi
  destroy_remote_state
}

function destroy_remote_state(){
  local branch_name=$(get_branch_name)
  pushd "$TERRAFORM_DIRECTORY"
    $TERRAFORM_CXX workspace select default 
    $TERRAFORM_CXX workspace delete "$branch_name"
  popd
}

terraform_destroy


