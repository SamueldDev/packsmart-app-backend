// routes/packingLists.js
import { Router } from 'express';
import {
  createList,
  getLists,
  getList,
  updateList,
  deleteList,
  shareList,
  getSharedList
} from '../controllers/packingListController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { validatePackingList } from '../middlewares/validation.js';

const router = Router();

router.post('/', authenticateToken, validatePackingList, createList);
router.get('/', authenticateToken, getLists);
router.get('/:id', authenticateToken, getList);
router.put('/:id', authenticateToken, validatePackingList, updateList);
router.delete('/:id', authenticateToken, deleteList);
router.post('/:id/share', authenticateToken, shareList);
router.get('/shared/:shareToken', getSharedList);

export default router;