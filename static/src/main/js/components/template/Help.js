import React from 'react'
import classNames from 'classnames'

export default class Help extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    const hints = this.props.hints
    return (
        <div className={`help-сontainer animate__animated ${this.props.isVisible ? 'animate__flipInY' : 'animate__flipOutY' }`}>
          {hints.map(hint => (
            <div key={hint.id} className='hint'>
              <div className={`color-hint ${hint.color}`}></div>
              <div className='text-hint'>{ hint.text }</div>
            </div>
          ))}
          <div className='close-help red' onClick={this.props.closeHelp}>x</div>
        </div>
  )}
}
