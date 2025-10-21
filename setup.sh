#!/bin/bash

echo "=== Agency Service Database Setup ==="
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo ""
echo "🔧 Generating Prisma Client..."
PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1 npx prisma generate

echo ""
echo "🗄️  Running database migrations..."
PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1 npx prisma migrate dev --name init

echo ""
echo "🌱 Seeding database..."
npm run prisma:seed

echo ""
echo "✅ Setup complete!"
echo ""
echo "To start the server, run:"
echo "  npm run dev"
echo ""
echo "To view the database in Prisma Studio:"
echo "  npm run prisma:studio"
echo ""
