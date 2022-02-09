import axios from "axios"
import {cartTypes,authTypes} from "../../types"
export const editCartQty=(productId,newQty)=>async (dispatch,getState)=>{
  try{

    dispatch({type:cartTypes.GET_CART_REQ})
    const config={
      headers:{
        "Content-Type":"application/json",
        Authorization:`bearer ${getState().authReducer.userToken || ""}`,
      }
    }

    const payload={
      productId,
      newQty
    }
    const {data}=await axios.post("/api/cart/edit",payload,config)
    console.log("data cart",data.cartProduct.cartItems)
    dispatch({type:cartTypes.EDIT_CART_SUCCESS,payload:data.cartProduct.cartItems})
    sessionStorage.setItem("pizzahut-cart-product",JSON.stringify(data.cartProduct.cartItems))
    console.log(" cart update data ",data)

    if(data?.redirectToLogin){
      dispatch({type:authTypes.LOGOUT_SUCCESS})
      sessionStorage.removeItem("pizzahut-user-token")
      sessionStorage.removeItem("pizzahut-auth-email")
      sessionStorage.removeItem("pizzahut-auth-userId")
      sessionStorage.removeItem("pizzahut-auth-isAdmin")
      Router.push("/auth/login")
    }else if(data.cartProduct?.cartItems){
        const cartLength=data.cartProduct.cartItems.length
        if(data.status)
          dispatch({type:cartTypes.EDIT_CART_LENGTH,payload:cartLength})
          localStorage.setItem("pizzahut-cart-length",JSON.stringify({cartProductLength:cartLength}))
    }
    else return 1
  }catch(err){
    console.log("error",err)
    return -1
  }
}
