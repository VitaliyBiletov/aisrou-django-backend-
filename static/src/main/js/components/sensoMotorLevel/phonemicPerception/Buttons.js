import React from "react"
import $ from "jquery";
import classNames from 'classnames'


export default class Buttons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonsInfo: [
                {id: 0, value: 0, colorName:'red' },
                {id: 1, value: 1, colorName:'yellow' },
                {id: 2, value: 2, colorName:'blue' },
                {id: 3, value: 3, colorName:'green' },
            ],
        }
        this.setValue = this.props.setValue
    }

    onClick = e => {
        e.preventDefault()
        const [{colorName}] = this.state.buttonsInfo.filter(b => b.value == e.target.value)
        $('#text').animate({
            opacity: 0,
            marginLeft: -150
        }, 100, () => {
            this.setValue(e.target.value, colorName)
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
                            key={button.id}
                            className={`scores-btn ${button.colorName} mx-2`}
                            value={button.value}
                            onClick={this.onClick}
                        >{button.value}</button>
                    ))}
                </div>
            </div>
        );
    }
}