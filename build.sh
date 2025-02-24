#!/bin/bash

echo "Building React frontend..."
cd ./src/web
yes | pnpm i
pnpm run build
cd ..

echo "Building Olingo..."

go build -o build/olingo -buildvcs=true -ldflags "-X main.commitHash=$(git rev-parse --short HEAD) -s -w" -buildvcs=true
GOOS=windows GOARCH=amd64 go build -o build/olingo.exe -buildvcs=true -ldflags "-X main.commitHash=$(git rev-parse --short HEAD) -s -w" -buildvcs=true

echo "Build completed! Binary is in ./build/" 