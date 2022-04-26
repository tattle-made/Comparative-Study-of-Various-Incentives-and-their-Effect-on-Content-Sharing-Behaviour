const express = require("express");
const cors = require("cors");
const { enableFeatures } = require("./features");

const app = express();
app.use(cors());
app.use(express.json());
app.options("*", cors());

const port = 3000;

enableFeatures(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
