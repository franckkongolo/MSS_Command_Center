#!/bin/bash
set -e
cd "$(dirname "$0")/backend"
npm install
npm install -D typescript@5.9.2
npm run start:dev
