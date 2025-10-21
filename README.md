# Agency Service Database

Sistem manajemen database untuk daftar layanan agency crypto marketing dengan REST API.

## Fitur

- ✅ Database SQLite dengan Prisma ORM
- ✅ 8 Kategori layanan lengkap (Trending, Verification, Updates, Upvotes, Community, Banner, Press, CEX)
- ✅ 140+ layanan pre-loaded
- ✅ REST API dengan Express.js
- ✅ TypeScript untuk type safety
- ✅ CRUD operations untuk categories dan services
- ✅ Search dan filter functionality
- ✅ Pagination support
- ✅ Statistics endpoint

## Kategori Layanan

1. **TRENDING SERVICES** - Layanan trending di berbagai platform (Coingecko, CMC, Dextools, dll)
2. **VERIFICATION & LISTING** - Listing dan verifikasi di platform crypto
3. **UPDATES & INTEGRATION** - Update info dan integrasi wallet
4. **UPVOTES & ENGAGEMENT** - Upvotes, likes, followers, dan engagement
5. **COMMUNITY BUILDING** - Discord, Telegram, Twitter community growth
6. **BANNER & ADVERTISING** - Banner ads di berbagai platform
7. **PRESS & MEDIA** - Article feeds di platform media
8. **CEX LISTING** - Listing di centralized exchanges

## Requirements

- Node.js v16 atau lebih tinggi
- npm atau yarn

## Setup & Installation

### 1. Install dependencies

```bash
npm install
```

### 2. Setup database

```bash
# Generate Prisma Client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Seed database dengan sample data
npm run prisma:seed
```

Atau jalankan semuanya sekaligus:

```bash
npm run db:setup
```

### 3. Jalankan server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm run build
npm start
```

Server akan berjalan di `http://localhost:3000`

## API Endpoints

### Categories

- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `GET /api/categories/name/:name` - Get category by name
- `POST /api/categories` - Create new category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Services

- `GET /api/services` - Get all services (with optional filters)
- `GET /api/services/:id` - Get service by ID
- `GET /api/services/search?q=keyword` - Search services
- `GET /api/services/category/:categoryId` - Get services by category
- `POST /api/services` - Create new service
- `PUT /api/services/:id` - Update service
- `POST /api/services/:id/activate` - Activate service
- `POST /api/services/:id/deactivate` - Deactivate service
- `DELETE /api/services/:id` - Delete service

### Statistics

- `GET /api/stats` - Get database statistics

## Query Parameters

### GET /api/services

Supports filtering and pagination:

- `categoryId` - Filter by category ID
- `categoryName` - Filter by category name (e.g., TRENDING_SERVICES)
- `isActive` - Filter by active status (true/false)
- `searchTerm` - Search in service name, notes, and requirements
- `page` - Page number for pagination
- `limit` - Items per page

Examples:
```bash
# Get all trending services
GET /api/services?categoryName=TRENDING_SERVICES

# Search for "coingecko" services
GET /api/services?searchTerm=coingecko

# Get page 2 with 20 items per page
GET /api/services?page=2&limit=20

# Get only active services
GET /api/services?isActive=true
```

## Example Usage

### 1. Get all categories

```bash
curl http://localhost:3000/api/categories
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "TRENDING_SERVICES",
      "displayName": "TRENDING SERVICES",
      "order": 1,
      "_count": {
        "services": 24
      }
    }
  ]
}
```

### 2. Get category with services

```bash
curl http://localhost:3000/api/categories/name/TRENDING_SERVICES
```

### 3. Search services

```bash
curl http://localhost:3000/api/services/search?q=coingecko
```

### 4. Get statistics

```bash
curl http://localhost:3000/api/stats
```

Response:
```json
{
  "success": true,
  "data": {
    "totalServices": 140,
    "totalCategories": 8,
    "servicesByCategory": [
      {
        "category": "TRENDING SERVICES",
        "count": 24
      }
    ]
  }
}
```

### 5. Create new service

```bash
curl -X POST http://localhost:3000/api/services \
  -H "Content-Type: application/json" \
  -d '{
    "categoryId": "category-uuid",
    "number": 1,
    "serviceName": "New Service",
    "price": "100",
    "notes": "Service description"
  }'
```

### 6. Update service

```bash
curl -X PUT http://localhost:3000/api/services/:id \
  -H "Content-Type: application/json" \
  -d '{
    "price": "150",
    "notes": "Updated description"
  }'
```

## Database Schema

### Category Model
- `id` - UUID
- `name` - Unique category name
- `displayName` - Display name
- `order` - Sort order
- `services` - Related services

### Service Model
- `id` - UUID
- `categoryId` - Foreign key to Category
- `number` - Service number within category
- `serviceName` - Service name
- `price` - Price (string to support "Custom", ranges, etc)
- `requirement` - Requirements
- `processingTime` - Processing time
- `duration` - Duration
- `positionBracket` - Position/bracket info
- `marketPrice` - Market price
- `notes` - Additional notes
- `isActive` - Active status (default: true)

## Prisma Commands

```bash
# Open Prisma Studio (GUI database browser)
npm run prisma:studio

# Generate Prisma Client after schema changes
npm run prisma:generate

# Create a new migration
npx prisma migrate dev --name migration_name

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Format schema file
npx prisma format
```

## Development

### Project Structure

```
.
├── src/
│   ├── index.ts              # Express app entry point
│   ├── types/
│   │   └── index.ts          # TypeScript types and interfaces
│   ├── services/
│   │   └── database.service.ts  # Database service layer
│   └── routes/
│       ├── category.routes.ts   # Category endpoints
│       ├── service.routes.ts    # Service endpoints
│       └── stats.routes.ts      # Statistics endpoints
├── prisma/
│   ├── schema.prisma         # Prisma schema
│   └── seed.ts               # Database seed file
├── .env                      # Environment variables
├── package.json
├── tsconfig.json
└── README.md
```

### Adding New Services

1. Tambahkan service data di `prisma/seed.ts`
2. Jalankan seed ulang: `npm run prisma:seed`

Atau gunakan API endpoint:

```bash
curl -X POST http://localhost:3000/api/services \
  -H "Content-Type: application/json" \
  -d '{
    "categoryId": "category-id",
    "number": 25,
    "serviceName": "New Trending Service",
    "price": "200",
    "requirement": "10k vol",
    "processingTime": "2-4 hours",
    "duration": "24 hours",
    "positionBracket": "1-5",
    "marketPrice": "300-400",
    "notes": "Global"
  }'
```

### Modifying Schema

1. Edit `prisma/schema.prisma`
2. Create migration: `npx prisma migrate dev --name your_migration_name`
3. Generate client: `npm run prisma:generate`

## Environment Variables

Create a `.env` file:

```env
DATABASE_URL="file:./dev.db"
PORT=3000
NODE_ENV=development
```

## License

MIT

## Support

Untuk pertanyaan atau bantuan, silakan buat issue di repository ini.
