const addressModel = require("../models/address.model");
const userModel = require("../models/user.model");

const addressController = {
  getAddress: async (req, res) => {
    try {
      const userId = req.body.userId;
      if (!userId) {
        return res.status(400).send({ error: "PLease provide userId" });
      }
      const user = await addressModel.findOne({ userId }).lean().exec();
      return res.status(200).send({ user: user });
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  },
  createAddress: async (req, res) => {
    try {
      const userId = req.userid;
      const toCreate = req.body;
      const created = await addressModel.create(toCreate);

      const updatedUser = await userModel.findByIdAndUpdate(userId, {
        address: created._id,
      });

      if (!updatedUser) {
        return res
          .status(400)
          .send({ error: "Technical error please contact technical team." });
      }

      return res.status(201).send(created);
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  },
  updateAddress: async (req, res) => {
    try {
      const toUpdate = req.body;
      const updated = await addressModel.findByIdAndUpdate(
        toUpdate._id,
        { $set: { ...toUpdate } },
        { new: true }
      );

      return res.status(201).send(updated);
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  },
  deleteAddress: async (req, res) => {
    try {
      const userId = req.userid;
      const toUpdate = { isActive: false };

      const updated = await addressModel.findOneAndUpdate(
        { userId },
        toUpdate,
        { new: true }
      );

      return res.status(201).send("Adrress is successfully deactivated.");
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  },
};

module.exports = addressController;
