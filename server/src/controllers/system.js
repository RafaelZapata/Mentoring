import connectDB from "utilities/database";
import Logger from "utilities/logger";
import Codes from "utilities/codes";
import Token from "utilities/token";
import User from "models/user";

export default class System {
  static async setCollection(db) {
    return db.collection("users");
  }

  static async insert(req, res) {
    try {
      const collection = await System.setCollection(req.database);
      const user = new User(req.body);
      const data = await collection.insertOne(user);

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

  static async auth(req, res) {
    try {
      const { email, password } = req.body;
      const collection = await System.setCollection(req.database);

      if ( [User.validateEmail(email), User.validatePassword(password)].includes(false) )
        return res.status(400).json( Codes.get(400) );

      const user = await collection.findOne({ email, password });

      delete user?.password;

      user.token = await Token.generate("users", user._id);

      if ( Object.keys(user || {}).length > 0 )
        return res.json({ ...Codes.get(200), user });

      return res.json({
        ...Codes.get(200),
        message: "Invalid Credentials",
      });
    } catch (e) {
      Logger.save(e);
      return res.status(500).json( Codes.get(500) );
    }
  }
}
