FROM mcr.microsoft.com/devcontainers/go:1-1.24-bookworm AS base

RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    apt-get update && apt-get install -y nodejs
RUN npm install -g pnpm@10.2.0
RUN apt-get install git curl
RUN curl -sSfL https://raw.githubusercontent.com/air-verse/air/master/install.sh | sh -s -- -b $(go env GOPATH)/bin
RUN curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash

ENV VERSION=local

WORKDIR /workspace