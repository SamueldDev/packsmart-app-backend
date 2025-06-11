import { DataTypes, Op } from 'sequelize';
import { sequelize } from '../config/database.js';

export const PackingListItem = sequelize.define('PackingListItem', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  weight: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  isEssential: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    field: 'is_essential',
  },
  isPacked: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    field: 'is_packed',
  },
  listId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'list_id',
  },
}, {
  tableName: 'packing_list_items',
  underscored: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

// Add the static method directly to the model
PackingListItem.getTotalWeight = async function(listId) {
  const result = await PackingListItem.findOne({
    where: {
      listId,
      weight: { [Op.not]: null },
    },
    attributes: [
      [sequelize.fn('COALESCE', sequelize.fn('SUM', sequelize.col('weight')), 0), 'total_weight'],
    ],
    raw: true,
  });
  return parseFloat(result.total_weight) || 0;
};

export class PackingListItemService {
  static async create({ name, category, weight, isEssential, isPacked, listId }) {
    return await PackingListItem.create({ name, category, weight, isEssential, isPacked, listId });
  }

  static async findByListId(listId) {
    return await PackingListItem.findAll({
      where: { listId },
      order: [
        ['isEssential', 'DESC'],
        ['category', 'ASC'],
        ['name', 'ASC'],
      ],
    });
  }

  static async update(id, listId, data) {
    const [count, [updatedItem]] = await PackingListItem.update(
      data,
      {
        where: { id, listId },
        returning: true,
      }
    );
    if (!updatedItem) throw new Error('No fields to update or item not found');
    return updatedItem;
  }

  static async delete(id, listId) {
    const item = await PackingListItem.findOne({ where: { id, listId } });
    if (!item) return null;
    await item.destroy();
    return item;
  }

  static async getTotalWeight(listId) {
    return await PackingListItem.getTotalWeight(listId);
  }
}