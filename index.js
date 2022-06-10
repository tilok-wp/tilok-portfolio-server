const express = require('express');
const cors = require('cors');
const app = express();
// Must need to add local .env file content here
require('dotenv').config()
const { ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

// Middleware to pass data between two server
app.use(cors());
app.use(express.json())





const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_USER_PASSWORD}@cluster0.xjrk9.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
    try {
        await client.connect();
        const projectCollection = client.db('tilok_portfolio_DB').collection('project')
        const blogCollection = client.db('tilok_portfolio_DB').collection('blog')

        app.get('/projects', async (req, res) => {

            const query = {}
            const cursor = projectCollection.find(query)
            const projects = await cursor.toArray()
            res.send(projects)

        })
        // // Get single product details
        app.get('/projects/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const projectItem = await projectCollection.findOne(query)
            res.send(projectItem)
        })





    }
    finally { }
}
run().catch(console.dir)




app.get('/', (req, res) => {
    res.send('Tilok portfolio server is running.......!')
})



app.listen(port, () => {
    console.log('Tilok portfolio server running port is: ', port)
})