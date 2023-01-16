const userModel = require("../models/user.model");

const publicController = {
  getProfiles: async (req, res) => {
    try {
      console.log(req.body);
      const profiles = await userModel.find().lean().exec();
      return res.status(200).send(profiles);
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  },
  getData: async (req, res) => {
    try {
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  },
};

module.exports = publicController;
