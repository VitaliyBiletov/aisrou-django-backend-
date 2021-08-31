import React from "react"
import {setValuePairSounds} from "../../../redux/actions";
import {connect} from 'react-redux'
import {updateInitialState} from "../../../redux/actions";

const buttons = ['red', 'yellow', 'blue', 'green']

class Buttons extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick = e => {
        e.preventDefault()
        this.props.setValuePairSounds(+e.target.value)
    }

    render() {
        return (
            <div className="row justify-content-center mt-3">
                <div className='buttonsContainer col-auto col-sm-auto col-md-auto'>
                    {buttons.map((button, index) => (
                        <button
                            key={index}
                            className={`scores-btn ${buttons[index]} mx-2`}
                            value={index}
                            onClick={this.handleClick}
                        >{index}</button>
                    ))}
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = {
    setValuePairSounds
};

const mapStateToProps = state => {
    return {
        activeIndex: state.diagnostic.sensoMotorLevel.phonemicPerception.activeIndex
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Buttons)
