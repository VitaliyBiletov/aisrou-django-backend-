import {
    STATE_OF_FUNCTIONS_INPUT_VALUE,
    UPDATE_INITIAL_STATE,
    SET_VALUE_TO_STATE,
} from "../types";
import {PAIRS_OF_SOUNDS} from '../../components/sensoMotorLevel/phonemicPerception/pairsOfSounds'
import {SYLLABLES} from "../../components/sensoMotorLevel/soundPronunciation/syllables";
import {EXERCISES} from "../../components/sensoMotorLevel/articulatoryMotor/exercises";
import _ from 'lodash'
import {SOUND_SYLLABLES} from "../../components/sensoMotorLevel/soundSyllableStructure/soundSyllables";

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
        },
        soundPronunciation: {
            name: 'soundPronunciation',
            values: SYLLABLES.map(syllable => ({id: syllable.id, value: ''})),
        },
        articulatoryMotor:{
            name: 'articulatoryMotor',
            values: EXERCISES.map(exersise => ({id: exersise.id, value:''})),
        },
        soundSyllableStructure:{
            name: 'soundSyllableStructure',
            values: SOUND_SYLLABLES.map(item => ({id: item.id, value:''})),
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
        case SET_VALUE_TO_STATE:
            stateCopy = Object.assign({},state)
            _.set(stateCopy, `sensoMotorLevel.${action.payload.name}.values[${action.payload.index}].value`, action.payload.value)
            return stateCopy
        default:
            return state
    }
}

