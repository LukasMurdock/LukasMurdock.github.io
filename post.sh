#!/bin/zsh


# https://stackoverflow.com/questions/5947742/how-to-change-the-output-color-of-echo-in-linux
GREEN="\033[0;32m"
RED="\033[0;31m"
NC="\033[0m" # No Color


# https://codereview.stackexchange.com/questions/158124/generate-a-jekyll-blog-post-template-using-shell

filepath="/Users/lukas/Documents/GitHub/LukasMurdock.github.io/_posts/"
# printf $filepath"\n"

# fileName="_posts/`date +%F-$title.md`"


printf "\n"

printf $GREEN"Generating new post:"$NC"\n"

currentDate=$(date +%F)

printf ${RED}"Slug? "${currentDate}"-"${NC}
read slug

safeslug=`echo $slug | sed "s/ /-/g"`
# remove space from slug

printf ${RED}"Title? "${NC}
read title

# slug | tr " " "-"

printf "\n"

# date: May 28, 2021


basepath="${currentDate}-${safeslug}.md"
outputfile="$filepath$currentDate-${safeslug}.md"

printf "Post created at ${basepath}\n"
printf "$outputfile\n\n"

prettyDate=$(date +"%B %d, %Y")

touch ${outputfile}

cat << EOF >> "$outputfile"
---
layout: post
title: '$title'
description: ''
date: '$prettyDate'
---
EOF

code ${outputfile}