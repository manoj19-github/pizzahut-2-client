import {clientProductTypes} from "../types"
const initState={
  actual_price:null,
  ingridients:null,
  productSize:"medium",
  name:null,
  image:null,
  details:null,
  productId:null,
  base_price:null,
  ingriPriceTotal:0,
  qty:1
}
export const clientSingleProductReducer=(state=initState,action)=>{
  try{
    const {type,payload}=action
    switch(type){
      case clientProductTypes.DEFAULT_PRODUCT_DATA:
        return{
          ...state,
          actual_price:payload.actual_price,
          name:payload.name,
          image:payload.image,
          details:payload.details,
          productId:payload.productId,
          base_price:payload.actual_price,
        }
      case clientProductTypes.EDIT_PRODUCT_QTY:
        return{
          ...state,
          qty:payload
        }
      case clientProductTypes.EDIT_SIZE_TO_PRODUCT:
        if(state.productSize==payload.size[0]){
          return{
            ...state,
            actual_price:state.base_price,
            productSize:"medium"
          }
        }else{
          return{
            ...state,
            actual_price:payload.price,
            productSize:payload.size[0]
          }
        }
      case clientProductTypes.EDIT_INGRIDIENTS:
          if(state.ingridients && state.ingridients.length >0){
            let newIngri=state.ingridients.filter((ingri,index)=>{
              return ingri._id !== payload._id
          })
          return {
            ...state,
            ingriPriceTotal:state.ingriPriceTotal+payload.price,
            ingridients:[...newIngri,{...payload}]
          }
        }
        return {
          ...state,
          ingriPriceTotal:state.ingriPriceTotal+payload.price,
          ingridients:[{...payload}],
        }
      case clientProductTypes.REMOVE_INGRIDIENTS:
          if(state.ingridients && state.ingridients.length >0){
            let newIngri=state.ingridients.filter((ingri,index)=>{
              return ingri._id !== payload._id
          })
          return {
            ...state,
            ingriPriceTotal:state.ingriPriceTotal-payload.price,
            ingridients:[...newIngri]
          }
        }
        return {
          ...state,
          ingriPriceTotal:0,
          ingridients:null
        }
    default :return state
  }
}catch(err){

  }
}
