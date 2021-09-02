import React from "react"
import {setActiveIndex, setValuePairSounds} from "../../redux/actions";
import {connect} from 'react-redux'


const buttons = ['red', 'yellow', 'blue', 'green']

class Buttons extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick = e => {
        this.props.setValuePairSounds(+e.target.value, this.props.name)
    }

    render() {
        return (
            <div className="row justify-content-center mt-3">
                <div className='buttons-container col-auto col-sm-auto col-md-auto'>
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
    setValuePairSounds, setActiveIndex,
}

export default connect(null, mapDispatchToProps)(Buttons)