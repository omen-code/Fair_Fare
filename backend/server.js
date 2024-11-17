import express from "express"
import cors from "cors"
import { connectdb } from "./config/db.js"
import userRouter from "file:///D:/Fair_Fare/backend/config/controller/model/routes/userroute.js"






const app= express()
const port=6000


app.use(express.json())
app.use(cors())
connectdb();

app.use("/api/user",userRouter)



app.get("/",(req,res)=>
{
    res.send("API working")
})

app.listen(port,()=>
{
    console.log('server started on http://localhost:6000')
})
 
//mongodb+srv://nishanthegde2005:<db_password>@cluster0.6cvha.mongodb.net/?
