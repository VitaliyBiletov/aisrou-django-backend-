import {CREATE_DIAGNOSTIC} from "./types";

const initialState = {
    stateOfFunctionsFields: {
        hearing: '',
        vision: '',
        breath: '',
        voice: '',
        prosody: '',
        articulation_apparatus: '',
        motor_skills: '',
        additional_information: ''
    },
    sensoMotorLevel:{
        phonemicPerception:[]
    }
}

export const diagnosticReducer = (state = initialState, action) => {
    switch (action.type){
        case CREATE_DIAGNOSTIC:
            return state
    }
    return state
}