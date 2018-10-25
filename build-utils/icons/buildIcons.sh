#!/bin/bash

cd ./src/components/CorasIcons
rm components/*
npx svgr --config-file svgr.config.js --title-prop --ext tsx -d components svg
node z_generateCorasIcons.js components