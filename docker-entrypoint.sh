#!/bin/sh

set -e

# Đợi DB sẵn sàng
./wait-for-it.sh db:5432 --timeout=30 --strict -- echo "Database is up, running migrations..."


echo "Running Prisma migrations..."
npx prisma migrate deploy

echo "Running seed script..."
npm run seed

echo "Starting NestJS backend..."
node dist/src/main.js
