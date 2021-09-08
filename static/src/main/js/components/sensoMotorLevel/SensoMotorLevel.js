import React from 'react'
import PhonemicPerception from "./phonemicPerception/PhonemicPerception"
import SoundPronunciation from "./soundPronunciation/SoundPronunciation"
import ArtuclatoryMotor from "./articulatoryMotor/ArtuclatoryMotor";

export default class SensoMotorLevel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="senso-motor-level">
                <p className='diagnostic-section-heading'>{this.props.name}</p>
                <PhonemicPerception title='Фонематическое восприятие'/>
                <SoundPronunciation title='Звукопроизношение'/>
                <ArtuclatoryMotor title='Артикуляционная моторика'/>
            </div>
        )
    }
}

