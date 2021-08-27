import React from 'react'
import StatusBar from "./StatusBar";
import Buttons from './Buttons'
import Text from './Text'
import Help from './Help'
import 'animate.css/animate.css'
import classNames from 'classnames'
import {pairsOfSounds} from './pairsOfSounds.json'

const colors = ['red', 'yellow', 'blue', 'green']

export default class PhonemicPerception extends React.Component {
    constructor(props) {
        super(props)
        this.title = props.name
        this.updateState = props.updateState
        this.state = {
            pairsOfSounds: this.props.state,
            activeIndex: 0,
            helpVisible: false,
            isClose: false,
        }
    }

    setActivePair = (index) => {
        this.setState({activeIndex: index})
    }

    setValue = (value) => {
        const {activeIndex} = this.state
        const nextIndex = activeIndex == (pairsOfSounds.length - 1) ? 0 : activeIndex + 1
        const newState = this.state.pairsOfSounds.map((pair, index) => {
            if (index == activeIndex) {
                this.setState({activeIndex: nextIndex})
                return {id: pair.id, value: +value}
            }
            return pair
        })

        this.setState({pairsOfSounds: newState})

        const phonemicPerception = this.state.pairsOfSounds.map(({id, value}) => {
            return {id, value}
        })

        this.updateState(
            {sensoMotorLevel: {phonemicPerception: phonemicPerception}}
        )
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

        const activePair = pairsOfSounds[this.state.activeIndex]

        return (
            <div className='phonemic-perception'>
                <div className="heading">{this.title}</div>
                <div onClick={this.openHelp} className='helpIcon'>?</div>
                <div className='phonemic-perception-container'>
                    <StatusBar pairsOfSounds={this.state.pairsOfSounds}
                               setActivePair={this.setActivePair}
                               activeIndex={this.state.activeIndex}/>
                    <Text activePair={activePair}/>
                    <Buttons setValue={this.setValue}/>
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