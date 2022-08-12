import { ObjectId } from "mongodb";
import Codes from "utilities/codes";
import Logger from "utilities/logger";
import connectDB from "utilities/database";

export default class Posts {
  static async setCollection(db) {
    return db.collection("posts");
  }

  static async insert(req, res) {
    try {
      const collection = await Posts.setCollection(req.database);

      if (typeof req.body.title !== "string")
        return res.status(400).json( Codes.get(400) );

      if (typeof req.body.author === "undefined")
        req.body.author = "Anonymous";

      const data = await collection.insertOne(req.body);

      if (typeof data?.insertedId === "undefined")
        return res.status(500).json( Codes.get(500) );

      return res.json({
        ...Codes.get(200),
        data: {
          ...req.body,
          "_id": data.insertedId,
        }
      });
    } catch (e) {
      Logger.save(e);
      return res.status(500).json( Codes.get(500) );
    }
  }

  static async get(req, res) {
    try {
      const collection = await Posts.setCollection(req.database);

      return res.json({
        ...Codes.get(200),
        post: await collection.findOne({ "_id": ObjectId(req.params.id) })
      });
    } catch (e) {
      Logger.save(e);
      return res.status(500).json( Codes.get(500) );
    }
  }

  static async list(req, res) {
    try {
      const collection = await Posts.setCollection(req.database);

      return res.json({
        ...Codes.get(200),
        posts: await collection.find().toArray()
      });
    } catch (e) {
      Logger.save(e.message, e.stack);
      return res.status(500).json( Codes.get(500) );
    }
  }

  static async update(req, res) {
    try {
      const collection = await Posts.setCollection(req.database);

      const status = await collection.update({
        "_id": ObjectId(req.params.id)
      }, {
        $set: {
          title: req.body.title,
          description: req.body.description,
          author: req.body.author
        }
      });

      if (status?.modifiedCount < 1)
        return res.json( Codes.get(400) );

      return res.json( Codes.get(200) );
    } catch (e) {
      Logger.save(e);
      return res.status(500).json( Codes.get(500) );
    }
  }

  static async delete(req, res) {
    try {
      const collection = await Posts.setCollection(req.database);

      const status = await collection.deleteOne({ "_id": ObjectId(req.params.id) });

      return res.json( Codes.get(200) );
    } catch (e) {
      Logger.save(e);
      return res.status(500).json( Codes.get(500) );
    }
  }
}
