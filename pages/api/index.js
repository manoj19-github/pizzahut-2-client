// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from "../../utils/mongo"
import Product from "../../models/Products"
export default async function handler(req, res) {
  const {method}=req
  dbConnect()
  if(method==="POST"){
    try{
      const product=await Product.create(req.body)
      res.status(201)
      .json(product)

    }catch(err){
      res.status(500).
      json(err)
    }

  }

}
