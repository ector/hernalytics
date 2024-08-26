#!/bin/bash
chmod +x ./scripts/utils.sh && . ./scripts/utils.sh


function install_aws_cli(){   
    local filename="${AWS_CLI_FILENAME_ZIP%.*}"
    echo "Installing AWS CLI '$filename'"
    if [ -f "$AWS_CLI_FILENAME_ZIP" ]; then
        rm -rf "$AWS_CLI_FILENAME_ZIP"
    fi
    wget "${AWS_LINUX_PACKAGE}"
    unzip -o "${AWS_CLI_FILENAME_ZIP}" -d "$filename"


    pushd "$filename/aws"
      echo "Installing in folder '$(pwd)'"
      chmod +x ./install && ./install 
    popd

    rm -rf $filename
    rm -rf "$AWS_CLI_FILENAME_ZIP"
    local version=$(aws --version)   
    echo "AWS CLI installed , version=${version}"
}

install_aws_cli