import React from "react"
import {setActiveIndex, setValueToState} from "../../redux/actions";
import {connect} from 'react-redux'


const colors = ['red', 'yellow', 'blue', 'green']

class Buttons extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick = e => {
        this.props.setValueToState(+e.target.value, this.props.name)
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
    setValueToState, setActiveIndex,
}

export default connect(null, mapDispatchToProps)(Buttons)