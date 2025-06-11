import { PackingListItem, PackingListItemService } from '../models/packingItemModel.js';
import { PackingList } from '../models/packingListModel.js';

export const addItem = async (req, res, next) => {
  try {
    const { listId } = req.params;
    const { name, category, weight, isEssential, isPacked } = req.body;

    // Verify list ownership
    const list = await PackingList.findOne({ where: { id: listId, userId: req.user.id } });
    if (!list) {
      return res.status(404).json({ error: 'Packing list not found' });
    }

    const item = await PackingListItem.create({
      name,
      category,
      weight,
      isEssential: isEssential || false,
      isPacked: isPacked || false,
      listId,
    });

    res.status(201).json({
      message: 'Item added successfully',
      item,
    });
  } catch (error) {
    next(error);
  }
};

export const updateItem = async (req, res, next) => {
  try {
    const { listId, itemId } = req.params;
    const updateData = req.body;

    // Verify list ownership
    const list = await PackingList.findOne({ where: { id: listId, userId: req.user.id } });
    if (!list) {
      return res.status(404).json({ error: 'Packing list not found' });
    }

    const [count, [item]] = await PackingListItem.update(
      updateData,
      {
        where: { id: itemId, listId },
        returning: true,
      }
    );
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json({
      message: 'Item updated successfully',
      item,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteItem = async (req, res, next) => {
  try {
    const { listId, itemId } = req.params;

    // Verify list ownership
    const list = await PackingList.findOne({ where: { id: listId, userId: req.user.id } });
    if (!list) {
      return res.status(404).json({ error: 'Packing list not found' });
    }

    const item = await PackingListItem.findOne({ where: { id: itemId, listId } });
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    await item.destroy();

    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    next(error);
  }
};