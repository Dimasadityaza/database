import { Router, Request, Response } from 'express';
import { DatabaseService } from '../services/database.service';

const router = Router();
const dbService = new DatabaseService();

// Get all categories
router.get('/', async (req: Request, res: Response) => {
  try {
    const categories = await dbService.getAllCategories();
    res.json({
      success: true,
      data: categories,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Get category by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const category = await dbService.getCategoryById(req.params.id);
    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Category not found',
      });
    }
    res.json({
      success: true,
      data: category,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Get category by name
router.get('/name/:name', async (req: Request, res: Response) => {
  try {
    const category = await dbService.getCategoryByName(req.params.name);
    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Category not found',
      });
    }
    res.json({
      success: true,
      data: category,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Create category
router.post('/', async (req: Request, res: Response) => {
  try {
    const category = await dbService.createCategory(req.body);
    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Update category
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const category = await dbService.updateCategory(req.params.id, req.body);
    res.json({
      success: true,
      data: category,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Delete category
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const category = await dbService.deleteCategory(req.params.id);
    res.json({
      success: true,
      data: category,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;
