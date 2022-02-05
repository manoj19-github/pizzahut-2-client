import {cartTypes,authTypes} from "../../types"
import axios from "axios"
export const deleteCart=(cartId,Router)=>async dispatch =>{
  try{
    const config={
      headers:{
        "Content-Type":"application/json",
        "Access-Control-Allow-Credentials": true,
      }
    }
    const {data}=await axios.post("/api/cart/del",{cartId},config)
    console.log("data",data)
    dispatch({type:cartTypes.GET_CART_DATA,payload:data.cartProduct.cartItems})
    if(data?.redirectToLogin){
      dispatch({type:authTypes.LOGOUT_SUCCESS})
      sessionStorage.removeItem("pizzahut-auth-data")
      Router.push("/auth/login")
    }
    if(data.cartProduct?.cartItems){
        const cartLength=data.cartProduct.cartItems.length
        if(data.status)
          dispatch({type:cartTypes.EDIT_CART_LENGTH,payload:cartLength})
          localStorage.setItem("pizzahut-cart-length",JSON.stringify({cartProductLength:cartLength}))
          sessionStorage.setItem("pizzahut-cart-product",JSON.stringify(data.cartProduct.cartItems))
    }
    return 1
  }catch(err){
    console.log("error",err)
    return -1
  }
}
