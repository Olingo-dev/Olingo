#!/bin/bash

echo "Building React frontend..."
cd src/web
# npm run build
cd ..

echo "Building Olingo..."
go build -o build/olingo -ldflags "-X main.commitHash=$(git rev-parse --short HEAD)" -ldflags "-s -w" -buildvcs=false
GOOS=windows GOARCH=amd64 go build -o build/olingo.exe -ldflags "-X main.commitHash=$(git rev-parse --short HEAD)" -ldflags "-s -w" -buildvcs=false

echo "Build completed! Binary is in ./build/"