import React from 'react'
import {SOUND_SYLLABLES} from "./soundSyllables";


export default class SoundSyllableStructure extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div className='card'>
                <img style={{width:'200px'}} src={`/static/src/main/img/sound-syllabic/${this.props.index}.jpg`}/>
                <p>{SOUND_SYLLABLES[this.props.index].text}</p>
            </div>

        )
    }
}