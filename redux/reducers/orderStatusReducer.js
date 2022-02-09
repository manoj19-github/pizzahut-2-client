import {orderStatusTypes} from "../types"
const initState={
  loading:false,
  orderData:null,
  allOrdersData:null,
  error:""
}
export const orderStatusReducer=(state=initState,action)=>{
  try{
    const {type,payload}=action
    switch(type){
      case orderStatusTypes.ORDER_DATA_GET:
        return{
          ...state,
          orderData:payload
        }
      case orderStatusTypes.ALL_ORDER_DATA:
        return{
          ...state,
          allOrdersData:payload
        }
      default:return state
    }
  }catch(err){
    console.log("orderStatus error ",err)
  }
}
