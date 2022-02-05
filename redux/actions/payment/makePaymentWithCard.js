import axios from "axios"
import swal from "sweetalert"
import {authTypes,cartTypes} from "../../types"
export const makePaymentWithCard=(token,orderData,Router)=>async dispatch=>{
  try{
      const config={
        headers:{
          "Content-Type":"application/json",
          "Access-Control-Allow-Credentials": true,
        }
      }
      const payload={token,orderData}
      const {data}=await axios.post("/api/order",payload,config)
      if(data?.redirectToLogin){
        dispatch({type:authTypes.LOGOUT_SUCCESS})
        sessionStorage.removeItem("pizzahut-auth-data")
        Router.push("/auth/login")
      }
      console.log("order data payment",data)
      if(data.status){
        swal({
          title: "Congratulation",
          text: "Your Order is placed successfully",
          icon: "success",
          button: "Ok",
        });

        localStorage.removeItem("pizzahut-cart-length")
        localStorage.removeItem("pizzahut-cart-product")
        localStorage.removeItem("pizzahut-cart-amount")
        dispatch({type:cartTypes.CART_DATA_RESET})
        Router.push(`/orders/${data?.orderPlaced?._id}`)
        return
      }
      if(!data.status){
        swal({
          title: "Sorry",
          text: "Something went wrong",
          icon: "error",
          button: "try again !",
        });
      }

  }catch(err){
    console.log(`error occured`,err)
  }

}
