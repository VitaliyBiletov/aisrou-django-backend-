 import {combineReducers} from 'redux'
import {diagnosticReducer} from "./reducers/diagnosticReducer";

export const rootReducer = combineReducers({
    diagnostic: diagnosticReducer
})