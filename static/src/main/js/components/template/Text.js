import React from 'react'
import 'animate.css/animate.css'
import {connect} from 'react-redux'

export default class Text extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
              <div className='text-container'>
                <p>{this.props.data[this.props.activeIndex].text}</p>
              </div>
        )
    }
}