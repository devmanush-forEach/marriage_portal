const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const generteToken = require("../middlewares/tokenGenerater");

const SigninController = async (req, res) => {
  try {
    const { email, phone, password } = req.body;
    // check if there any user present with the same mail in our batasabe or not

    const query = email ? { email } : { phone };
    const user = await userModel.findOne(query);
    if (!user) {
      return res
        .status(400)
        .send({ error: `No user is present with entered email address.` });
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      return res.status(400).send({ error: "Entered password is incorrect!!" });
    }

    const token = await generteToken(user._id);

    return res.status(200).send({ token });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

module.exports = SigninController;
