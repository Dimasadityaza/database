# Setup Guide

## Quick Setup (Recommended)

### Option 1: Using setup script (Linux/Mac)

```bash
chmod +x setup.sh
./setup.sh
```

### Option 2: Manual setup

```bash
# 1. Install dependencies
npm install

# 2. Generate Prisma Client
npm run prisma:generate
# If you get a 403 error, use:
PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1 npx prisma generate

# 3. Create database and run migrations
npm run prisma:migrate
# If you get a 403 error, use:
PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1 npx prisma migrate dev --name init

# 4. Seed database with sample data
npm run prisma:seed

# 5. Start the server
npm run dev
```

## Troubleshooting

### 403 Forbidden Error when generating Prisma Client

If you see an error like:
```
Error: Failed to fetch the engine file at https://binaries.prisma.sh/... - 403 Forbidden
```

This is usually due to network restrictions or firewall issues. Solutions:

1. **Use environment variable:**
   ```bash
   PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1 npx prisma generate
   ```

2. **Update Prisma version:**
   ```bash
   npm install prisma@latest @prisma/client@latest
   ```

3. **Use local Prisma engines:**
   Add to your `.env`:
   ```
   PRISMA_SKIP_POSTINSTALL_GENERATE=1
   ```

4. **Install behind proxy:**
   ```bash
   npm config set proxy http://proxy-server:port
   npm config set https-proxy http://proxy-server:port
   ```

### Database file permissions

If you get permission errors:
```bash
chmod 755 prisma/
touch prisma/dev.db
chmod 644 prisma/dev.db
```

### TypeScript compilation errors

Make sure TypeScript is installed:
```bash
npm install -D typescript ts-node @types/node
```

## Verifying Setup

After setup, verify everything works:

```bash
# 1. Check if database was created
ls prisma/dev.db

# 2. Run example scripts
npm run dev &
sleep 2
curl http://localhost:3000/api/stats

# 3. Open Prisma Studio to view data
npm run prisma:studio
```

## Database Location

The SQLite database file is located at:
```
prisma/dev.db
```

You can also use any SQLite browser to view the database directly.

## Next Steps

Once setup is complete:

1. ✅ Start the server: `npm run dev`
2. ✅ View API docs: Open `http://localhost:3000`
3. ✅ Browse database: `npm run prisma:studio`
4. ✅ Test endpoints: See README.md for examples

## Alternative: Use Docker (Coming Soon)

For an easier setup experience, we'll be adding Docker support soon:

```bash
docker-compose up
```

This will handle all dependencies and setup automatically.
