require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./database.js");
const { ObjectId } = require("mongodb");

const app = express();
const port = 7002;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    status: true,
    code: 200,
    message: "I hate you - again"
  });
});

app.get("/posts", async (req, res) => {
  const clientDB = await connectDB();

  const collection = clientDB.collection("posts");

  res.json({
    status: true,
    code: 200,
    posts: await collection.find().toArray()
  });
});

app.post("/posts", async (req, res) => {
  const clientDB = await connectDB();

  const collection = clientDB.collection("posts");

  if(typeof req.body.tittle !== "string"){
    return res.status(400).json({
      status: false,
      code: 400,
      message: "O titulo precisa ser preenchido."
    });
  }

  if (typeof req.body.author === "undefined"){
    req.body.author = "Anonymous";
  }

  const data = await collection.insertOne(req.body);

  res.json({
    status: true,
    code: 200,
    data: data
  });

  res.redirect('/');
});

app.delete("/:id", async (req,res) =>{
  
  const clientDB = await connectDB();

  const collection = clientDB.collection("posts"); 

  await collection.deleteOne({ "_id": ObjectId(req.params.id) });

  res.json({
    status: true,
    code: 200,
    message: "Usuário deletado"
  });
});

app.put("/update/:id", async (req, res) => {
  const clientDB = await connectDB();

  const collection = clientDB.collection("posts");

  await collection.update({ "_id": ObjectId(req.params.id) }, {$set: {
      tittle: req.body.tittle,
      description: req.body.description,
      author: req.body.author
    }
  });

  res.json({
    status: true,
    code: 200,
    message: "Usuário atualizado"
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
