import React from 'react'
import $ from "jquery";
import 'animate.css/animate.css'
import classNames from "classnames"

export default class Text extends React.Component {
    constructor(props) {
        super(props);
        this.pairsOfSounds = props.pairsOfSound
    }

    render() {
        const [ activePair ] = this.pairsOfSounds.filter( pair => pair.active )
        return (
              <div className='text-container'>
                <p id="text">{ activePair.text }</p>
              </div>
        )
    }
}