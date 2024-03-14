const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://tobyblack:abc12345@comp5347.v8ni4ud.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB successfully!");
    return client.db("assignment2");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

module.exports = { connectToMongoDB };
