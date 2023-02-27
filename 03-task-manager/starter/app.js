
const express=require('express');
const app=express();
const tasks=require('./routes/tasks');
const notFound=require('./middleware/Notfound')
const Handleerrors=require('./middleware/errorhandler')
const connectDB = require('./db/connect');
require('dotenv').config()

app.use(express.static('./public'));
app.use(express.json());
app.use('/api/v1/tasks',tasks);

app.use(notFound);
app.use(Handleerrors);
const port=process.env.PORT||3000; 
const start=async()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port,()=>
{
    console.log("server vibing at "+port);
})
    }
    catch(error)
    {
        console.log(error);
    }
}
start()