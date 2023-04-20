#!/bin/sh

# Build the TypeScript app
npm run build

# Run the seeds script if the SEED_DB environment variable is set to "true"
if [ "$SEED_DB" = "true" ]; then
  echo "Seeding the database..."
  node dist/seeds/index.js
fi

# Start the server
npm run start