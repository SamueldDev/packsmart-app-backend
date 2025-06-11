import { PackingList, PackingListService } from '../models/packingListModel.js';
import { PackingListItem, PackingListItemService } from '../models/packingItemModel.js';

export const createList = async (req, res, next) => {
  try {
    const { name, tripType, destination } = req.body;
    const list = await PackingList.create({
      name,
      tripType,
      destination,
      userId: req.user.id,
    });

    res.status(201).json({
      message: 'Packing list created successfully',
      list,
    });
  } catch (error) {
    next(error);
  }
};

export const getLists = async (req, res, next) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const lists = await PackingListService.findByUserId(req.user.id, {
      limit: parseInt(limit),
      offset,
    });

    res.json({ lists });
  } catch (error) {
    next(error);
  }
};

export const getList = async (req, res, next) => {
  try {
    const { id } = req.params;
    const list = await PackingList.findOne({
      where: { id, userId: req.user.id },
    });

    if (!list) {
      return res.status(404).json({ error: 'Packing list not found' });
    }

    // Assuming PackingListItem has a findAll method and getTotalWeight is implemented
    const items = await PackingListItem.findAll({ where: { listId: id } });
    const totalWeight = await PackingListItem.getTotalWeight(id);

    res.json({
      list: {
        ...list.toJSON(),
        items,
        totalWeight,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateList = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, tripType, destination } = req.body;

    const [count, [updatedList]] = await PackingList.update(
      { name, tripType, destination },
      {
        where: { id, userId: req.user.id },
        returning: true,
      }
    );

    if (!updatedList) {
      return res.status(404).json({ error: 'Packing list not found' });
    }

    res.json({
      message: 'Packing list updated successfully',
      list: updatedList,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteList = async (req, res, next) => {
  try {
    const { id } = req.params;
    const list = await PackingList.findOne({ where: { id, userId: req.user.id } });

    if (!list) {
      return res.status(404).json({ error: 'Packing list not found' });
    }

    await list.destroy();

    res.json({ message: 'Packing list deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const shareList = async (req, res, next) => {
  try {
    const { id } = req.params;
    const shareToken = await PackingListService.generateShareToken(id, req.user.id);

    if (!shareToken) {
      return res.status(404).json({ error: 'Packing list not found' });
    }

    res.json({
      message: 'Share link generated successfully',
      shareUrl: `${process.env.FRONTEND_URL}/shared/${shareToken}`,
    });
  } catch (error) {
    next(error);
  }
};

export const getSharedList = async (req, res, next) => {
  try {
    const { shareToken } = req.params;
    const list = await PackingListService.getSharedList(shareToken);

    if (!list) {
      return res.status(404).json({ error: 'Shared list not found or expired' });
    }

    const items = await PackingListItem.findAll({ where: { listId: list.id } });
    const totalWeight = await PackingListItem.getTotalWeight(list.id);

    res.json({
      list: {
        ...list.toJSON(),
        items,
        totalWeight,
      },
    });
  } catch (error) {
    next(error);
  }
};