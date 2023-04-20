# Layer 1: Use the official Node.js image as the base image
FROM node:19-alpine

# Layer 2: Set the working directory for the app
WORKDIR /app

# Layer 3: Copy the package.json file (if available)
COPY package.json ./

# Layer 4: Install the dependencies listed in the package.json file
RUN npm install

# Layer 5: Copy the rest of the application files into the container
COPY . .

# Layer 6: Build the TypeScript project
RUN npm run build

# Layer 7: Set the environment variable for the Node.js app (use the production value for a deployed app)
ENV NODE_ENV production

# Layer 8: Expose the port your server will listen on
EXPOSE 5000

# Layer 9: Copy the entrypoint script
COPY entrypoint.sh /app

# Layer 10: Set the entrypoint
ENTRYPOINT ["/app/entrypoint.sh"]
