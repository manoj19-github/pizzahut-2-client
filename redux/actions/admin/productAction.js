import {adminProductTypes,adminOrderTypes} from "../../types"
import axios from "axios"
import Swal from 'sweetalert2'
export const deleteProductData=(productId)=>async (dispatch,getState)=>{
  try{
    dispatch({type:adminProductTypes.DELETE_PRODUCT_REQ})
    const config={
      headers:{
          Authorization:`bearer ${getState().authReducer.userToken || ""}`,
          "Content-Type":"application/json",
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

export const orderStatusChange=(orderId,newStatus)=>async dispatch=>{
  try{
    const payload={orderId,newStatus}
    const config={
      headers:{
          Authorization:`bearer ${getState().authReducer.userToken || ""}`,
          "Content-Type":"application/json",
      }
    }
    const {data}=await axios.post("/api/admin/order/statusChange",payload,config)
    dispatch({type:adminOrderTypes.EDIT_ORDER_STATUS,payload:data.updatedOrder})
  }catch(err){
    console.log("order status change")
  }
}
