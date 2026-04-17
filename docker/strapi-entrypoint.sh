#!/bin/sh
set -e
cd /srv/app

if [ -f yarn.lock ]; then
  corepack enable
  yarn install
elif [ -f package-lock.json ]; then
  # Use npm install in dev to avoid hard failure when lockfile drift exists.
  npm install
else
  npm install
fi

exec npm run develop
