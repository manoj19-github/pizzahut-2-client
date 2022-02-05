import {adminProductTypes,clientProductTypes} from "../types"
const initState={
  loading:false,
  error:"",
  products:[]
}
export const clientProductReducer=(state=initState,action)=>{
  const {type,payload}=action
  switch(type){
    case clientProductTypes.GET_PRODUCTS_REQ:
      return{
        ...state,
        loading:true
      }
    case clientProductTypes.GET_PRODUCTS_SUCCESS:
      return{
        ...state,
        loading:false,
        products:payload
      }
      default:return state


  }

}
