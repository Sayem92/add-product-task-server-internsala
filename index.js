require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.lhckmem.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const ProductsCollection = client.db("AllProducts").collection("products");


        app.post('/addProduct', async (req, res) => {
            const product = req.body;
            const result = await ProductsCollection.insertOne(product);
            res.send(result);
        });

        app.get('/product', async (req, res) => {
            const query = { };
            const allProducts = await ProductsCollection.find(query).toArray();
            res.send(allProducts);
        });

        


    }
    finally {

    }
}

run().catch(err => console.log(err))


app.get('/', async (req, res) => {
    res.send('react job task server is running');
})

app.listen(port, () => console.log(`react job task running on ${port}`))