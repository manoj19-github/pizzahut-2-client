import axios from "axios"
import {authTypes,cartTypes} from "../../types"
export const makePaymentWithCod=(orderData,Router)=>async (dispatch,getState)=>{
  try{
      const config={
        headers:{
          "Content-Type":"application/json",
          Authorization:`bearer ${getState().authReducer.userToken || ""}`,
        }
      }
      const payload={orderData}
        const {data}=await axios.post("/api/order",payload,config)
        if(data?.redirectToLogin){

          dispatch({type:authTypes.LOGOUT_SUCCESS})
          sessionStorage.removeItem("pizzahut-user-token")
          sessionStorage.removeItem("pizzahut-auth-email")
          sessionStorage.removeItem("pizzahut-auth-userId")
          sessionStorage.removeItem("pizzahut-auth-isAdmin")
          Router.push("/auth/login")
        }
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
            button: "Try Again !",
          });
        }
        console.log("order data payment",data)
  }catch(err){
    swal({
      title: "Sorry",
      text: "Something went wrong",
      icon: "error",
      button: "Try Again !",
    });
    console.log("error in payment with cod",err)
  }

}
