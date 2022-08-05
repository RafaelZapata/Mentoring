const express = require("express");
const connectDB = require("./database.js");

const app = express();
const port = 7002;

app.get("/", (req, res) => {
  res.json({
    status: true,
    code: 200,
    message: "I hate you - again"
  });
});

app.get("/posts", async (req, res) => {
  const clientDB = await connectDB();

  console.log(clientDB);

  res.json({
    status: true,
    code: 200,
    posts: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  });
});

app.get("*", (req, res) => {
  res.json({
    status: false,
    code: 404,
    message: "Not Found"
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
