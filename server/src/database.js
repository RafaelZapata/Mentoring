const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.DATABASE_URI);

module.exports = async function connect() {
  try {
    await client.connect();

    await client.db("admin").command({ ping: 1 });

    return client.db("mentorship");
  } catch (e) {
    return e;
  }
}
