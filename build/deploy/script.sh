#! /bin/sh

if [ $RELEASE_NAME ]; then
  # only build document when deploy
  npm run build:docs
fi
