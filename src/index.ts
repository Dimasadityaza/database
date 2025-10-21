import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import categoryRoutes from './routes/category.routes';
import serviceRoutes from './routes/service.routes';
import statsRoutes from './routes/stats.routes';

// Load environment variables
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware (simple version)
app.use((req: Request, res: Response, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Agency Service Database API',
    version: '1.0.0',
    endpoints: {
      categories: '/api/categories',
      services: '/api/services',
      stats: '/api/stats',
    },
  });
});

app.use('/api/categories', categoryRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/stats', statsRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
  });
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: any) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
  });
});

// Start server
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  console.log(`📊[database]: Database connection ready`);
  console.log(`\n🔗 Available endpoints:`);
  console.log(`   GET  http://localhost:${port}/api/categories`);
  console.log(`   GET  http://localhost:${port}/api/services`);
  console.log(`   GET  http://localhost:${port}/api/stats`);
});

export default app;
