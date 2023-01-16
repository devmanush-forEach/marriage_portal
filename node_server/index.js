const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectToDB = require("./src/configs/db");
const SigninController = require("./src/controllers/signin.controller");
const SignupController = require("./src/controllers/signup.controller");
const UserRoutes = require("./src/routes/user.routes");
const AddressRoutes = require("./src/routes/address.routes");
const PublicRoutes = require("./src/routes/public.routes");
const AppilicationRoutes = require("./src/routes/application.routes");
const cookieParser = require("cookie-parser");

const port = process.env.PORT;
const origin = process.env.ORIGIN;

const app = express();
app.options(origin, cors({ origin: origin, credentials: true }));

// Removing cors errors and adding headers to responses

app.use(express.static("public"));
app.use(function (req, res, next) {
  console.log(req.originalUrl);
  res.header("Access-Control-Allow-Origin", origin);
  res.header("Access-Control-Allow-Headers", "Content-Type, x-requested-with");
  next();
});
app.use(
  cors({
    origin: origin,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/user", UserRoutes);
app.use("/public", PublicRoutes);
app.use("/address", AddressRoutes);
app.use("/application", AppilicationRoutes);
app.post("/signin", SigninController);
app.post("/signup", SignupController);

app.use("/", (req, res) => {
  res.status(200).send("WORKING FINE");
});

// starting the app

app.listen(port, () => {
  // connecting to db
  connectToDB();
  console.log(`Server is listening on port ${port}`);
});
