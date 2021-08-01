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
            <div className={`row justify-content-md-center mt-5 wrapper`}>
              <div className={`col-md-auto`}>
                <p id="text">{ activePair.text }</p>
              </div>
            </div>
        )
    }
}