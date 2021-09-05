import React from 'react'
import {setActiveIndex, setValuePairSounds} from "../../redux/actions";
import {connect} from 'react-redux'

const colors = ['red', 'yellow', 'blue', 'green']

class StatusBar extends React.Component {
    constructor(props) {
        super(props)
    }

    handleClick = e => {
        const index = e.target.getAttribute('data-index')
        if (index != this.props.activeIndex) {
            this.props.setActiveIndex(+index, this.props.name)
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="state-table-container">
                    <table className='state-table'>
                        <tbody>
                        <tr>
                            {this.props.dataFromState.map((item, index) => {
                                return (
                                    <td onClick={this.handleClick}
                                        key={index}
                                        data-tooltip={this.props.data[item.id].text}
                                        data-index={index}
                                        className={`${colors[item.value] || ''} ${ this.props.activeIndex == index ? 'active-cell' : ''}`}>
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

const mapDispatchToProps = {
    setActiveIndex,
}

export default connect(null, mapDispatchToProps)(StatusBar)

