import {authTypes} from "../types"
const getSessionStorageData=(name)=>{
  if(typeof window !=="undefined"){
    return JSON.parse(sessionStorage.getItem(name))
  }

}
const getLocalStorage=(name)=>{
  if(typeof window !=="undefined"){
    return JSON.parse(localStorage.getItem(name))
  }
}

const initState={
  loading:false,
  error:"",
  userEmail:getLocalStorage("pizzahut-confirmation-details")?
  getLocalStorage("pizzahut-confirmation-details"):null,
  authUser:getSessionStorageData("pizzahut-auth-data")?
      getSessionStorageData("pizzahut-auth-data"):null,
}
export const authReducer=(state=initState,action)=>{
  const {type,payload}=action
  switch(type){
    case authTypes.GET_CREDEN_REQ:
      return{
        ...state,
        loading:true,
      }
    case authTypes.GET_CREDEN_SUCCESS:
      return{
        ...state,
        loading:false,
        authUser:payload
      }

    case authTypes.GET_CREDEN_FAIL:
      return{
        ...state,
        loading:false,
        error:""
      }
    case authTypes.LOGOUT_REQ:
      return{
        ...state,
        loading:true,
        error:""
      }
    case authTypes.LOGOUT_SUCCESS:
      return{
        ...state,
        loading:false,
        authUser:null
      }
    case authTypes.GET_PASSWORD_RESET_CODE:
      return{
        ...state,
        userEmail:payload
      }
    default:return state
  }
}
