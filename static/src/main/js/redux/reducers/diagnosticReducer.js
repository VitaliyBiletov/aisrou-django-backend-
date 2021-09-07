import {
    STATE_OF_FUNCTIONS_INPUT_VALUE,
    UPDATE_INITIAL_STATE,
    SET_ACTIVE_INDEX,
    SET_VALUE_TO_STATE,
    // SET_LIST_OF_PICTURES
} from "../types";
import {PAIRS_OF_SOUNDS} from '../../components/sensoMotorLevel/phonemicPerception/pairsOfSounds'
import {SYLLABLES} from "../../components/sensoMotorLevel/soundPronunciation/syllables";
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
            name: 'phonemicPerception',
            values: PAIRS_OF_SOUNDS.map(pair => ({id: pair.id, value: ''})),
            activeIndex: 0, },
        soundPronunciation: {
            name: 'soundPronunciation',
            values: SYLLABLES.map(syllable => ({id: syllable.id, value: ''})),
            activeIndex: 0,
        }
    }
}

export const diagnosticReducer = (state = initialState, action) => {
    let stateCopy={}
    switch (action.type){
        case STATE_OF_FUNCTIONS_INPUT_VALUE:
            return {...state, stateOfFunctions: {...state.stateOfFunctions, [action.payload.name]:action.payload.value}}
        case UPDATE_INITIAL_STATE:
            return {...state, ...action.payload}
        case SET_ACTIVE_INDEX:
            stateCopy = Object.assign({},state)
            _.set(stateCopy, `sensoMotorLevel.${action.payload.name}.activeIndex`, action.payload.index)
            return stateCopy
        case SET_VALUE_TO_STATE:
            stateCopy = Object.assign({},state)
            const index = _.get(stateCopy, `sensoMotorLevel.${action.payload.name}.activeIndex`)
            _.set(stateCopy, `sensoMotorLevel.${action.payload.name}.values[${index}].value`, action.payload.value)
            _.set(stateCopy, `sensoMotorLevel.${action.payload.name}.activeIndex`,
                index + 1 == _.get(state, `sensoMotorLevel.${action.payload.name}.values`).length ? 0 : index + 1)
            return stateCopy
        default:
            return state
    }
}

