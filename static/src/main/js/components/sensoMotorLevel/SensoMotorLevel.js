import React from 'react'
import PhonemicPerception from "./phonemicPerception/PhonemicPerception"
import Grammar from "./grammar/Grammar"
import {updateInitialState} from "../../redux/actions";

export default class SensoMotorLevel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="senso-motor-level">
                <p className='diagnostic-section-heading'>{this.props.name}</p>
                <PhonemicPerception title='Фонематическое восприятие'/>
                <Grammar name='Гамматический строй речи'/>
            </div>
        )
    }
}

