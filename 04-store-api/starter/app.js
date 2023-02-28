
require('dotenv').config()
require('express-async-errors')
const express=require('express');
const errorHandlerMiddleware = require('./middleware/error-handler');
const app=express();
const notFoundMiddleWare=require('./middleware/not-found');

const connectDB = require('./db/connect');
const productsRouter=require('./routes/products');



app.use(express.json());


app.use(express.static('./public'));
app.get('/',(req,res)=>
{
    res.end(`<h1>Store API</h1><a href="api/v1/tasks">products route</a>`);
})

app.use('/api/v1/products',productsRouter);



app.use(notFoundMiddleWare);
app.use(errorHandlerMiddleware);

const port=process.env.PORT||3000;
const start=async()=>{
    try {
        await connectDB(process.env.MONGO_URI)  
        app.listen(3000,console.log(`Server is chilling at port ${port}`));
    } catch (error) {
        console.log(error);
    }
}
start()