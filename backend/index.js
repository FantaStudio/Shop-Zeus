const express = require("express");
const path = require("path");

const app = express();

app.use("/static", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000}`);
});
