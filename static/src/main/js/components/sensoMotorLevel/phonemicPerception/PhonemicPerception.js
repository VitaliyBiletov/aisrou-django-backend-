import React from 'react'
import StatusBar from "./StatusBar";
import Buttons from './Buttons'
import Text from './Text'


export default class PhonemicPerception extends React.Component {
  constructor(props) {
    super(props)
    this.name = props.name
    this.state = {
      pairsOfSounds: [
        { id: 0, text: 'Ба-па | Па-ба', value: null, color: null, active: true },
        { id: 1, text: 'Са-за | За-са', value: null, color: null, active: false },
        { id: 2, text: 'Жа-ша | Ша-жа', value: null, color: null, active: false },
        { id: 3, text: 'Са-ша | Ша-са', value: null, color: null, active: false },
        { id: 4, text: 'Ла-ра | Ра-ла', value: null, color: null, active: false },
        { id: 5, text: 'Ма-на-ма | На-ма-на', value: null, color: null, active: false },
        { id: 6, text: 'Га-ка-га | Ка-га-ка', value: null, color: null, active: false },
        { id: 7, text: 'За-са-за | Са-за-са', value: null, color: null, active: false },
        { id: 8, text: 'Жа-ша-жа | Ша-жа-ша', value: null, color: null, active: false },
        { id: 9, text: 'Са-ша-са | Ша-са-ша', value: null, color: null, active: false },
        { id: 10, text: 'Ца-са-ца | Са-ца-са', value: null, color: null, active: false },
        { id: 11, text: 'Ча-тя-ча | Тя-ча-тя', value: null, color: null, active: false },
        { id: 12, text: 'Ра-ла-ра | Ла-ра-ла', value: null, color: null, active: false },
      ]
    }
  }

  setActivePair = (id) => {
    const newPairsOfSound = this.state.pairsOfSounds.map(pair => {
        if (pair.id == id){
          pair.active = true
        } else {
          pair.active = false
        }
        return pair
      })

    this.setState({
      pairsOfSound: newPairsOfSound
    })
  }

  setValue = (value, color) => {
    const newPairsOfSound = this.state.pairsOfSounds.map(pair => {
        if (pair.active){
          pair.value = +value
          pair.color = color
        }
        return pair
      })

    this.setState({
      pairsOfSound: newPairsOfSound
    })
  }

  render() {
    return (
      <div className='phonemicPerceptionContainer'>
        <p className="col-md-auto heading px-3">{ this.name }</p>
        <div className='phonemicPerception'>
          <StatusBar setActivePair={ this.setActivePair } pairsOfSound={ this.state.pairsOfSounds }/>
          <Text pairsOfSound={ this.state.pairsOfSounds } />
          <Buttons setValue={ this.setValue }/>
        </div>
      </div>
      )
  }
}
