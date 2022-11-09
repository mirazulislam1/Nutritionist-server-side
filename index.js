const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000;

// middleWears
app.use(cors())
app.use(express.json())

app.get('/', (req, res)=>{
    res.send('Nutritionist server is running')
})

app.listen(port,()=>{
    console.log(`Nutritionist server running on ${port}`);
})