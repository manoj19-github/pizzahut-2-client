import axios from "axios"
import {authTypes} from "../../types"
export const cartAction=(productData,Router)=>async (dispatch,getState)=>{
  try{
    const productPayload={
      user:getState().authReducer.authUser.id,
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
        "Access-Control-Allow-Credentials": true,
      }
    }
    const {data}=await axios.post("/api/cart/add",productPayload,config)

    if(data?.redirectToLogin){
      dispatch({type:authTypes.LOGOUT_SUCCESS})
      sessionStorage.removeItem("pizzahut-auth-data")
      Router.push("/auth/login")
    }else return 1
  }catch(err){
    console.log("cart data err",err)
    return -1
  }
}
