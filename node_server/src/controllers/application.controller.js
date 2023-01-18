const applicationModel = require("../models/application.model");

const applicationController = {
  getAll: async (req, res) => {
    try {
      const applications = await applicationModel
        .find({ isVerified: false })
        .lean()
        .exec();
      return res.status(201).send(applications);
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  },
  create: async (req, res) => {
    try {
      const toCreate = req.body;
      console.log(toCreate);
      const created = await applicationModel.create(toCreate);
      console.log(created);
      return res.status(201).send(created);
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  },
  verify: async (req, res) => {
    try {
      const id = req.body._id;
      const data = await applicationModel.findByIdAndUpdate(
        id,
        { isVerified: true },
        { new: true }
      );

      if (data.isVerified) {
        return res.status(202).send("Successfully Verified");
      }
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  },
  reject: async (req, res) => {
    try {
      const id = req.body._id;
      const data = await applicationModel.findByIdAndUpdate(
        id,
        { isActive: false, remark: req.body.remark },
        { new: true }
      );
      if (!data.isActive) {
        return res.status(202).send("Successfully deactivated");
      }
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  },
};

module.exports = applicationController;
