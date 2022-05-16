const env = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
console.log(`running in ${env} environment`);
if (env === "development") {
  require("dotenv").config({ path: "development.env" });
}
const express = require("express");
const cors = require("cors");
const { enableFeatures } = require("./features");
const {
  authenticationMiddleware,
} = require("./middlewares/authentication/middleware");

const app = express();
app.use(cors());
app.use(express.json());
// app.options("*", cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "DELETE, PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if ("OPTIONS" == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});
app.use(express.static("public"));
app.use(authenticationMiddleware);

const port = 3000;

enableFeatures(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
