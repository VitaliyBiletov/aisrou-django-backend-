import React from 'react'
import $ from 'jquery'
import { pairsOfSounds } from './pairsOfSounds.json'

const colors = ['red', 'yellow', 'blue', 'green']

export default class StatusBar extends React.Component{
    constructor(props) {
        super(props)
    }

    handleClick = e => {
        const id = e.target.getAttribute('data-id')
        if (id != this.props.activePairId){
            $('#text').animate({
                opacity: 0,
                marginLeft: -150
            }, 100, () => {
                this.props.setActivePair(+id)
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
        return (
            <React.Fragment>
              <div className="state-table-container">
                  <table className='state-table' data-scores='{{scores}}'>
                      <tbody>
                        <tr>
                            { this.props.pairsOfSounds.map((pair)=>{
                                return(
                                <td onClick={this.handleClick}
                                    key={pair.id}
                                    data-tooltip={pairsOfSounds[pair.id].text}
                                    data-id={pair.id}
                                    className={`${colors[pair.value] || ''} ${ this.props.activePairId == pair.id ? 'active-cell': ''}`}>
                                </td>)})}
                        </tr>
                      </tbody>
                  </table>
              </div>
            </React.Fragment>
        )
    }
}