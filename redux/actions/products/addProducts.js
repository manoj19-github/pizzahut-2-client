import axios from "axios"
export const newProduct=async(formVal,imageData)=>{
  try{
    const formData=new FormData()

    //const {name,base_price,details,sizes,ingredients}=req.body
    if(!formVal.name || !formVal.base_price ||!imageData||
    !formVal.sizes||!formVal.ingridients||!formVal.details){
      alert("please filled all the field")
      return
    }
    formData.append("image",imageData)


    const {data}=await axios({
      method:"post",
      data:formVal,
      url:"/api/admin/product/insert",
      headers:{
        "Content-Type":"application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
    formData.append("productId",data.products._id)
    const {data:newData}=await axios({
      method:"post",
      data:formData,
      url:"/api/admin/product/image",
      headers:{
        "Content-Type":"multipart/form-data"
        //"Access-Control-Allow-Credentials": true,
      },
    })

    console.log(newData)
    return newData


  }catch(err){
    console.log(err)
  }
}
