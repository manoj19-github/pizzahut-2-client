import {authTypes} from "../types"
const getSessionStorage=(name)=>{
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
  userToken:getSessionStorage("pizzahut-user-token")?
    getSessionStorage("pizzahut-user-token").userToken:null,
  userEmail:getSessionStorage("pizzahut-auth-email")?
  getSessionStorage("pizzahut-auth-email").userEmail:null,
  userId:getSessionStorage("pizzahut-auth-userId")?
      getSessionStorage("pizzahut-auth-userId").userId:null,
  isAdmin:getSessionStorage("pizzahut-auth-isAdmin")?
  getSessionStorage("pizzahut-auth-isAdmin").isAdmin:null,
  forgotEmail:getLocalStorage("pizzahut-confirmation-details")?
  getLocalStorage("pizzahut-confirmation-details").forgotEmail:null
}
export const authReducer=(state=initState,action)=>{
  const {type,payload}=action
  switch(type){
    case authTypes.GET_USER_TOKEN:
      return{
        ...state,
        userToken:payload
      }
    case authTypes.GET_USER_CREDENTIAL:
      return{
        ...state,
        userEmail:payload.userEmail,
        userId:payload.userId,
        isAdmin:payload.isAdmin,
        loading:false
      }
    case authTypes.GET_CREDEN_REQ:
      return{
        ...state,
        loading:true,
      }
    case authTypes.GET_CREDEN_FAIL:
      return{
        ...state,
        loading:false,
        error:payload
      }
    case authTypes.LOGOUT_REQ:
      return{
        ...state,
        loading:true,
        error:""
      }
    case authTypes.GET_PASSWORD_RESET_CODE:
      return{
        ...state,
        forgotEmail:payload
      }
    case authTypes.LOGOUT_SUCCESS:
      return{
        ...state,
        loading:false,
        userToken:null,
        userEmail:null,
        userId:null,
        isAdmin:null
      }
    default:return state
  }
}
