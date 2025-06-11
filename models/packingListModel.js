import { DataTypes, Op } from 'sequelize';
import { sequelize } from '../config/database.js';
import { User } from '../models/userModel.js';
import { PackingListItem } from '../models/packingItemModel.js';

export const PackingList = sequelize.define('PackingList', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tripType: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'trip_type',
  },
  destination: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shareToken: {
    type: DataTypes.STRING,
    field: 'share_token',
  },
  isShared: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_shared',
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id',
  },
}, {
  tableName: 'packing_lists',
  underscored: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

// Associations
PackingList.belongsTo(User, { foreignKey: 'user_id', as: 'owner' });
PackingList.hasMany(PackingListItem, { foreignKey: 'list_id', as: 'items' });

export class PackingListService {
  static async create({ name, tripType, destination, userId }) {
    return await PackingList.create({ name, tripType, destination, userId });
  }

  static async findByUserId(userId, { limit = 50, offset = 0 } = {}) {
    const { rows, count } = await PackingList.findAndCountAll({
      where: { userId },
      include: [
        {
          model: PackingListItem,
          as: 'items',
          attributes: [],
        },
      ],
      attributes: {
        include: [
          [
            sequelize.literal(`(
              SELECT COUNT(*)
              FROM packing_list_items AS pli
              WHERE pli.list_id = "PackingList"."id"
            )`),
            'item_count',
          ],
        ],
      },
      order: [['updated_at', 'DESC']],
      limit,
      offset,
    });
    return rows;
  }

  static async findById(id, userId) {
    return await PackingList.findOne({
      where: { id, userId },
    });
  }

  static async update(id, userId, { name, tripType, destination }) {
    const [count, [updatedList]] = await PackingList.update(
      { name, tripType, destination },
      {
        where: { id, userId },
        returning: true,
      }
    );
    return updatedList;
  }

  static async delete(id, userId) {
    const list = await PackingList.findOne({ where: { id, userId } });
    if (!list) return null;
    await list.destroy();
    return list;
  }

  static async getSharedList(shareToken) {
    return await PackingList.findOne({
      where: {
        shareToken,
        isShared: true,
      },
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['name'],
        },
      ],
    });
  }

  static async generateShareToken(id, userId) {
    const shareToken =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    const [count, [updatedList]] = await PackingList.update(
      { shareToken, isShared: true },
      {
        where: { id, userId },
        returning: true,
      }
    );
    return updatedList?.shareToken;
  }
}