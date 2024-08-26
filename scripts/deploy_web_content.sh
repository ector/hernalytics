chmod +x ./scripts/utils.sh &&  . ./scripts/utils.sh
export APP_NAME="hernanlytics"

function get_webbucket_parameter_name(){
  local branch_name=$(get_branch_name)
  echo "/${branch_name}/${APP_NAME}/bucket/ssm/portal/arn"
}

function get_web_hosting_s3_bucket_name(){
    local branch_name=$(get_branch_name)
    local region_name=$(get_aws_account_region)
    local parameter_name=$(get_webbucket_parameter_name)
    local value=$(aws ssm get-parameter \
            --name "$parameter_name" \
            --output "text" \
            --region "$region_name" \
            --query "Parameter.Value")
    echo $value
}


function deploy_web_application(){
  local bucket_name=$(get_web_hosting_s3_bucket_name)
  if [ -z "$bucket_name" ] ; then
    echo "No bucket parameter or name found."
    return 1
  fi

  folder_exists "$WEB_CONTENT_DIST_FOLDER"
  local status="$?"
  if [ $status != 0 ]; then
    echo "web application required building again"
    return 1
  fi

  local region_name=$(get_aws_account_region)

  # upload the content
  aws s3 cp "$WEB_CONTENT_DIST_FOLDER" s3://$bucket_name --recursive --region "${region_name}"
}

deploy_web_application
