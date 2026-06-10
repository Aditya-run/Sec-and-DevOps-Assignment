Assignment 1: Automated Container Build Pipeline
1.1	Application Code Create a simple “Hello World” web application.

File :- index.js

const express = require("express");
const app = express();
const port = 9000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);

  setTimeout(() => {
    console.log("Exiting after 3 seconds...");
    process.exit(0);
  }, 3000);
});

1.2 Dockerfile
File: Dockerfile
# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=24

FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.
ENV NODE_ENV production

WORKDIR /usr/src/app

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

# Run the application as a non-root user.
USER node

# Copy the rest of the source files into the image.
COPY . .

# Expose the port that the application listens on.
EXPOSE 9000

# Run the application.
CMD node index.js


1.3 GitHub Actions Workflow
File: .github/workflows/docker-build.yml
name: run docker container

on:
  push:
    branches: [master]

jobs:
  run-docker-container:
    runs-on: ubuntu-latest
    steps:
      - name: Check out the repository
        uses: actions/checkout@v2

      - name: Build and run Docker container
        run: |
          docker build -t my-docker-image:latest .
          docker run -p 9000:9000 --name my-docker-container my-docker-image:latest

1.4 Project Directory Structure
 
1.5 Screenshots Required
Screenshot 1: GitHub Actions Successful 
<img width="940" height="463" alt="image" src="https://github.com/user-attachments/assets/ba95e81f-57ee-4138-8e2b-049fe52cb29c" />

 
Log in to Docker Hub, Build and push).
Screenshot 2: Docker Hub Repository 
 <img width="940" height="416" alt="image" src="https://github.com/user-attachments/assets/1cf3ab4e-eb41-4abf-9ff7-eb025a744643" />

