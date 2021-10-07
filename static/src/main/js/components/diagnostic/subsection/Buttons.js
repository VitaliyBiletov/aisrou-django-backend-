import React from "react"
import {setActiveIndex, setValueToState} from "../../../redux/actions";
import {connect} from 'react-redux'


const colors = ['red', 'yellow', 'blue', 'green']

class Buttons extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick = e => {
        const {index, name, values, setIndex, setValueToState} = this.props
        setValueToState(+e.target.value, name, index)
        if (Number(index) + 1 < values.length){
            console.log(Number(index) + 1)
            setIndex(Number(index) + 1)
        } else {
            setIndex(0)
        }
    }

    render() {
        return (
            <div className="scores-buttons">
                <div className='score-buttons-container'>
                    {colors.map((button, index) => (
                        <button
                            key={index}
                            className={`${colors[index]}`}
                            value={index}
                            onClick={this.handleClick}
                        /> //{index}
                    ))}
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = {
    setValueToState,
}

const mapStateToProps = (state, ownProps) => {
    const {values} = state.diagnostic.sensoMotorLevel[ownProps.name]
    return {values}
}

export default connect(mapStateToProps, mapDispatchToProps)(Buttons)

