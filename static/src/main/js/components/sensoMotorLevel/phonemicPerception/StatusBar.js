import React from 'react'
import $ from 'jquery'
import 'animate.css/animate.css'

export default class StatusBar extends React.Component{
    constructor(props) {
        super(props)
        this.pairsOfSound = props.pairsOfSound
    }

    handleClick = e => {
        const id = e.target.getAttribute('data-id')
        this.props.setActivePair(id)
    }

    render() {
        const [activePair] = this.pairsOfSound.filter(pair => pair.active)
        return (
            <React.Fragment>
                <div className="row justify-content-md-center mt-3">
                  <div className="col-md-auto">
                      <table className='state-table' data-scores='{{scores}}'>
                          <tbody>
                            <tr>
                                { this.pairsOfSound.map((pair)=>
                                    <td onClick={this.handleClick}
                                        key={pair.id}
                                        data-tooltip={pair.text}
                                        data-id={pair.id}
                                        className={`${pair.color ? pair.color : ''} ${activePair.id == pair.id ? 'active-cell': ''}`}>
                                    </td>)}
                            </tr>
                          </tbody>
                      </table>
                  </div>
                </div>
            </React.Fragment>
        )
    }
}