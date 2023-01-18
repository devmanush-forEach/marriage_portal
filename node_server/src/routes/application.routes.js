const applicationController = require("../controllers/application.controller");
const Authenticate = require("../middlewares/authenticate");
const authorize = require("../middlewares/authorize");

const router = require("express").Router();

router.get(
  "/all",
  Authenticate,
  authorize(["r1"]),
  applicationController.getAll
);
router.post("/create", applicationController.create);
router.post(
  "/verify",
  Authenticate,
  authorize(["r1"]),
  applicationController.verify
);
router.post(
  "/reject",
  Authenticate,
  authorize(["r1"]),
  applicationController.reject
);

module.exports = router;
