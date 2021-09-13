import React from 'react'
import Images from './Images'

export default class SoundPronunciation extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            helpVisible: false,
            isClose: false,
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

    render(){
        return (
            <div className='subsection-container'>
                <Images/>
            </div>
        )
    }
}