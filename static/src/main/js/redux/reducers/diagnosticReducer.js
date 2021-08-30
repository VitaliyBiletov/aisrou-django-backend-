import {STATE_OF_FUNCTIONS_INPUT_VALUE, UPDATE_INITIAL_STATE} from "../types";

const initialState = {
    stateOfFunctions: {
        hearing: '',
        vision: '',
        breath: '',
        voice:'',
        prosody:'',
        articulation_apparatus: '',
        motor_skills: '',
        additional_information:'',
    },
    sensoMotorLevel:{
        phonemicPerception:[]
    }
}

export const diagnosticReducer = (state = initialState, action) => {
    switch (action.type){
        case STATE_OF_FUNCTIONS_INPUT_VALUE:
            return {...state, stateOfFunctions: {...state.stateOfFunctions, [action.payload.name]:action.payload.value}}
        case UPDATE_INITIAL_STATE:
            return {...state, ...action.payload}
        default:
            return state
    }
}