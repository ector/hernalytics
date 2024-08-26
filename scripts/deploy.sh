#!/bin/bash

chmod +x ./scripts/utils.sh  && . ./scripts/utils.sh

function terraform_deploy(){
    select_terraform_workspace
    export_variables_to_terraform
    pushd "${TERRAFORM_DIRECTORY}"
      ${TERRAFORM_CXX} apply -auto-approve -input=false -var-file="inputs.tfvars"
      local status=$?
      if [ "$status" != $SUCCESS ]; then
        echo "Terraform deployment failed."
        return 1
      fi
    popd
}

terraform_deploy


