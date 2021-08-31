import {
    STATE_OF_FUNCTIONS_INPUT_VALUE,
    UPDATE_INITIAL_STATE,
    SET_ACTIVE_INDEX,
    SET_VALUE_OF_PAIR_SOUNDS
} from "../types";
import {PAIRS_OF_SOUNDS} from '../../components/sensoMotorLevel/phonemicPerception/pairsOfSounds'
import {sensoMotorLevelInputValue} from "../actions";

console.log(PAIRS_OF_SOUNDS)

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
            pairsOfSounds: PAIRS_OF_SOUNDS.map(pair => ({id: pair.id, value: pair.value})),
            activeIndex: 0,
        }
    },
}

export const diagnosticReducer = (state = initialState, action) => {
    const {phonemicPerception} = state.sensoMotorLevel
    switch (action.type){
        case STATE_OF_FUNCTIONS_INPUT_VALUE:
            return {...state, stateOfFunctions: {...state.stateOfFunctions, [action.payload.name]:action.payload.value}}
        case UPDATE_INITIAL_STATE:
            return {...state, ...action.payload}
        case SET_ACTIVE_INDEX:
            const phonemicPerceptionActiveIndex = Object.assign({}, {
                phonemicPerception : {...phonemicPerception, activeIndex: action.payload}})
            return Object.assign({}, state, { sensoMotorLevel: phonemicPerceptionActiveIndex })
        case SET_VALUE_OF_PAIR_SOUNDS:
            const pairsOfSounds = Object.assign(
                {}, {
                    pairsOfSounds : phonemicPerception.pairsOfSounds.map((pair, index) => {
                        if (index == phonemicPerception.activeIndex){
                            return {id:phonemicPerception.activeIndex, value: action.payload}
                        }
                        return pair
                    })
                }
            )
            return Object.assign({}, state, { sensoMotorLevel: {phonemicPerception: {...phonemicPerception, ...pairsOfSounds, }} })
        default:
            return state
    }
}

