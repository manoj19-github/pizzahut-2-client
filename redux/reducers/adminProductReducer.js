import {adminProductTypes} from "../types"
const initState={
  loading:false,
  products:null,
  error:null
}
export const adminProductReducer=(state=initState,action)=>{
  try{
    const {type,payload}=action
    switch(type){
      case adminProductTypes.ADD_PRODUCT_REQ:
        return{
          ...state,
          loading:true
        }
      case adminProductTypes.ADD_PRODUCT_SUCCESS:
        return{
          ...state,
          loading:false,
          products:payload
        }
      case adminProductTypes.ADD_NEW_PRODUCT:
        if(state.products && state.products.length>1){
          return {
            ...state,
            products:[payload,...state.products]
          }
        }
      return {
        ...state,
        products:[payload]
      }
      case adminProductTypes.ADD_PRODUCT_FAILED:
        return{
          ...state,
          error:payload
        }
      case adminProductTypes.DELETE_PRODUCT_REQ:
        return{
          ...state,
          loading:true
        }
      case adminProductReducer.DELETE_PRODUCT_SUCCESS:{
        let newProduct=state.products.filter((product,index)=>{
          return product._id !=payload
        })
        return{
          ...state,
          products:newProduct,
          loading:false
        }
      }
      default:return state
    }
  }catch(err){
    console.log("error in adminProducts",err)
  }
}
