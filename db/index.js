const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://liliacheh:vW4PV1ZWCcpHSybR@cluster0.squljoe.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  const product = {
    name: 'NFT1',
    artNum: 300125125,
    price: 300
  }
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    const db = await client.db('products')
    const productsCollection = await db.collection('productsList')
    const newProduct = await productsCollection.insertOne(product)
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
