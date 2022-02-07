import {adminOrderTypes} from "../types"
const initState={
  loading:false,
  orderData:null,
  error:null
}

export const adminOrderReducer=(state=initState,action)=>{
  try{
    const {type,payload}=action
    switch(type){
      case adminOrderTypes.SET_ORDER_DATA:
        return{
          ...state,
          orderData:payload,
          loading:false
        }
      case adminOrderTypes.EDIT_ORDER_STATUS:
        let newOrderData
        if(state.orderData && state.orderData.length>1){
          newOrderData=state.orderData.filter(order=>order._id!=payload._id)
          return{
            ...state,
            orderData:[payload,...newOrderData]
          }
        }
        return {
          ...state,
          orderData:[payload]
        }
      case adminOrderTypes.SET_ORDER_REQ:
        return{
          ...state,
          loading:true
        }
      case adminOrderTypes.ADD_NEW_ORDER:
        if(state.orderData){
          return{
            ...state,
            orderData:[payload,...state.orderData]
          }
        }
        return{
          ...state,
          orderData:[payload]
        }

      default: return state
    }
  }catch(err){
    console.log("error in adminOrderReducer ",err)
  }
}
