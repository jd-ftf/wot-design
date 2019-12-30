#! /bin/sh

npm run unit

npm run dist

if [ $RELEASE_NAME ]; then
  # only build document when deploy
  npm run build:docs
fi
