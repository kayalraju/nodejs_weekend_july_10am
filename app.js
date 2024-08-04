const express = require('express');
const dot_env = require('dotenv');
const connectDb = require('./app/config/db');
const productRouter = require('./Router/product.router');
const bodyParser = require('body-parser');

const app = express();
dot_env.config();
connectDb();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(express.static('uploads'));
app.get('/', (req, res) => {
    res.send('This is a practice code for CRUD operation in MongoDB.')
})

app.use('/api', productRouter);

const PORT = process.env.PORT || 5200;

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
    
})