import mongoose from "mongoose";

let isConnected = false;


let MONGOOSE_URI = process.env.MONGODB_URL;
let DATABASE = process.env.MONGODB_NAME;
export default async function connectToMongodb(){
   
    if(isConnected){
        // console.log("mongodb is already connected")
        return
    }
    try{

        mongoose.connect(`${MONGOOSE_URI+"/"+DATABASE }`,{
            // dbName: DATABASE,
            useNewUrlParser : true,
            useUnifiedTopology: true,
        } as any).then(() => {
            // console.log("connected to mongodb")
            isConnected = true
        }).catch((error) => {
            console.log("mongoose Error : " , error)
        })
        // console.log("connected to mongodb")
    }catch(error){
        console.log(error)
    }
   
} 