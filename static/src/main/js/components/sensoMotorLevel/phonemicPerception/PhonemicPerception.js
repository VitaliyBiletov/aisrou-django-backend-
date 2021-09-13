import React from 'react'
import Text from '../../template/Text'
import 'animate.css/animate.css'
import {connect} from 'react-redux'
import {setValuePairSounds} from "../../../redux/actions";
import {PAIRS_OF_SOUNDS} from "./pairsOfSounds";

class PhonemicPerception extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            helpVisible: false,
        }
    }

    openHelp = e => {
        this.setState({
            helpVisible: true,
        })
    }

    closeHelp = e => {
        this.setState({helpVisible: false})
    }

    render() {
        return (
            <Text
                activeIndex={this.props.activeIndex}
                data={PAIRS_OF_SOUNDS}
            />
        )
    }
}

const mapStateToProps = state => {
    const {values, activeIndex} = state.diagnostic.sensoMotorLevel.phonemicPerception
    return {values, activeIndex}
}

export default connect(mapStateToProps, null)(PhonemicPerception)