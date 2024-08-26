#!/bin/bash
# Terraform install scripts

chmod +x ./scripts/utils.sh && . ./scripts/utils.sh
export TERRAFORM_BIN_FOLDER="${BIN_DIRECTORY}/tools/terraform"

function is_terraform_installed(){
    local result=$(command_exists $TERRAFORM_CXX)
    local status=$?
    return $status
}

function install_terraform(){
    echo "installing terraform cli tool..."
    local filename="$TERRAFORM_BIN_FOLDER/$TERRAFORM_ZIP_FILENAME"
    file_exists $filename
    local status=$?
    if  [ $status != $SUCCESS ] ; then
     rm -rf $filename
     rm -rf $TERRAFORM_BIN_FOLDER
    fi
    
    mkdir -p $TERRAFORM_BIN_FOLDER

    pushd $TERRAFORM_BIN_FOLDER
        echo "installing terraform...."
        wget $TERRAFORM_REMOTE_PATH 
        unzip $TERRAFORM_ZIP_FILENAME
        mkdir -p ~/.terraform.d/plugins/
        mv -fu terraform /usr/local/bin/
        cp /usr/local/bin/terraform ~/.terraform.d/plugins/
        echo "Installation completed"
        rm -rf $TERRAFORM_ZIP_FILENAME
        rm -rf LICENSE.txt
        echo "clean up"
    popd
    echo "Installed : $($TERRAFORM_CXX --version) "
    return $?
}

install_terraform