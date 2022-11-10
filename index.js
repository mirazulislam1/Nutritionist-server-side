const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;
require('dotenv').config()

// middleWears
app.use(cors())
app.use(express.json())

// application code
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qrjo9vr.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


// crud operation
async function run(){
    try{
        const serviceCollection = client.db('nutritionist').collection(' services');
        const reviewCollection = client.db('nutritionist').collection('review');
        
        app.get('/services', async(req, res)=>{   
            const query ={}
            const cursor = serviceCollection.find(query);
            const services = await cursor.limit(3).toArray();
            res.send(services)
        });

        app.get('/allServices', async(req, res)=>{
            const query ={}
            const cursor = serviceCollection.find(query);
            const allServices = await cursor.toArray();
            res.send(allServices)
        });
        app.get('/allServices/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const service = await serviceCollection.findOne(query);
            res.send(service)
        });

        // review api
        app.post('/review', async(req, res) =>{
            const review = req.body;
            const result = await reviewCollection.insertOne(review);
            res.send(result);
        })
    }
    finally{

    }

}
run().catch(error =>console.error(error))


app.get('/', (req, res)=>{
    res.send('Nutritionist server is running')
})

app.listen(port,()=>{
    console.log(`Nutritionist server running on ${port}`);
})