#!/bin/bash
VERSION=$1

echo "Building React frontend..."
cd ../src/web
yes | pnpm i
pnpm run build
cd ..

echo "Building Olingo..."
if [ -z "${VERSION}" ]; then
    echo "VERSION IS EMPTY OR UNSET, DEFAULTING TO LATEST COMMIT HASH AS VERSION"
    go build -o build/olingo -buildvcs=true -ldflags "-X main.version=$(git rev-parse --short HEAD) -s -w" -buildvcs=true
    GOOS=windows GOARCH=amd64 go build -o build/olingo.exe -buildvcs=true -ldflags "-X main.version=$(git rev-parse --short HEAD) -s -w" -buildvcs=true
else
    echo "VERSION SET TO $VERSION"
    go build -o build/olingo -buildvcs=true -ldflags "-X main.version=$VERSION -s -w" -buildvcs=true
    GOOS=windows GOARCH=amd64 go build -o build/olingo.exe -buildvcs=true -ldflags "-X main.version=$VERSION -s -w" -buildvcs=true
fi


echo "Build completed! Binary is in ./build/" 