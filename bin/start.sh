#!/bin/bash

cd $(dirname "$0")/..

until curl -fsS "${BASE_SERVER:-http://be.mef.dom:8091}" > /dev/null; do
  echo "Waiting for service to be ready at ${BASE_SERVER:-http://be.mef.dom:8091} ..."
  sleep 2
done

npm run build
npm run start