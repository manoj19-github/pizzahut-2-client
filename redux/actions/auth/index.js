import axios from "axios"
import {authTypes} from "../../types"
export const getAuthData=()=>async (dispatch,getState)=>{
  try{
    dispatch({type:authTypes.GET_CREDEN_REQ})
    const {data}=await axios.get("/api/auth/login/success",{
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
              },

    })
    const authUser=getState().authReducer.authUser
    dispatch({type:authTypes.GET_CREDEN_SUCCESS,payload:data.authUser})
    if(data.status)
      sessionStorage.setItem("pizzahut-auth-data",JSON.stringify(data.authUser))
    return true
  }catch(err){
    dispatch({type:authTypes.GET_CREDEN_FAIL,payload:err})
    return false
  }

}
export const loginAction=(email,password)=>async (dispatch,getState)=>{
  try{
    dispatch({type:authTypes.GET_CREDEN_REQ})
    const {data}=await axios.post("/api/auth/login",{email,password},{
      headers:{
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials":true
      }
    })
    const authUser=getState().authReducer.authUser
    dispatch({type:authTypes.GET_CREDEN_SUCCESS,payload:data.authUser})
    if(data.status)
      sessionStorage.setItem("pizzahut-auth-data",JSON.stringify(data.authUser))

  }catch(err){
    console.log(err)
    dispatch({type:authTypes.GET_CREDEN_REQ,payload:err})

  }
}
export const adminLoginAction=(email,password,router)=>async (dispatch,getState)=>{
  try{
    dispatch({type:authTypes.GET_CREDEN_REQ})
    const {data}=await axios.post("/api/auth/admin/login",{email,password},{
      headers:{
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials":true
      }
    })
    dispatch({type:authTypes.GET_CREDEN_SUCCESS,payload:data.authUser})
    if(data.status)
      sessionStorage.setItem("pizzahut-auth-data",JSON.stringify(data.authUser))
      router.push("/admin")
  }catch(err){
    dispatch({type:authTypes.GET_CREDEN_REQ,payload:err})
  }
}
export const logoutAction=()=>async (dispatch)=>{
  try{
    dispatch({type:authTypes.LOGOUT_REQ})
    const {data}=await axios.post("/api/auth/logout",{
      headers:{
        "Access-Control-Allow-Credentials":true
      }
    })
    dispatch({type:authTypes.LOGOUT_SUCCESS})
    sessionStorage.removeItem("pizzahut-auth-data")

  }catch(err){
    console.log("err occured in logout action",err)
  }
}
