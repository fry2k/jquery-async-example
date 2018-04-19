#!/bin/bash
cp src/jQuery-loader.js dist/
bin/build-html.sh

onchange 'src/*.html' -- npm run build-html