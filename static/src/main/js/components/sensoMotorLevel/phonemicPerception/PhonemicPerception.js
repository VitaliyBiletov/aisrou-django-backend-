import React from 'react'
import Text from '../../template/Text'
import 'animate.css/animate.css'
import {connect} from 'react-redux'
import {setValuePairSounds} from "../../../redux/actions";
import {PAIRS_OF_SOUNDS} from "./pairsOfSounds";

export default class PhonemicPerception extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='text-container'>
                <p>{PAIRS_OF_SOUNDS[this.props.index].text}</p>
            </div>)
    }
}
