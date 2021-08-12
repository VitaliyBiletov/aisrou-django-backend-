import React from 'react'
import StatusBar from "./StatusBar";
import Buttons from './Buttons'
import Text from './Text'
import Help from './Help'
import 'animate.css/animate.css'
import classNames from 'classnames'
import { pairsOfSounds } from './pairsOfSounds.json'

const colors = ['red', 'yellow', 'blue', 'green']

export default class PhonemicPerception extends React.Component {
  constructor(props) {
    super(props)
    this.title = props.name
    this.updateState = props.updateState
    this.state = {
      pairsOfSounds: this.props.getState('sensoMotorLevel').phonemicPerception,
      activePairId: 0,
      helpVisible: false,
      isClose: false,
    }
  }

  setActivePair = (id) => {
    this.setState({activePairId: id})
  }

  setValue = (value) => {
    const activePairId = this.state.activePairId
    const nextActiveId = activePairId == pairsOfSounds.length - 1 ? 0 : activePairId + 1
    const newState = this.state.pairsOfSounds.map(pair => {
      if (pair.id == activePairId){
       return { id: pair.id, value: +value}
      }
      if (pair.id == nextActiveId){
        this.setState({ activePairId: pair.id })
      }
      return pair
    })

    this.setState({pairsOfSounds: newState})

    const phonemicPerception = this.state.pairsOfSounds.map(({id, value}) => {
      return {id, value}
    })

    this.updateState(
        {
          sensoMotorLevel: { phonemicPerception: phonemicPerception }
        }
    )
  }

  openHelp = e => {
    this.setState({
      helpVisible: true,
      isClose: false,
    })
  }

  closeHelp = e => {
    this.setState({
      isClose: true,
    })
    setTimeout(() => this.setState({helpVisible: false}), 800)
  }

  render() {
    const classes = classNames({
      'helpContainer': true,
      'animate__animated': true,
      'animate__flipInY': this.state.helpVisible,
      'animate__flipOutY': this.state.isClose,
    })

    const activePair = pairsOfSounds.find((pair) => pair.id == this.state.activePairId)

    return (
      <div className='phonemic-perception'>
        <div className="heading">{ this.title }</div>
        <div onClick={this.openHelp} className='helpIcon'>?</div>
        <div className='phonemic-perception-container'>
          <StatusBar pairsOfSounds={this.state.pairsOfSounds} setActivePair={ this.setActivePair } activePairId={ this.state.activePairId }/>
          <Text activePair={ activePair } />
          <Buttons setValue={ this.setValue }/>
        </div>
        { this.state.helpVisible && (
          <div className={ classes }>
            <Help closeHelp={this.closeHelp}/>
          </div>
        )}
      </div>
      )
  }
}