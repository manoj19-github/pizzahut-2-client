import axios from "axios"
import Swal from "sweetalert2"
export const newProduct=(formVal,imageData)=>async(dispatch,getState)=>{
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
        Authorization:`bearer ${getState().authReducer.userToken || ""}`,
      },
    })
    console.log("formDSata",data)
    formData.append("productId",data.products._id)
    const result=await axios({
      method:"post",
      data:formData,
      url:"/api/admin/product/image",
      headers:{
        "Content-Type":"multipart/form-data",
        Authorization:`bearer ${getState().authReducer.userToken || ""}`,

      },
    })

    console.log("newData",result)
    Swal.fire({
      icon: 'success',
      title: 'Congratulation',
      text: 'new Product added'
    })
  }catch(err){
    console.log(err)
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
    })
  }
}
