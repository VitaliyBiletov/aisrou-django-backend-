import React from 'react'
import classNames from 'classnames'

export default class Help extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      hints: [
        {id:0, color:'red', text:'Отказ от выполнения, полная невозможность воспроизведения пробы'},
        {id:1, color:'yellow', text:'Неточное воспроизведение обоих членов пары с перестановкой слогов, их заменой и пропусками'},
        {id:2, color:'blue', text:'Первый член воспроизводится правильно, второй уподобляется первому (ба-па-ба-па)'},
        {id:3, color:'green', text:'Точное и правильное воспроизведение в темпе предъявления'},
      ],
      isVisible: false
    }
  }

  render(){
    const hints = this.state.hints
    return (
      <div className={`hints ${this.state.isVisible ? 'animated flipOutY' : null }`}>
        {hints.map(hint => (
          <div key={hint.id} className='hint'>
            <div className={`color-hint ${hint.color}`}></div>
            <div className='text-hint'>{ hint.text }</div>
          </div>
        ))}
        <div className='closeHelp red' onClick={this.props.closeHelp}>x</div>
      </div>
  )}
}

// ReactDOM.render(<Help/>, document.getElementById('app'))