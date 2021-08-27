import React from 'react'
import PhonemicPerception from "./phonemicPerception/PhonemicPerception"

export default class SensoMotorLevel extends React.Component {
    constructor(props) {
        super(props);
        this.updateState = props.updateState
        this.state = this.props.state
        console.log('sml = ',this.props.state)
    }

    render() {
        return (
            <React.Fragment>
                <p className='section-heading'>{this.props.name}</p>
                <PhonemicPerception
                    updateState={this.updateState}
                    state={this.state.phonemicPerception}
                    name='Фонематическое восприятие'/>
            </React.Fragment>
        )
    }
}