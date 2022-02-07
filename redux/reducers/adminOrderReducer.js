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
      case adminOrderTypes.SET_ORDER_REQ:
        return{
          ...state,
          loading:true
        }
      default: return state
    }
  }catch(err){
    console.log("error in adminOrderReducer ",err)
  }
}
