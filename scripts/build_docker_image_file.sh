#!/bin/bash

chmod +x ./scripts/utils.sh && . ./scripts/utils.sh
chmod +x ./scripts/docker_utils.sh && . ./scripts/docker_utils.sh

# Constants
export REPO_NAME="hernanlytics-landing-core"
export IMAGE_CONTAINER_NAME="$REPO_NAME"
export DOCKER_FILE="./Dockerfile"
export REPO_PARAMETER_NAME="${IMAGE_CONTAINER_NAME}/ssm/parameters/$REPO_NAME"


function is_docker_file() {
    local filename="$1"
    if [[ "$filename" == *"Dockerfile"* ]]; then
        return $SUCCESS
    fi
    return $FAILURE
}

function get_docker_filename() {
    local filenames=$(get_changed_files)
    for file in $filenames; do
        is_docker_file "$file"        
        local status="$?"
        if [ "$status" == 0 ]; then            
            echo "$file"
            return 0
        fi
    done
    echo "No changes"
    return 1
}


function build_docker_image_file() {
    local dockerfile="$1"
    echo "Building docker file = $dockerfile"
    if [ ! -f $dockerfile ]; then
        echo "File not found"
        return 1
    fi

    local image_id=$(get_container_id_by_name "$IMAGE_CONTAINER_NAME")
    local version=$(get_container_deployment_version)
    if [ -n "$image_id" ]; then
        echo "Deleting existing docker image = $image_id "
        docker container stop "$image_id"
        docker container rm "$image_id"
    fi

    docker build -t "$IMAGE_CONTAINER_NAME" -f "$dockerfile" .

    local status="$?"
    if [ $status != 0 ]; then
        echo "Docker build failed , please make sure docker is installed and running"
        return $status
    fi
    echo "Docker image "$IMAGE_CONTAINER_NAME" has be build successfully."
}

function run_docker_container() {
    docker container prune -f
    local container_id=$(get_container_id_by_name "$IMAGE_CONTAINER_NAME")
    if [ -n "$container_id" ]; then
        echo "Removed the container"    
        docker container rm "$container_id"
    fi
    $DOCKER_TOOL run -d --name "$IMAGE_CONTAINER_NAME" "$IMAGE_CONTAINER_NAME"
}

function ecr_repository_exists(){
    local repo_name="$1"
    local response=$(aws ecr describe-repositories --repository-names $repo_name 2>/dev/null)
    if [[ -z "$response" ]]; then
        return $FAILURE
    fi
    return $SUCCESS
}

function docker_ecr_get_login_password(){
    local name="$1"
    local aws_account_id=$(get_aws_account_id)
    local aws_region=$(get_aws_account_region)
    local docker_registry="$aws_account_id.dkr.ecr.$aws_region.amazonaws.com"
    aws ecr get-login-password --region "$aws_region" | docker login --username AWS --password-stdin "$docker_registry"
}

function scope_repository_name(){
    local branch_name=$(get_branch_name)
    local scoped_hash=""
    if [ "$branch_name" != "master" ]; then
        scoped_hash="-$(create_scope_hash_value)"
    fi
    echo "${REPO_NAME}${scoped_hash}"
}
function get_ecr_full_registry_repository(){
    local aws_account_id=$(get_aws_account_id)
    local aws_region=$(get_aws_account_region)
    local docker_registry="$aws_account_id.dkr.ecr.$aws_region.amazonaws.com"
    local repo_name=$(scope_repository_name)
    echo "${docker_registry}/${repo_name}"
}

function get_docker_repo_ssm_name(){
    local branch_name=$(get_branch_name)
    local scoped_hash=""
    if [ "$branch_name" != "master" ]; then
        scoped_hash="-$(create_scope_hash_value)"
    fi
    local parameter_name="/${REPO_PARAMETER_NAME}$scoped_hash"
    echo "${parameter_name,,}"
}

function get_container_deployment_version(){
  local version="beta-build-$(create_scope_hash_value)"
  local branch_name=$(get_branch_name)
  if [  "$branch_name" == "master" ]; then
     version="latest"
  fi
  echo $version
}


function create_if_not_exist_and_publish_docker_image(){
    local docker_file="$1"
    local version=$(get_container_deployment_version)
    echo "Logging into docker ecr.... version= ${version}, Dockerfile=${docker_file}"
    local ecr_repository=$(get_ecr_full_registry_repository)
    local aws_region=$(get_aws_account_region)
    local repo_name=$(scope_repository_name)
   
    docker_ecr_get_login_password
    ecr_repository_exists "$repo_name"
    local status="$?"
    if [ $status != 0 ]; then
        echo "Creating aws repository="$repo_name" for docker image"
        aws ecr create-repository --repository-name "$repo_name" --region "$aws_region" 2>/dev/null
    fi   

    echo "Upload the image to ecr repository"
    upload_image_to_ecr
    return $?
}

function upload_image_to_ecr(){
    local ecr_repository=$(get_ecr_full_registry_repository)
    local version=$(get_container_deployment_version)
    docker tag "$IMAGE_CONTAINER_NAME:latest" "$ecr_repository:${version}"
    docker push "$ecr_repository:${version}"
    docker image rm  "$IMAGE_CONTAINER_NAME" -f
}

function create_new_or_update_docker_parameter_value(){
    local aws_region=$(get_aws_account_region)
    local ecr_repository=$(get_ecr_full_registry_repository)
    parameter_name=$(get_docker_repo_ssm_name)
    local parameter=$(aws ssm get-parameter --name "${parameter_name}" --output "json" --query  "Parameter.Value" 2>/dev/null)
    if [ -z "$parameter" ]; then
      
        aws ssm put-parameter --name "${parameter_name}" \
                                --description "Stores the docker image repo to used for this build." \
                                --value "${ecr_repository}" \
                                --region "$aws_region" \
                                --type "String" \
                                --overwrite \
                                2>/dev/null
    fi 
}

function build_and_create_image(){
    local ecr_repository=$(get_ecr_full_registry_repository)
    local aws_region=$(get_aws_account_region)

    local docker_file=$(get_docker_filename 2>/dev/null)
   
    if [ ! -f "$docker_file" ] ; then
        # Image content has changed and we have to rebuild it.
        echo "No changes to docker file"
        docker_file="$DOCKER_FILE"
    fi
    echo "Rebuilding docker container = $docker_file"
    local repo_name=$(scope_repository_name)
    build_docker_image_file "$docker_file" 2>/dev/null
    local status="$?"
    if [ $status != "0" ]; then
       echo "Docker build failed."
       return $status
    fi

    echo "Creating and publishing the docker image to ECR"
    create_if_not_exist_and_publish_docker_image "$docker_file" 2>/dev/null

    echo "Updating docker parameter = $(get_docker_repo_ssm_name)"
    create_new_or_update_docker_parameter_value
    status="$?"
    if [ $status != 0 ]; then
        echo "Unable to Update SSM parameter"
        return 1
    fi
    echo "Docker image successfully created"
}

build_and_create_image


