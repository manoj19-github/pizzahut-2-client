import {cartTypes} from "../types"
const sendFromLocalStorage=()=>{
  if(typeof window!=="undefined")
    return JSON.parse(localStorage.getItem("pizzahut-cart-length"))?.cartProductLength
}
const sendFromSessionStorage=()=>{
  if(typeof window!=="undefined")
    return JSON.parse(localStorage.getItem("pizzahut-cart-product"))
}
const sendFromLocalStorageAmount=()=>{
  if(typeof window!=="undefined")
    return JSON.parse(localStorage.getItem("pizzahut-cart-amount"))?.cartAmount
}

const initState={
  loading:false,
  error:"",
  cartItems:sendFromSessionStorage()?
    sendFromSessionStorage():null,
  cartLength:sendFromLocalStorage()?
      sendFromLocalStorage():null,
  cartAmountTotal:sendFromLocalStorageAmount()?
                  sendFromLocalStorageAmount():null
}
export const cartReducer=(state=initState,action)=>{
  try{
    const {payload,type}=action
    switch(type){
      case cartTypes.GET_CART_REQ:
        return{
          ...state,
          loading:true
        }
      case cartTypes.GET_CART_DATA:
        return{
          ...state,
          loading:false,
          cartItems:payload
        }
      case cartTypes.EDIT_CART_SUCCESS:
        return{
          ...state,
          cartItems:payload
        }
      case cartTypes.EDIT_CART_LENGTH:
        return{
          ...state,
          cartLength:payload
        }
      case cartTypes.EDIT_CART_AMOUNT:
          return{
            ...state,
            cartAmountTotal:payload
          }
      case cartTypes.CART_DATA_RESET:
        return initState;
      default:return state
    }

  }catch(err){

  }

}
