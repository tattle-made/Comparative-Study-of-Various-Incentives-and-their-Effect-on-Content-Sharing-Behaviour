const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.options("*", cors());

const port = 3000;

app.get("/", (req, res) => {
  res.json({ msg: "home 4" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
