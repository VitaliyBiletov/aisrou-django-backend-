import React from 'react'
import $ from 'jquery'
import {connect} from 'react-redux'
import {setActiveIndex} from "../../../redux/actions";
import {PAIRS_OF_SOUNDS} from './pairsOfSounds'

const colors = ['red', 'yellow', 'blue', 'green']

class StatusBar extends React.Component {
    constructor(props) {
        super(props)
    }

    handleClick = e => {
        const index = e.target.getAttribute('data-index')
        if (index != this.props.activeIndex) {
            this.props.setActiveIndex(+index)
        }

    }

    render() {
        return (
            <React.Fragment>
                <div className="state-table-container">
                    <table className='state-table' data-scores='{{scores}}'>
                        <tbody>
                        <tr>
                            {this.props.pairsOfSoundsFormState.map((pair, index) => {
                                return (
                                    <td onClick={this.handleClick}
                                        key={index}
                                        data-tooltip={PAIRS_OF_SOUNDS[pair.id].text}
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

const mapStateToProps = state => {
    return {
        pairsOfSoundsFormState: state.diagnostic.sensoMotorLevel.phonemicPerception.pairsOfSounds,
        activeIndex: state.diagnostic.sensoMotorLevel.phonemicPerception.activeIndex
    }
}

const mapDispatchToProps = {
    setActiveIndex,
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusBar)