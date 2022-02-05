import mongoose from "mongoose"

const MONGODB_URL=process.env.DB_URL

if(!MONGODB_URL){
  throw new Errpr("Please define mongodb url env variable")
}
/* Global is used here to maintain a cached connection
across hot reloads in developments . This prevents connection growing
exponentially during api route usage   */


let cached=global.mongoose

if(!cached){
  cached=global.mongoose={conn:null,promise:null}
}

async function dbConnect(){
  if(cached.conn){
    return cached.conn
  }
  if(!cached.promise){
    const opts={
      bufferCommands:false
    }
    cached.promise=mongoose.connect(MONGODB_URL,opts).then((mongoose)=>{
      return mongoose
    })
  }
  cached.conn=await cached.promise
  return cached.conn
}
export default dbConnect
