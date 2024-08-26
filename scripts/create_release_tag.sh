#!/bin/bash

chmod +x ./scripts/utils.sh &&  . ./scripts/utils.sh

function is_release_note_file() {
    local filename="$1"
    if [[ "$filename" == *"CHANGELOG.md"* ]]; then
        return 0
    fi
    return 1
}

function contains_release_note_only() {
    local filenames=$(get_changed_files)
    local counter=0
    for file in $filenames; do
        is_release_note_file "$file"
        local status=$?
        if [ "$status" == "1" ]; then
            echo "$filenames"
            return 1
        fi
        ((counter++))
    done

    if [ $counter == 0 ]; then
        return 1
    fi
    return 0
}

function get_formatted_date() {
    local formatted_date=$(date +'%Y_%m_%d')
    echo "$formatted_date"
}

function get_last_5_commit_hashes() {
   local commit_hashes=$(git log --format=%H -n 5)
    echo "$commit_hashes" | while read -r line; do
        echo "${line:0:5}"
        return 0
    done
}

function create_release_tag() {
    local version="$APP_VERSION"
    local release_date=$(get_formatted_date)
    local commit_hashes=$(get_last_5_commit_hashes)
    local release_tag="$(get_branch_name)_unrelease_${commit_hashes}_${release_date}_v${version}"
    git tag "$release_tag"
    if [ $? -eq 0 ]; then
        echo "release tag '$release_tag' created successfully."
        return 0  
    fi
    export "$release_tag"
}

create_release_tag
