import {notifyTypes} from "../types"
const getLocalStorageData=()=>{
  if(typeof window !== "undefined")
  return JSON.parse(localStorage.getItem("pizzahut-admin-notification"))?
  [JSON.parse(localStorage.getItem("pizzahut-admin-notification"))]:[]

}
const initState={
  notifyData:getLocalStorageData()
}

export const notifyReducer=(state=initState,action)=>{
  try{
    const {type,payload}=action
    switch(type){
      case notifyTypes.NOTIFY_SET:
        if(state.notifyData.length){
          return {
            notifyData:[payload,...state.notifyData]
          }
        }
        return{
          notifyData:[payload]
        }
      case notifyTypes.NOTIFY_RESET:
        var filterNotifyData=[]
        if(state.notifyData.length){
          filterNotifyData=state.notifyData.filter((notes,index)=>{
            return notes._id!=payload._id
          })
          if(filterNotifyData.length){
            return {
              notifyData:[...filterNotifyData]
            }
          }
        }
        localStorage.removeItem("PizzaHut-admin-notify-data")
        return {
          notifyData:[]
        }
      case notifyTypes.NOTIFY_CLEAN:{
        localStorage.removeItem("PizzaHut-admin-notify-data")
        return {
          notifyData:[]
        }
      }
      default:return state
    }
  }catch(err){
    console.log(`notifyreducer error `,err)
  }
}
