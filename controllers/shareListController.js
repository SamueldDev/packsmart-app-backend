
import SharedList from "../models/SharedListModel.js";
import Trip from "../models/TripModel.js";
import User from "../models/userModel.js";

import { generateShareToken } from "../utilis/generateShareLink.js";

export const createShareableLink = async (req, res) => {
  try {
    const { tripId, permission = "view", expiresAt } = req.body;
    const sharedByUserId = req.user.id;

    const trip = await Trip.findOne({ where: { id: tripId, userId: sharedByUserId } });
    if (!trip) {
      return res.status(404).json({ message: "Trip not found or not owned by user" });
    }

    const shareToken = generateShareToken();

    const sharedList = await SharedList.create({
      tripId,
      sharedByUserId,
      shareToken,
      permission,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
    });

    const shareUrl = `${process.env.APP_BASE_URL}/shared/${shareToken}`;

    res.status(201).json({ message: "Shareable link created", shareUrl, sharedList });
  } catch (error) {
    console.error("Failed to create shareable link:", error);
    res.status(500).json({ message: "Failed to create shareable link", error: error.message });
  }
};

export const getSharedListByToken = async (req, res) => {
  try {
    const { token } = req.params;

    const sharedList = await SharedList.findOne({
      where: { shareToken: token },
      include: [
        {
          model: Trip,
          include: [{ model: User, attributes: ["fullname", "email"] }],
        },
      ],
    });

    if (!sharedList) {
      return res.status(404).json({ message: "Shared list not found" });
    }

    if (sharedList.expiresAt && new Date() > sharedList.expiresAt) {
      return res.status(410).json({ message: "Shareable link expired" });
    }

    res.json({ sharedList });
  } catch (error) {
    console.error("Failed to fetch shared list:", error);
    res.status(500).json({ message: "Failed to fetch shared list", error: error.message });
  }
};

export const revokeSharedList = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const sharedList = await SharedList.findOne({ where: { id } });

    if (!sharedList) {
      return res.status(404).json({ message: "Shared list not found" });
    }

    if (sharedList.sharedByUserId !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await sharedList.destroy();

    res.json({ message: "Shared list revoked" });
  } catch (error) {
    console.error("Failed to revoke shared list:", error);
    res.status(500).json({ message: "Failed to revoke shared list", error: error.message });
  }
};
