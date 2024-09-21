const express = require('express');
const dot_env = require('dotenv');
const connectDb = require('./app/config/db');
const productRouter = require('./Router/product.router');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const ejs=require('ejs');
const cors = require('cors');   

const app = express();
dot_env.config();
connectDb();
app.use(cors());
app.use(cookieParser());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(express.static('uploads'));
app.use('/uploads', express.static(__dirname + '/uploads'));
// Set up EJS as the templating engine for views.
app.set('view engine', 'ejs');
// Sets the views folder path for EJS.
app.set('views','views')






const userRouter=require('./Router/user.js');
app.use(userRouter);
app.use('/api', productRouter);

const AuthApiRoute=require('./Router/apiRouter.js')
app.use('/api',AuthApiRoute)

const PORT = process.env.PORT || 5200;

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
    
})