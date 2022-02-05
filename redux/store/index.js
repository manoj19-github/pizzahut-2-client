import {
  createStore,
  applyMiddleware,
  combineReducers
} from "redux"
import {clientProductReducer} from "../reducers/clientProductReducer"
import {authReducer} from "../reducers/authReducer"
import {siteReducer} from "../reducers/siteReducer"
import {clientSingleProductReducer} from "../reducers/clientSingleProductReducer"
import {cartReducer} from "../reducers/cartReducer"
import {orderReducer} from "../reducers/orderReducer"
import thunk from "redux-thunk"

import {
  composeWithDevTools
} from "redux-devtools-extension"

const rootReducers=combineReducers({
  clientProductReducer,authReducer,
  siteReducer,clientSingleProductReducer,
  cartReducer,orderReducer
})

const store=createStore(rootReducers,{},composeWithDevTools(applyMiddleware(thunk)))
export default store
