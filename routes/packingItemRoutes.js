// routes/items.js
import { Router } from 'express';
import { addItem, updateItem, deleteItem } from '../controllers/packingItemController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { validatePackingItem } from '../middlewares/validation.js';

const router = Router();

router.post('/lists/:listId/items', authenticateToken, validatePackingItem, addItem);
router.put('/lists/:listId/items/:itemId', authenticateToken, updateItem);
router.delete('/lists/:listId/items/:itemId', authenticateToken, deleteItem);

export default router;