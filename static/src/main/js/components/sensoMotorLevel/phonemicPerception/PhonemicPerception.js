import React from 'react'
import StatusBar from "./StatusBar";
import Buttons from './Buttons'

const pairsOfSounds = [
  {
    id: 0,
    view: 'Ба-па | Па-ба',
  },
  {
    id: 1,
    view: 'Са-за | За-са',
  },
  {
    id: 2,
    view: 'Жа-ша | Ша-жа',
  },
  {
    id: 3,
    view: 'Са-ша | Ша-са',
  },
  {
    id: 4,
    view: 'Ла-ра | Ра-ла',
  },
  {
    id: 5,
    view: 'Ма-на-ма | На-ма-на',
  },
  {
    id: 6,
    view: 'Га-ка-га | Ка-га-ка',
  },
  {
    id: 7,
    view: 'За-са-за | Са-за-са',
  },
  {
    id: 8,
    view: 'Жа-ша-жа | Ша-жа-ша',
  },
  {
    id: 9,
    view: 'Са-ша-са | Ша-са-ша',
  },
  {
    id: 10,
    view: 'Ца-са-ца | Са-ца-са',
  },
  {
    id: 11,
    view: 'Ча-тя-ча | Тя-ча-тя',
  },
  {
    id: 12,
    view: 'Ра-ла-ра | Ла-ра-ла',
  },
]

export default class PhonemicPerception extends React.Component {
  constructor(props) {
    super(props)
    this.name = props.name
  }

    render() {
        return (
            <div className='phonemicPerceptionContainer'>
              <p className="col-md-auto heading px-3">{ this.name }</p>
              <div className='phonemicPerception'>
                <StatusBar pairsOfSound = { pairsOfSounds }/>
                <Buttons />
              </div>
            </div>
            )
    }
}
