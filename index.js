const express = require('express')
const app = express()
const port = process.env.PORT || 5000;

const { MongoClient, ServerApiVersion } = require('mongodb');

const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello doctor server!')
})

app.listen(port, () => {
    console.log(`doctor app listening on port ${port}`)
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.m76po.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const productsCollection = client.db('square-electronic').collection('products');
        const reviewsCollection = client.db('square-electronic').collection('reviews');

        app.get('/products', async (req, res) => {
            const query = {};
            const cursor = productsCollection.find(query);
            const products = await cursor.toArray();
            res.send(products)
        })
        app.get('/reviews', async (req, res) => {
            const query = {};
            const cursor = reviewsCollection.find(query);
            const reviews = await cursor.toArray();
            res.send(reviews)
        })
    }
    finally {

    }
}
run().catch(console.dir)