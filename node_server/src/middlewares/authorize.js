const userModel = require("../models/user.model");

const authorize = (permittedRoles) => {
  return async (req, res, next) => {
    const userid = req.userid;
    let isAllowed = false;

    const user = await userModel.findById(userid).lean().exec();

    for (let i = 0; i < user.roles.length; i++) {
      if (permittedRoles.includes(user.roles[i])) {
        isAllowed = true;
      }
    }

    if (isAllowed) {
      next();
    } else {
      return res.status(403).send({ error: "Permission denied !!" });
    }
  };
};

module.exports = authorize;
