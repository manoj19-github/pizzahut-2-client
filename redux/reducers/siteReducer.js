import {siteTypes} from "../types"
const initStates={
  isSidebarOpen:false,
  isAdminSidebarOpen:false,
  tabIndex:0

}

export const siteReducer=(state=initStates,action)=>{
  const {type,payload}=action
  switch(type){
    case siteTypes.DISPLAY_SIDEBAR:
      return{
        ...state,
        isSidebarOpen:true,

      }
    case siteTypes.HIDE_SIDEBAR:
      return{
        ...state,
        isSidebarOpen:false,

      }
    case siteTypes.DISPLAY_AD_SIDEBAR:
      return{
        ...state,
        isAdminSidebarOpen:true
      }
    case siteTypes.HIDE_AD_SIDEBAR:
      return{
        ...state,
        isAdminSidebarOpen:false
      }
    case siteTypes.TAB_CHANGE:
      return{
        ...state,
        tabIndex:payload
      }
    default: return state
  }

}
