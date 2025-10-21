import { Router, Request, Response } from 'express';
import { DatabaseService } from '../services/database.service';

const router = Router();
const dbService = new DatabaseService();

// Get statistics
router.get('/', async (req: Request, res: Response) => {
  try {
    const [serviceCount, categoryCount, servicesByCategory] = await Promise.all([
      dbService.getServiceCount(),
      dbService.getCategoryCount(),
      dbService.getServiceCountByCategory(),
    ]);

    res.json({
      success: true,
      data: {
        totalServices: serviceCount,
        totalCategories: categoryCount,
        servicesByCategory,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;
