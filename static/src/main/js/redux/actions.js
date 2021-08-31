import {
    STATE_OF_FUNCTIONS_INPUT_VALUE,
    UPDATE_INITIAL_STATE,
    SENSO_MOTOR_LEVEL_INPUT_VALUE,
    SET_ACTIVE_INDEX
} from "./types";
import axios from "axios/index";


export function stateOfFunctionsInputValue(name, value) {
    return {
        type: STATE_OF_FUNCTIONS_INPUT_VALUE,
        payload: {name, value}
    }
}

export function sensoMotorLevelInputValue(id, value) {
    return {
        type: SENSO_MOTOR_LEVEL_INPUT_VALUE,
        payload: {id, value}
    }
}

export function setActiveIndex(index){
    return function (dispatch) {
        dispatch({
            type: SET_ACTIVE_INDEX,
            payload: index
        })
}}

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