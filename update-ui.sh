#!/bin/bash -e

VERSION=$(cd ../docs-ui && git rev-parse --short HEAD)
BUNDLE_FILENAME=ui-bundle-$VERSION.zip

rm -f ui-bundle-*.zip
yarn --cwd=../docs-ui gulp bundle
cp ../docs-ui/build/ui-bundle.zip $BUNDLE_FILENAME

echo "export const uiBundleFileName = '$BUNDLE_FILENAME'" > src/ui.mjs
