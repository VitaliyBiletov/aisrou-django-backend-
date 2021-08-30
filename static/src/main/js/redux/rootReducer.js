import {combineReducers} from 'redux'
import {diagnosticReducer} from "./diagnosticReducer";

export const rootReducer = combineReducers({
    diagnostic: diagnosticReducer
})