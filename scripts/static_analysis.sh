#!/bin/bash

chmod +x ./scripts/utils.sh  && . ./scripts/utils.sh

function terraform_fmt(){ 
  terraform fmt -recursive -check -diff
  return $?
}

terraform_fmt


