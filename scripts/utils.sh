#!/bin/bash

export SUCCESS=0
export FAILURE=1
export PROJECT_DIR=.
export APP_VERSION="1.0.0"
export BIN_DIRECTORY=${PROJECT_DIR}/bin
export LOG_FILENAME="${BIN_DIRECTORY}/log.txt"
export AWS_BIN_FOLDER="./bin/aws_cli"
export AWS_CLI_FILENAME_ZIP="awscli-exe-linux-x86_64.zip"
export AWS_LINUX_PACKAGE="https://awscli.amazonaws.com/${AWS_CLI_FILENAME_ZIP}"
export AWS_CLI_TOOL=aws
export GIT_TOOL=git
export TERRAFORM_VERSION='1.8.2'
export TERRAFORM_CXX=terraform
export TERRAFORM_ZIP_FILENAME="terraform_${TERRAFORM_VERSION}_linux_amd64.zip"
export TERRAFORM_REMOTE_PATH="https://releases.hashicorp.com/terraform/${TERRAFORM_VERSION}/${TERRAFORM_ZIP_FILENAME}"
export TERRAFORM_DIRECTORY="${PROJECT_DIR}/terraform"
export DEFAULT_BRANCH_NAME=master
export WEB_CONTENT_DIST_FOLDER="./bin/tools/website/dist"
# bootstrapping variables
export TERRAFORM_STATES_TABLE="terraform-states-lock"
export TERRAFORM_ARTEFACT_BUCKET="terraform-artefact"


function command_exists(){
    local command_name="$1"
    local filename=$(which "$command_name")
    if [ -e "$filename" ] ; then
        return "$SUCCESS"
    fi
    return "$FAILURE"
}

function file_exists(){
    local filename="$1"
    if [ -f $filename ]; then
        return "$SUCCESS"
    fi
    return "$FAILURE"
}


function folder_exists(){
    local folder="$1"
    if [ -d "$folder" ]; then
        return "$SUCCESS"
    fi
    return "$FAILURE"
}


function git_exists(){
    command_exists $GIT_TOOL
    return "$?"
}

function  replace_string(){
  local value="$1"
  local target_str="$2"
  local replace_by="$3"
  echo $(echo $value  | tr  $target_str  $replace_by)
}

function create_hash() {
    local value="$1"
    local hash=$(echo -n "$value" | sha256sum)
    echo "${hash}"
}

function get_pattern_value_from_index() {
    local pattern="$1"
    local separator="$2"
    local index="$3"
    IFS="$separator" read -ra parts <<< "$pattern"
    echo "${parts[$index]}"
}

function _get_environment_if_exists_name(){
  if [ ! -z "$ENVIRONMENT_NAME" ]; then
        echo "${ENVIRONMENT_NAME,,}"
        return 0
  fi
  return 1
}

function _get_git_branch_name(){

  local branch_name="$BITBUCKET_BRANCH"
  
  if [ -z "$branch_name" ]; then
    local branch_name=$($GIT_TOOL symbolic-ref --short HEAD 2>/dev/null)

    if [ -z "$branch_name" ]; then
      branch_name=$($GIT_TOOL describe --tags --exact-match 2>/dev/null)
      branch_name="${branch_name,,}"
    fi
      
    if [ -z $branch_name ];  then
      branch_name="${DEFAULT_BRANCH_NAME}"
    fi
  fi
  # try an extract the issue number or ticket feature/issue|ticket
  local ticket_issue=$(get_pattern_value_from_index $branch_name "/"  1)
  if [ -z "$ticket_issue" ]; then 
    ticket_issue=$branch_name
  fi
  echo "$ticket_issue"
}

function get_branch_name() {
  # Check if the environment variable is set, if its set get the environment
  # from the environment
    
  local branch_name=$(_get_environment_if_exists_name)
  if [ -z "$branch_name" ]; then
     branch_name=$(_get_git_branch_name)
  fi
  branch_name="${branch_name:0:10}"
  echo "${branch_name,,}"
}


function create_scope_hash_value(){
  local branch_name="$1"
  if [ -z $branch_name ]; then
    branch_name=$(get_branch_name)
  fi
  local hash_value=$(create_hash $branch_name)
  echo "${hash_value:0:5}"
}

function get_changed_files() {
    if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
        return 1
    fi
    changed_files=$(git diff --name-only --cached  "master" )
    if [ -z "$changed_files" ]; then
       changed_files=$(git diff --name-only)
    fi
    echo "$changed_files"
}



function is_aws_cli_installed(){
  # Function check if the aws-cli is installed (TESTED)
  local msg=$(command_exists $AWS_CLI_TOOL)
  local status=$?

  if [ $status != $SUCCESS ] ; then
     echo "error: aws cli is not installed, $msg"
  fi
  return $status
}

function get_aws_account_id() {
  local msg=$(is_aws_cli_installed)
  local status=$?
  if [ $status != $SUCCESS ] ; then
    echo "AWS CLI is not installed. Please install it first."
     return 1
  fi
  echo $($AWS_CLI_TOOL sts get-caller-identity --output text --query 'Account')
}


function get_aws_account_region() {
  local msg=$(is_aws_cli_installed)
  local status=$?
  if [ $status != $SUCCESS ] ; then
    echo "AWS CLI is not installed. Please install it first."
     return 1
  fi
  local aws_region=$($AWS_CLI_TOOL configure get region)

  if [ -z "$aws_region" ]; then
    if [ ! -z "$AWS_DEFAULT_REGION" ]; then
      aws_region="$AWS_DEFAULT_REGION"
    fi
  fi
  echo "$aws_region"
}


function terraform_workspace_exists() {
  local workspace="${1,,}"
  local workspaces="$($TERRAFORM_CXX workspace list)"

  set -f
    for name in ${workspaces[@]}; do
      name="${name,,}"
      # discard the wildcard
      if [ "*" == "$name" ]; then
        continue
      fi
      if [ "$name" == "$workspace" ]; then
         return 0
      fi
    done
  set +f
  return 1  
}

function export_variables_to_terraform(){
  echo "variables to exportation"
  local branch_name=$(get_branch_name)
  export TF_LOG="trace"
  export ENVIRONMENT_NAME="$branch_name"
  export TF_VAR_aws_region="$AWS_REGION"   
  export TF_VAR_environment_name="$ENVIRONMENT_NAME"
}

function select_terraform_workspace(){
    local branch_name=$(get_branch_name)
    pushd "${TERRAFORM_DIRECTORY}"
        terraform_workspace_exists "$branch_name"
        local status="$?"
        if [ "$status" != 0 ]; then
            $TERRAFORM_CXX  workspace new "$branch_name"
        fi
        $TERRAFORM_CXX  workspace select  "$branch_name"
    popd
    return "$?"
}

function get_recent_merged_branch_name(){
  local commit_hash="$( $GIT_TOOL rev-parse --short HEAD)"
  local commit_msg=$( $GIT_TOOL show $commit_hash | grep "Merged in" )
  local branch_patterns="(feature|hotfix|bugfix)/[a-zA-Z0-9_-]+"
  if [ -z "$commit_msg" ]; then
      echo "No branch found"
      return 0
  fi
  local source_branch=$( echo $commit_msg | grep -oP "$branch_patterns" | head -1 )  
  local branch_name="${source_branch,,}"

  # try an extract the issue number or ticket feature/issue|ticket
  local ticket_issue=$(get_pattern_value_from_index $branch_name "/"  1)
  if [ -z "$ticket_issue" ]; then 
    ticket_issue=$branch_name
  fi
  branch_name="${ticket_issue:0:10}"
  echo "${branch_name,,}"
}
