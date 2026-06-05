const express = require("express");
const app = express();
const port = 9000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);

  setTimeout(() => {
    console.log("Exiting after 3 seconds...");
    process.exit(0);
  }, 3000);
});