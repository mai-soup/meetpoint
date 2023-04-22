# Layer 1: Telling Docker to use the node:19-alpine image as the base image for the container.
FROM node:19-alpine AS build

# Layer 2: Telling Docker to create a directory called `app` in the container and set it as the working directory.
WORKDIR /app

# Layer 3: Copying the package.json and package-lock.json files from the root of the project to the `app` directory in the container.
COPY package*.json ./

# Layer 4: Installing the dependencies listed in the package.json file.
RUN npm ci

# Layer 5: Copying all the files from the root of the project to the `app` directory in the container.
COPY . .

# Layer 6: Build the production version of the app
RUN npm run build
