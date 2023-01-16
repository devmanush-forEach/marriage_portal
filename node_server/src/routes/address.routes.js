const addressController = require("../controllers/address.controller");
const Authenticate = require("../middlewares/authenticate");

const router = require("express").Router();

router.get("/", addressController.getAddress);
router.post("/create", Authenticate, addressController.createAddress);
router.post("/update", Authenticate, addressController.updateAddress);
router.post("/delete", Authenticate, addressController.deleteAddress);

module.exports = router;
