import app from "./src/app.js"
import connectDB from "./src/config/db.js"
import  dotenv  from "dotenv"

dotenv.config()

const PORT = process.env.PORT || 5000

const startserver= async ()=>{
    try{
        await connectDB()
        app.listen(PORT,()=>{
        console.log(`server running on port: ${PORT}`);
        console.log(`environment:${process.env.NODE_ENV}`);
        });
    }
    catch(error){
        console.error("failed to start server:",error.message);
        process.exit(1);
    }
}

startserver();