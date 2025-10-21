# API Usage Examples

Comprehensive examples untuk menggunakan Agency Service Database API.

## Base URL

```
http://localhost:3000
```

## 1. Categories

### Get all categories

```bash
curl http://localhost:3000/api/categories
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "clx1234...",
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

### Get category by name with all services

```bash
curl http://localhost:3000/api/categories/name/TRENDING_SERVICES
```

## 2. Services

### Get all services

```bash
curl http://localhost:3000/api/services
```

### Get services with pagination

```bash
# Page 1, 20 items per page
curl "http://localhost:3000/api/services?page=1&limit=20"
```

### Filter by category

```bash
# By category name
curl "http://localhost:3000/api/services?categoryName=TRENDING_SERVICES"

# By category ID
curl "http://localhost:3000/api/services?categoryId=clx1234..."
```

### Search services

```bash
# Search in service name, notes, and requirements
curl "http://localhost:3000/api/services?searchTerm=coingecko"

# Or use dedicated search endpoint
curl "http://localhost:3000/api/services/search?q=trending"
```

### Get only active services

```bash
curl "http://localhost:3000/api/services?isActive=true"
```

### Combined filters

```bash
curl "http://localhost:3000/api/services?categoryName=TRENDING_SERVICES&isActive=true&page=1&limit=10"
```

### Get services by category ID

```bash
curl http://localhost:3000/api/services/category/clx1234...
```

### Get single service

```bash
curl http://localhost:3000/api/services/clx5678...
```

## 3. Create, Update, Delete

### Create new service

```bash
curl -X POST http://localhost:3000/api/services \
  -H "Content-Type: application/json" \
  -d '{
    "categoryId": "clx1234...",
    "number": 25,
    "serviceName": "New Coingecko Service",
    "price": "200",
    "requirement": "15k vol",
    "processingTime": "3-6 Hours",
    "duration": "24 hours",
    "positionBracket": "1-5",
    "marketPrice": "300-400",
    "notes": "Global service"
  }'
```

### Update service

```bash
curl -X PUT http://localhost:3000/api/services/clx5678... \
  -H "Content-Type: application/json" \
  -d '{
    "price": "250",
    "notes": "Updated pricing"
  }'
```

### Activate/Deactivate service

```bash
# Deactivate
curl -X POST http://localhost:3000/api/services/clx5678.../deactivate

# Activate
curl -X POST http://localhost:3000/api/services/clx5678.../activate
```

### Delete service

```bash
curl -X DELETE http://localhost:3000/api/services/clx5678...
```

## 4. Statistics

### Get database statistics

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
      },
      {
        "category": "VERIFICATION & LISTING",
        "count": 16
      }
    ]
  }
}
```

## 5. Real-World Use Cases

### Use Case 1: Display trending services on website

```javascript
// Frontend code example
async function loadTrendingServices() {
  const response = await fetch(
    'http://localhost:3000/api/services?categoryName=TRENDING_SERVICES&isActive=true'
  );
  const data = await response.json();

  if (data.success) {
    displayServices(data.data);
  }
}
```

### Use Case 2: Search functionality

```javascript
async function searchServices(query) {
  const response = await fetch(
    `http://localhost:3000/api/services/search?q=${encodeURIComponent(query)}`
  );
  const data = await response.json();

  return data.success ? data.data : [];
}
```

### Use Case 3: Get service details for quote

```javascript
async function getServiceQuote(serviceId) {
  const response = await fetch(
    `http://localhost:3000/api/services/${serviceId}`
  );
  const data = await response.json();

  if (data.success) {
    const service = data.data;
    return {
      name: service.serviceName,
      price: service.price,
      marketPrice: service.marketPrice,
      processingTime: service.processingTime,
      notes: service.notes
    };
  }
}
```

### Use Case 4: Admin panel - Update pricing

```javascript
async function updateServicePrice(serviceId, newPrice) {
  const response = await fetch(
    `http://localhost:3000/api/services/${serviceId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        price: newPrice
      })
    }
  );

  return await response.json();
}
```

### Use Case 5: Get all CEX listings

```bash
curl "http://localhost:3000/api/services?categoryName=CEX_LISTING"
```

### Use Case 6: Find all services under $100

```javascript
async function getAffordableServices() {
  const response = await fetch('http://localhost:3000/api/services?isActive=true');
  const data = await response.json();

  if (data.success) {
    return data.data.filter(service => {
      const price = parseFloat(service.price);
      return !isNaN(price) && price <= 100;
    });
  }
}
```

## 6. Testing with JavaScript (Node.js)

```javascript
// test-api.js
const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000';

async function testAPI() {
  try {
    // Get stats
    const statsRes = await fetch(`${BASE_URL}/api/stats`);
    const stats = await statsRes.json();
    console.log('Stats:', stats);

    // Search for coingecko services
    const searchRes = await fetch(`${BASE_URL}/api/services/search?q=coingecko`);
    const searchResults = await searchRes.json();
    console.log(`Found ${searchResults.data.length} coingecko services`);

    // Get trending services
    const trendingRes = await fetch(
      `${BASE_URL}/api/services?categoryName=TRENDING_SERVICES&limit=5`
    );
    const trending = await trendingRes.json();
    console.log('Top 5 trending services:', trending.data);

  } catch (error) {
    console.error('Error:', error);
  }
}

testAPI();
```

## 7. Testing with Python

```python
# test_api.py
import requests

BASE_URL = 'http://localhost:3000'

def test_api():
    # Get stats
    response = requests.get(f'{BASE_URL}/api/stats')
    stats = response.json()
    print('Stats:', stats)

    # Search services
    response = requests.get(f'{BASE_URL}/api/services/search', params={'q': 'coingecko'})
    results = response.json()
    print(f"Found {len(results['data'])} services")

    # Get trending services
    response = requests.get(f'{BASE_URL}/api/services', params={
        'categoryName': 'TRENDING_SERVICES',
        'limit': 5
    })
    trending = response.json()
    print('Trending services:', trending['data'])

if __name__ == '__main__':
    test_api()
```

## 8. Postman Collection

Import this JSON into Postman:

```json
{
  "info": {
    "name": "Agency Service Database API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Get All Categories",
      "request": {
        "method": "GET",
        "url": "http://localhost:3000/api/categories"
      }
    },
    {
      "name": "Get All Services",
      "request": {
        "method": "GET",
        "url": "http://localhost:3000/api/services"
      }
    },
    {
      "name": "Search Services",
      "request": {
        "method": "GET",
        "url": {
          "raw": "http://localhost:3000/api/services/search?q=trending",
          "query": [
            {
              "key": "q",
              "value": "trending"
            }
          ]
        }
      }
    },
    {
      "name": "Get Statistics",
      "request": {
        "method": "GET",
        "url": "http://localhost:3000/api/stats"
      }
    }
  ]
}
```

## Response Format

All endpoints return responses in this format:

### Success Response
```json
{
  "success": true,
  "data": {...}
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message"
}
```

### Paginated Response
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 140,
    "totalPages": 14
  }
}
```
