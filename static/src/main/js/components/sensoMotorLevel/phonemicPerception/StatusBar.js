import React from 'react'
import $ from 'jquery'
import {pairsOfSounds} from './pairsOfSounds.json'

const colors = ['red', 'yellow', 'blue', 'green']

export default class StatusBar extends React.Component {
    constructor(props) {
        super(props)
    }

    handleClick = e => {
        const index = e.target.getAttribute('data-index')
        if (index != this.props.activeIndex) {
            $('#text').animate({
                opacity: 0,
                marginLeft: -150
            }, 100, () => {
                this.props.setActivePair(+index)
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
                            {this.props.pairsOfSounds.map((pair, index) => {
                                return (
                                    <td onClick={this.handleClick}
                                        key={index}
                                        data-tooltip={pairsOfSounds[pair.id].text}
                                        data-index={index}
                                        className={`${colors[pair.value] || ''} ${ this.props.activeIndex == index ? 'active-cell' : ''}`}>
                                    </td>)
                            })}
                        </tr>
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        )
    }
}