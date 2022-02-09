import axios from "axios"
import {authTypes,cartTypes} from "../../types"
export const getCartData=()=>async (dispatch,getState)=>{
  try{
    const config= {
      headers:{
        "Content-Type":"application/json",
        Authorization:`bearer ${getState().authReducer.userToken || ""}`,
      }
    }
    const {data}=await axios.get("/api/cart",config)
    if(data.status || data.cartProduct?.cartItems.length){
      dispatch({type:cartTypes.GET_CART_DATA,payload:data.cartProduct?.cartItems})
      dispatch({type:cartTypes.EDIT_CART_LENGTH,payload:data.cartProduct?.cartItems.length})
      localStorage.setItem("pizzahut-cart-length",JSON.stringify({cartProductLength:data.cartProduct?.cartItems.length}))
    }else{
      dispatch({type:cartTypes.GET_CART_DATA,payload:""})
      dispatch({type:cartTypes.EDIT_CART_LENGTH,payload:0})
      localStorage.setItem("pizzahut-cart-length",JSON.stringify({cartProductLength:0}))
    }
  }catch(err){
    console.log("get cart error",err)
  }
}
export const cartAction=(productData,Router)=>async (dispatch,getState)=>{
  try{
    const productPayload={
      user:getState().authReducer.userId,
      cartItems:{
        product:productData.productId,
        size:productData.productSize,
        ingridients:productData.ingridients,
        quantity:productData.qty,
        price:productData.actual_price,
        ingridientsTotal:productData.ingriPriceTotal,
        total:productData.actual_price+productData.ingriPriceTotal
      }
    }
    const config={
      headers:{
        "Content-Type":"application/json",
        Authorization:`bearer ${getState().authReducer.userToken || ""}`,
      }
    }
    const {data}=await axios.post("/api/cart/add",productPayload,config)

    if(data?.redirectToLogin){

      dispatch({type:authTypes.LOGOUT_SUCCESS})
      sessionStorage.removeItem("pizzahut-user-token")
      sessionStorage.removeItem("pizzahut-auth-email")
      sessionStorage.removeItem("pizzahut-auth-userId")
      sessionStorage.removeItem("pizzahut-auth-isAdmin")
      Router.push("/auth/login")
    }else return 1
  }catch(err){
    console.log("cart data err",err)
    return -1
  }
}
