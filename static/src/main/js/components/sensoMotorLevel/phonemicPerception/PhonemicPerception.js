import React from 'react'
import StatusBar from "../../template/StatusBar";
import Buttons from '../../template/Buttons'
import Text from '../../template/Text'
import Help from '../../template/Help'
import 'animate.css/animate.css'
import classNames from 'classnames'
import {connect} from 'react-redux'
import {setActiveIndex, setValuePairSounds} from "../../../redux/actions";
import {PAIRS_OF_SOUNDS} from "./pairsOfSounds";
import _ from 'lodash'

const colors = ['red', 'yellow', 'blue', 'green']

class PhonemicPerception extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            helpVisible: false,
            isClose: false,
        }
    }

    openHelp = e => {
        this.setState({
            helpVisible: true,
            isClose: false,
        })
    }

    closeHelp = e => {
        this.setState({
            isClose: true,
        })
        setTimeout(() => this.setState({helpVisible: false}), 800)
    }

    render() {
        const classes = classNames({
            'helpContainer': true,
            'animate__animated': true,
            'animate__flipInY': this.state.helpVisible,
            'animate__flipOutY': this.state.isClose,
        })

        return (
                <div className='section phonemic-perception'>
                    <div className="heading">{ this.props.title }</div>
                    <div onClick={this.openHelp} className='helpIcon'>?</div>
                    <div className='section-container'>
                        <StatusBar
                            dataFromState={this.props.values}
                            data={PAIRS_OF_SOUNDS}
                            name='phonemicPerception'
                            activeIndex={this.props.activeIndex}
                        />

                        <Text
                            activeIndex={this.props.activeIndex}
                            data={PAIRS_OF_SOUNDS}
                        />
                        <Buttons
                            name='phonemicPerception'/>
                    </div>
                    {this.state.helpVisible && (
                        <div className={classes}>
                            <Help closeHelp={this.closeHelp}/>
                        </div>
                    )}
                </div>
        )
    }
}

const mapStateToProps = state => {
    const {values, activeIndex} = state.diagnostic.sensoMotorLevel.phonemicPerception
    return {values, activeIndex}
}

export default connect(mapStateToProps, null)(PhonemicPerception)