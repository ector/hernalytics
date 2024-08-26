#!/bin/bash
# Terraform install scripts

chmod +x ./scripts/utils.sh && . ./scripts/utils.sh
NODE_BIN_FOLDER="${BIN_DIRECTORY}/tools/node"
NODE_REMOTE_INSTALL=https://deb.nodesource.com/setup_20.x

function is_node_installed(){
    local result=$(command_exists "node")
    local status=$?
    return $status
}

function install_nodejs(){
    echo "installing node cli tool..."
    local filename="$NODE_BIN_FOLDER/install.sh"
    file_exists $filename
    local status=$?
    if  [ $status != $SUCCESS ] ; then
     rm -rf $filename
     rm -rf $NODE_BIN_FOLDER
    fi
    
    mkdir -p $NODE_BIN_FOLDER

    pushd $NODE_BIN_FOLDER
        echo "installing node...."
        wget $NODE_REMOTE_INSTALL -O "install.sh" 
        bash install.sh
        apt install -y nodejs
        rm -rf "install.sh"
        echo "Node Installed"
    popd
    echo "Node Version : $(node --version) "
    return $?
}

install_nodejs