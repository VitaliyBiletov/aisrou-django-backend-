import React from 'react'
import $ from 'jquery'

export default class StatusBar extends React.Component{
    constructor(props) {
        super(props)
        this.pairsOfSound = props.pairsOfSound
    }

    handleClick = e => {
        const id = e.target.getAttribute('data-id')
        const [active] = this.pairsOfSound.filter(pair => pair.active)
        if (id != active.id){
            $('#text').animate({
                opacity: 0,
                marginLeft: -150
            }, 100, () => {
                this.props.setActivePair(id)
                $('#text').css({
                    marginLeft: 150
                }).animate({
                    opacity: 1,
                    marginLeft: 0
                }, 100)
            })
        }
    }

    render() {
        const [activePair] = this.pairsOfSound.filter(pair => pair.active)
        return (
            <React.Fragment>
                  <div className="state-table-container">
                      <table className='state-table' data-scores='{{scores}}'>
                          <tbody>
                            <tr>
                                { this.pairsOfSound.map((pair)=>
                                    <td onClick={this.handleClick}
                                        key={pair.id}
                                        data-tooltip={pair.text}
                                        data-id={pair.id}
                                        className={`${pair.color ? pair.color : '' } ${activePair.id == pair.id ? 'active-cell': ''}`}>
                                    </td>)}
                            </tr>
                          </tbody>
                      </table>
                  </div>
            </React.Fragment>
        )
    }
}