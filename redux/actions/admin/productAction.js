import {adminProductTypes} from "../../types"
import axios from "axios"
import Swal from 'sweetalert2'
export const deleteProductData=(productId)=>async dispatch=>{
  try{
    dispatch({type:adminProductTypes.DELETE_PRODUCT_REQ})
    const config={
      headers:{
        "Access-Control-Allow-Credentials": true,
      }
    }
    const payload={productId}
    const {data}=await axios.post("/api/admin/product/delete",payload,config)
    if(data.status){
      dispatch({type:adminProductTypes.DELETE_PRODUCT_SUCCESS,payload:productId})
      Swal.fire({
        icon: 'success',
        title: 'Product Deleted',
        text: 'Your Product is deleted successfully',
      })
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    }

  }catch(err){
    console.log("error in deleteProductData ",err)
  }
}
