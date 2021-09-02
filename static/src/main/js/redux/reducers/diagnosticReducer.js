import {
    STATE_OF_FUNCTIONS_INPUT_VALUE,
    UPDATE_INITIAL_STATE,
    SET_ACTIVE_INDEX,
    SET_VALUE_OF_PAIR_SOUNDS,
    SET_LIST_OF_PICTURES
} from "../types";
import {PAIRS_OF_SOUNDS} from '../../components/sensoMotorLevel/phonemicPerception/pairsOfSounds'
import {SYLLABLES} from "../../components/sensoMotorLevel/grammar/syllables";
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
            values: PAIRS_OF_SOUNDS.map(pair => ({id: pair.id, value: pair.value})),
            activeIndex: 0, },
        grammar: {
            name: 'grammar',
            values: SYLLABLES.map(syllable => ({id: syllable.id, value: syllable.value})),
            activeIndex: 0,
            listOfPictures:[]
        }
    }
}

export const diagnosticReducer = (state = initialState, action) => {
    switch (action.type){
        case STATE_OF_FUNCTIONS_INPUT_VALUE:
            return {...state, stateOfFunctions: {...state.stateOfFunctions, [action.payload.name]:action.payload.value}}
        case UPDATE_INITIAL_STATE:
            return {...state, ...action.payload}
        case SET_ACTIVE_INDEX:
            let copyState = Object.assign({},state)
            _.set(copyState, `sensoMotorLevel.${action.payload.name}.activeIndex`, action.payload.index)
            return copyState
        case SET_LIST_OF_PICTURES:
            let copyState3 = Object.assign({},state)
            _.set(copyState3, `sensoMotorLevel.grammar.listOfPictures`, action.payload)
            console.log(copyState3)
            return copyState3
        case SET_VALUE_OF_PAIR_SOUNDS:
            let copyState2 = Object.assign({},state)
            const index = _.get(copyState2, `sensoMotorLevel.${action.payload.name}.activeIndex`)
            _.set(copyState2, `sensoMotorLevel.${action.payload.name}.values[${index}].value`, action.payload.value)
            _.set(copyState2, `sensoMotorLevel.${action.payload.name}.activeIndex`,
                index + 1 == _.get(state, `sensoMotorLevel.${action.payload.name}.values`).length ? 0 : index + 1)
            return copyState2
        default:
            return state
    }
}

