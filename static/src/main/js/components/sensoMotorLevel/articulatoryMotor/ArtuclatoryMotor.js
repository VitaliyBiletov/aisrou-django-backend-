import React from 'react'
import StatusBar from "../../template/StatusBar";
import Buttons from '../../template/Buttons'
import Text from '../../template/Text'
import Help from '../../template/Help'
import {connect} from 'react-redux'
import {EXERCISES} from "../articulatoryMotor/exercises";

const hints = [
    {id:0, color:'red', text:'Невыполнение упражнения'},
    {id:1, color:'yellow', text:'Выполнение с ошибками - длительный поиск позы, неполный объем движения и т.п.'},
    {id:2, color:'blue', text:'Замедленное и напряженное выполнение'},
    {id:3, color:'green', text:'Правильное выполнение с точным соответствием всех характеристик'},
]

class ArticulatoryMotor extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            helpVisible: false,
            instruction: 'Посмотри на картинки и попробуй повторить упражнения для тренировки губ и языка так же'
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

    render(){
        return(
            <div className='diagnostic-subsection articulatory-motor'>
                <div className="subsection-heading">{ this.props.title }</div>
                <div className="subsection-instruction">
                    <p><b>Инструкция: </b>{this.state.instruction}</p>
                </div>
                <div onClick={this.openHelp} className='help-icon'>?</div>
                <div className='subsection-container'>
                    <StatusBar
                        dataFromState={this.props.values}
                        data={EXERCISES}
                        name='articulatoryMotor'
                        activeIndex={this.props.activeIndex}
                    />
                    <div className="face mt-3">
                        <img src={`/static/src/main/img/faces/${this.props.activeIndex}.jpg`}/>
                    </div>
                </div>
                <Buttons name='articulatoryMotor'/>
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
    const {values, activeIndex} = state.diagnostic.sensoMotorLevel.articulatoryMotor
    return {values, activeIndex}
}

export default connect(mapStateToProps, null)(ArticulatoryMotor)