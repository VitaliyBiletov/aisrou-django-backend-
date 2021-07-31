import React from "react"

export default class Buttons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonsInfo: [
                {id: 0, value: 0, colorName:'red', hint: 'Отказ от выполнения, полная невозможность воспроизведения пробы'},
                {id: 1, value: 1, colorName:'yellow', hint: 'Неточное воспроизведение обоих членов пары с перестановкой слогов, их заменой и пропусками' },
                {id: 2, value: 2, colorName:'blue', hint: 'Первый член воспроизводится правильно, второй уподобляется первому (ба-па-ба-па)' },
                {id: 3, value: 3, colorName:'green', hint: 'Точное и правильное воспроизведение в темпе предъявления' },
            ]
        }
        this.setValue = this.props.setValue
    }

    onClick = e => {
       e.preventDefault()
       const [{colorName}] = this.state.buttonsInfo.filter(b => b.value == e.target.value)
       this.setValue(e.target.value, colorName)
    }

    render() {
        return (
            <div className="row justify-content-center mt-3">
                <div className='buttonsContainer col-auto col-sm-auto col-md-auto'>
                    { this.state.buttonsInfo.map(button=>(
                        <button
                            key={button.id}
                            className={`scores-btn ${button.colorName} mx-2`}
                            data-tooltip={button.hint}
                            value={button.value}
                            onClick={this.onClick}
                        >{button.value}</button>
                    ))}
                </div>
            </div>
        );
    }
}