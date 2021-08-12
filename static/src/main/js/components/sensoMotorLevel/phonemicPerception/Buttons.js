import React from "react"
import $ from "jquery";
import classNames from 'classnames'

const colors = ['red', 'yellow', 'blue', 'green']

export default class Buttons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonsInfo: [
                { value: 0 },
                { value: 1 },
                { value: 2 },
                { value: 3 },
            ],
        }
        this.setValue = this.props.setValue
    }

    onClick = e => {
        e.preventDefault()
        $('#text').animate({
            opacity: 0,
            marginLeft: -150
        }, 100, () => {
            this.setValue(e.target.value)
            $('#text').css({
                marginLeft: 150
            }).animate({
                opacity: 1,
                marginLeft: 0
            }, 100)
        })
    }

    render() {
        return (
            <div className="row justify-content-center mt-3">
                <div className='buttonsContainer col-auto col-sm-auto col-md-auto'>
                    { this.state.buttonsInfo.map(button=>(
                        <button
                            key={button.value}
                            className={`scores-btn ${colors[button.value]} mx-2`}
                            value={button.value}
                            onClick={this.onClick}
                        >{button.value}</button>
                    ))}
                </div>
            </div>
        );
    }
}