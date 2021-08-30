import {STATE_OF_FUNCTIONS_INPUT_VALUE, UPDATE_INITIAL_STATE} from "./types";
import axios from "axios/index";


export function stateOfFunctionsInputValue(name, value) {
    return {
        type: STATE_OF_FUNCTIONS_INPUT_VALUE,
        payload: {name, value}
    }
}

export function updateInitialState(state) {
    return function (dispatch) {
        axios.post('/diagnostic/load-data', state)
            .then(res => {
                const {diagnostic} = res.data
                dispatch({
                    type: UPDATE_INITIAL_STATE,
                    payload: diagnostic
                })
        }).catch(err => console.error(err))
    }
}