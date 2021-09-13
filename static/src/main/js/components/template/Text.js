import React from 'react'
import 'animate.css/animate.css'

export default class Text extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
              <div className='text-container'>
                <p>{this.props.data[this.props.index].text}</p>
              </div>
        )
    }
}