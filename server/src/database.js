const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.DATABASE_URI);

export async function connect() {
  try {
    await client.connect();

    await client.db("admin").command({ ping: 1 });

    return client;
  } catch (e) {
    return e;
  }
}
