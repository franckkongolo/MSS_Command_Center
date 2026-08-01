#!/bin/bash
set -e
cd "$(dirname "$0")"
npm install --prefix frontend
npm install --prefix backend
npm install -D typescript@5.9.2 --prefix backend
echo
echo "Installation terminée."
echo "Lance ensuite 01_START_FRONTEND.command et 02_START_BACKEND.command."
read -p "Appuie sur Entrée pour fermer..."
