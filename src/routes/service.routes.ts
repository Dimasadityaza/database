import { Router, Request, Response } from 'express';
import { DatabaseService } from '../services/database.service';

const router = Router();
const dbService = new DatabaseService();

// Get all services with optional filters
router.get('/', async (req: Request, res: Response) => {
  try {
    const { categoryId, categoryName, isActive, searchTerm, page, limit } = req.query;

    const filter: any = {};
    if (categoryId) filter.categoryId = categoryId as string;
    if (categoryName) filter.categoryName = categoryName as string;
    if (isActive !== undefined) filter.isActive = isActive === 'true';
    if (searchTerm) filter.searchTerm = searchTerm as string;

    let result;
    if (page || limit) {
      result = await dbService.getServicesPaginated(filter, {
        page: page ? parseInt(page as string) : 1,
        limit: limit ? parseInt(limit as string) : 10,
      });
    } else {
      const services = await dbService.getAllServices(filter);
      result = { data: services };
    }

    res.json({
      success: true,
      ...result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Search services
router.get('/search', async (req: Request, res: Response) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({
        success: false,
        error: 'Search query parameter "q" is required',
      });
    }

    const services = await dbService.searchServices(q as string);
    res.json({
      success: true,
      data: services,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Get services by category
router.get('/category/:categoryId', async (req: Request, res: Response) => {
  try {
    const services = await dbService.getServicesByCategory(req.params.categoryId);
    res.json({
      success: true,
      data: services,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Get service by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const service = await dbService.getServiceById(req.params.id);
    if (!service) {
      return res.status(404).json({
        success: false,
        error: 'Service not found',
      });
    }
    res.json({
      success: true,
      data: service,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Create service
router.post('/', async (req: Request, res: Response) => {
  try {
    const service = await dbService.createService(req.body);
    res.status(201).json({
      success: true,
      data: service,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Update service
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const service = await dbService.updateService(req.params.id, req.body);
    res.json({
      success: true,
      data: service,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Deactivate service
router.post('/:id/deactivate', async (req: Request, res: Response) => {
  try {
    const service = await dbService.deactivateService(req.params.id);
    res.json({
      success: true,
      data: service,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Activate service
router.post('/:id/activate', async (req: Request, res: Response) => {
  try {
    const service = await dbService.activateService(req.params.id);
    res.json({
      success: true,
      data: service,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Delete service
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const service = await dbService.deleteService(req.params.id);
    res.json({
      success: true,
      data: service,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;
