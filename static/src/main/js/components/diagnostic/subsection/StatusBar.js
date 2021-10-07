import React from 'react'
import {setValuePairSounds} from "../../../redux/actions";
import {connect} from 'react-redux'

const colors = ['red', 'yellow', 'blue', 'green']

export default class StatusBar extends React.Component {
    constructor(props) {
        super(props)
    }

    handleClick = e => {
        const index = e.target.getAttribute('data-index')

        if (index != this.props.index) {
                this.props.setIndex(index)
        //     this.props.setActiveIndex(+index, this.props.name)
        }
    }

    render() {
        return (
            <div className="state-table-container">
                <table className=''>
                    <tbody>
                    <tr>
                        {this.props.dataFromState.map((item, index) => {
                            return (
                                <td onClick={this.handleClick}
                                    key={index}
                                    data-tooltip={this.props.data[index].text}
                                    data-index={index}
                                    className={`${colors[item.value] || ''} ${ this.props.index == index ? 'active-cell' : ''}`}>
                                    </td>)
                        })}
                    </tr>
                    </tbody>
                </table>
            </div>
        )   }
}

