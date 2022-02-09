import {orderStatusTypes} from "../../types"
import axios from "axios"
export const getOrders=()=>async(dispatch,getState)=>{
  try{
    const config={
      headers:{
        "Content-Type":"application/json",
        Authorization:`bearer ${getState().authReducer.userToken}`
      }
    }
    const {data}=await axios.get("/api/order",config)
    console.log("orders DAta",data)
    if(data.status){
      dispatch({type:orderStatusTypes.ALL_ORDER_DATA,payload:data.products})

    }

  }catch(err){
    console.log(err)

  }
}

export const getOrder=(orderId)=>async(dispatch,getState)=>{
  try{
    const config={
      headers:{
        "Content-Type":"application/json",
        Accept: "application/json",
        Authorization:`bearer ${getState().authReducer.userToken}`
      }
    }
    const {data}=await axios.get(`/api/order/${orderId}`,config)
    if(data.status){
      dispatch({type:orderStatusTypes.ORDER_DATA_GET,payload:data.products})
    }
  }catch(err){
    console.log(err)
  }
}
