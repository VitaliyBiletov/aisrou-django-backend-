import React from 'react'
import 'animate.css/animate.css'
import {connect} from 'react-redux'
import {PAIRS_OF_SOUNDS} from './pairsOfSounds'

class Text extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
              <div className='text-container'>
                <p id="text">{PAIRS_OF_SOUNDS[this.props.activeIndex].text}</p>
              </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        activeIndex: state.diagnostic.sensoMotorLevel.phonemicPerception.activeIndex
    }
}

export default connect(mapStateToProps, null)(Text)