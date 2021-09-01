import React from 'react'
import PhonemicPerception from "./phonemicPerception/PhonemicPerception"
import {updateInitialState} from "../../redux/actions";

export default class SensoMotorLevel extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){

    }

    render() {
        return (
            <React.Fragment>
                <p className='section-heading'>{this.props.name}</p>
                <PhonemicPerception name='Фонематическое восприятие'/>
            </React.Fragment>
        )
    }
}

