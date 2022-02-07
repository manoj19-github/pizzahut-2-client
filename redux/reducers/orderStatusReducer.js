import {orderStatusTypes} from "../types"
const initState={
  loading:false,
  orderData:null,
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
      default:return state
    }
  }catch(err){
    console.log("orderStatus error ",err)
  }
}
