import React from 'react'
import StatusBar from "../../template/StatusBar";
import Buttons from '../../template/Buttons'
import Text from '../../template/Text'
import Help from '../../template/Help'
import 'animate.css/animate.css'
import classNames from 'classnames'
import {connect} from 'react-redux'
import {setActiveIndex, setValuePairSounds} from "../../../redux/actions";
import {PAIRS_OF_SOUNDS} from "./pairsOfSounds";
import _ from 'lodash'

const colors = ['red', 'yellow', 'blue', 'green']

const hints = [
    {id:0, color:'red', text:'Отказ от выполнения, полная невозможность воспроизведения пробы'},
    {id:1, color:'yellow', text:'Неточное воспроизведение обоих членов пары с перестановкой слогов, их заменой и пропусками'},
    {id:2, color:'blue', text:'Первый член воспроизводится правильно, второй уподобляется первому (ба-па-ба-па)'},
    {id:3, color:'green', text:'Точное и правильное воспроизведение в темпе предъявления'},
]

class PhonemicPerception extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            helpVisible: false,
        }
    }

    openHelp = e => {
        this.setState({
            helpVisible: true,
        })
    }

    closeHelp = e => {
        this.setState({helpVisible: false})
    }

    render() {
        return (
                <div className='diagnostic-subsection phonemic-perception'>
                    <div className="subsection-heading">{ this.props.title }</div>
                    <div className="subsection-instruction">
                        <p><b>Инструкция: </b>Слушай внимательно и повторяй за мной слоги как можно точнее</p>
                    </div>
                    <div onClick={this.openHelp} className='help-icon'>?</div>
                    <div className='subsection-container'>
                        <StatusBar
                            dataFromState={this.props.values}
                            data={PAIRS_OF_SOUNDS}
                            name='phonemicPerception'
                            activeIndex={this.props.activeIndex}
                        />

                        <Text
                            activeIndex={this.props.activeIndex}
                            data={PAIRS_OF_SOUNDS}
                        />
                    </div>
                    <Buttons name='phonemicPerception'/>
                    {this.state.helpVisible && (
                        <Help
                            isVisible={this.state.helpVisible}
                            hints={hints}
                            closeHelp={this.closeHelp}
                        />
                    )}
                </div>
        )
    }
}

const mapStateToProps = state => {
    const {values, activeIndex} = state.diagnostic.sensoMotorLevel.phonemicPerception
    return {values, activeIndex}
}

export default connect(mapStateToProps, null)(PhonemicPerception)