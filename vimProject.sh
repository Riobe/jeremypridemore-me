#! /bin/bash

vim --remote-silent $(find -type f -name "*.js" -o -name "*.css" -o -name "*.jade" -o -name "*.json" -o -name "*.md"| grep -vE "node_modules|public/components")
