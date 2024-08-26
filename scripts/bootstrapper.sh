#!/bin/bash

chmod +x ./scripts/python_utils.sh  && . ./scripts/python_utils.sh

BOOTSTRAP_PYTHON_ENTRY_FILE="./scripts/tools/bootstrapping/main.py"

execute_file "$BOOTSTRAP_PYTHON_ENTRY_FILE"

