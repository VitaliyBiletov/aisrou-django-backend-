import React from 'react'
import PhonemicPerception from "./phonemicPerception/PhonemicPerception"

export default class SensoMotorLevel extends React.Component {
    constructor(props) {
        super(props);
        this.updateState = props.updateState
        this.getState = props.getState
    }

    render() {
        return (
            <React.Fragment>
                <p className='section-heading'>{this.props.name}</p>
                <PhonemicPerception
                    updateState={this.updateState}
                    getState={this.getState}
                    name='Фонематическое восприятие'/>
            </React.Fragment>
        )
    }
}