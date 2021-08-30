import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from "react-dom";
import applyMiddleware from "redux/src/applyMiddleware";
import axios from "axios/index";
import {rootReducer} from "../redux/rootReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {createStore} from "redux";
import Diagnostic from './diagnostic/Diagnostic'

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

const App = (props) => {
    return (
        <Diagnostic />
    )
}

const app = (
    <Provider store={store}>
        <App/>
    </Provider>
)

ReactDOM.render(app, document.getElementById('diagnostic-container'))

export {store}