import {
    STATE_OF_FUNCTIONS_INPUT_VALUE,
    UPDATE_INITIAL_STATE,
    SET_ACTIVE_INDEX
} from "../types";
import {sensoMotorLevelInputValue} from "../actions";

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
        phonemicPerception:{
            pairsOfSounds: [],
            activeIndex: 0,
        }
    },
}

export const diagnosticReducer = (state = initialState, action) => {
    switch (action.type){
        case STATE_OF_FUNCTIONS_INPUT_VALUE:
            return {...state, stateOfFunctions: {...state.stateOfFunctions, [action.payload.name]:action.payload.value}}
        case UPDATE_INITIAL_STATE:
            return {...state, ...action.payload}
        case SET_ACTIVE_INDEX:
            const phonemicPerception = Object.assign({}, {
                phonemicPerception : {...state.sensoMotorLevel.phonemicPerception, activeIndex: action.payload}})
            return Object.assign({}, state, { sensoMotorLevel: phonemicPerception })
        default:
            return state
    }
}

