import {orderTypes} from "../types"
const getDataFromLocalStorage=()=>{
  if(typeof window!=="undefined")
    return localStorage.getItem("pizzahut-delivery-address")?
    JSON.parse(localStorage.getItem("pizzahut-delivery-address")):null
}
const initState={
  loading:false,
  error:"",
  paymentOption:"cod",
  option:null,
  address:getDataFromLocalStorage()
}
export const orderReducer=(state=initState,action)=>{
  try{
    const {type,payload}=action
    switch(type){
      case orderTypes.SET_DELIVERY_ADDRESS:
        return{
          ...state,
          address:payload
        }
      case orderTypes.SET_PAYMENT_OPTION:
        return{
          ...state,
          paymentOption:payload.paymentMode,
          option:payload.option
        }

      default:return state
    }
  }catch(err){


  }
}
