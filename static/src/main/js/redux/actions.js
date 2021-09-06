import {
    STATE_OF_FUNCTIONS_INPUT_VALUE,
    UPDATE_INITIAL_STATE,
    SENSO_MOTOR_LEVEL_INPUT_VALUE,
    SET_ACTIVE_INDEX,
    SET_VALUE_TO_STATE,
    // SET_LIST_OF_PICTURES
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

export function setActiveIndex(index, name){
    return function (dispatch) {
        dispatch({
            type: SET_ACTIVE_INDEX,
            payload: {index,name}
        })
}}

export function setValueToState(value, name) {
    return function (dispatch) {
        dispatch({
            type: SET_VALUE_TO_STATE,
            payload: {value, name}
        })
    }
}

// export function setAListOfPictures(id) {
//     return function (dispatch) {
//         axios.get(`/diagnostic/load-pictures/${id}/`)
//             .then(res => {
//                 dispatch({
//                     type: SET_LIST_OF_PICTURES,
//                     payload: res.data.listOfPictures
//                 })
//             })
//             .catch(err => console.error(err))
//     }
// }

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