#!/bin/bash

chmod +x ./scripts/utils.sh  && . ./scripts/utils.sh

export WEB_APPLICATION_DIR="."

function build_web_application(){
  
  pushd "$WEB_APPLICATION_DIR"
    echo "Building web application"
    npm install .
    npm run build
    rm -rf ".next"
    rm -rf "next-env.d.ts"
  popd
  folder_exists "$WEB_CONTENT_DIST_FOLDER"
  return "$?"
}


build_web_application