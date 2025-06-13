

import PackingItem from "../models/PackingItemModel.js";
import Trip from "../models/TripModel.js";

// ✅ Create a packing item
export const addPackingItem = async (req, res) => {
  try {
    const { tripId, items } = req.body;

    const trip = await Trip.findOne({ where: { id: tripId, userId: req.user.id } });
    if (!trip) {
      return res.status(404).json({ message: "Trip not found or not owned by user" });
    }

    if (Array.isArray(items)) {
      const createdItems = await PackingItem.bulkCreate(
        items.map((item) => ({
          tripId,
          name: item.name,
          quantity: item.quantity || 1,
          category: item.category || null,
          note: item.note || null,
        }))
      );

      return res.status(201).json({ message: "Packing items added", items: createdItems });
    }

    // fallback for single item
    const { name, quantity, category, note } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Item name is required" });
    }

    const item = await PackingItem.create({
      tripId,
      name,
      quantity,
      category,
      note,
    });

    res.status(201).json({ message: "Packing item added", item });

  } catch (error) {
    res.status(500).json({ message: "Failed to add packing item(s)", error: error.message });
  }
};





// 📄 Get all packing items for a trip + packing progress
export const getPackingItems = async (req, res) => {
  try {
    const { tripId } = req.params;

    const items = await PackingItem.findAll({ where: { tripId } });

    const total = items.length;
    const packedCount = items.filter(item => item.packed).length;
    const progress = total === 0 ? 0 : Math.round((packedCount / total) * 100);

    res.json({
      items,
      total,
      packedCount,
      unpackedCount: total - packedCount,
      progressPercent: progress,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch packing items", error: error.message });
  }
};








// 🖊️ Update a packing item (name, quantity, packed, etc.)
export const updatePackingItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const item = await PackingItem.findByPk(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    await item.update(updates);
    res.json({ message: "Packing item updated", item });
  } catch (error) {
    res.status(500).json({ message: "Failed to update item", error: error.message });
  }
};







// ❌ Delete a packing item
export const deletePackingItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await PackingItem.findByPk(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    await item.destroy();
    res.json({ message: "Packing item deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete item", error: error.message });
  }
};









// bulk items create from tags destination
export const createPackingItemsBulk = async (req, res) => {
  const { tripId, items } = req.body;
  const userId = req.user.id;

  if (!tripId || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "tripId and items[] are required" });
  }

  const trip = await Trip.findOne({ where: { id: tripId, userId } });
  if (!trip) {
    return res.status(404).json({ error: "Trip not found or not yours" });
  }

  try {
    // Normalize input items: trim + lowercase
    const normalizedItems = items.map(name => name.trim().toLowerCase());

    // Fetch ALL existing items for this trip (not just matching)
    const existingItems = await PackingItem.findAll({
      where: {
        tripId,
        userId
      }
    });

    // Normalize existing item names for comparison
    const existingNames = new Set(
      existingItems.map(item => item.name.trim().toLowerCase())
    );

    // Filter out duplicates (case-insensitive)
    const uniqueItems = items.filter(name => {
      const lowerName = name.trim().toLowerCase();
      return !existingNames.has(lowerName);
    });

    if (uniqueItems.length === 0) {
      return res.status(200).json({ message: "All items already exist (case-insensitive)", added: [] });
    }

    // Prepare and insert new items (keep original casing in DB)
    const recordsToInsert = uniqueItems.map(name => ({
      name: name.trim(),
      isPacked: false,
      tripId,
      userId
    }));

    const createdItems = await PackingItem.bulkCreate(recordsToInsert);

    return res.status(201).json({
      message: `${createdItems.length} item(s) added`,
      added: createdItems
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to create packing items" });
  }
};



