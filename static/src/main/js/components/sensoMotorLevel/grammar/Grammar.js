import React from 'react'
import StatusBar from '../../template/StatusBar'
import Buttons from '../../template/Buttons'
import Help from '../../template/Help'
import classNames from "classnames/index";
import {setActiveIndex, setValuePairSounds} from "../../../redux/actions";
import {connect} from 'react-redux'
import {SYLLABLES} from './syllables'
import Images from './Images'

const hints = [
    {id:0, color:'red', text:'Звук нарушен'},
    {id:1, color:'yellow', text:'Звук в стадии автоматизации'},
    {id:2, color:'blue', text:'Звук в стадии дифференциации'},
    {id:3, color:'green', text:'Норма'},
]

class Grammar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            helpVisible: false,
            isClose: false,
            listOfPictures:['1.jpg','2.jpg','3.jpg'],
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
        // console.log(this.state.listOfPictures)
        const classes = classNames({
            'helpContainer': true,
            'animate__animated': true,
            'animate__flipInY': this.state.helpVisible,
            'animate__flipOutY': this.state.isClose,
        })
        return (
            <div className='diagnostic-subsection grammar'>
                <div className="subsection-heading">{this.props.name}</div>
                <div onClick={this.openHelp} className='help-icon'>?</div>
                <div className='subsection-container'>
                    <StatusBar
                        dataFromState={this.props.values}
                        activeIndex={this.props.activeIndex}
                        data={SYLLABLES}
                        setActiveIndex={this.props.setActiveIndex}
                        name='grammar'
                    />
                    {/*<Text*/}
                        {/*activeIndex={this.props.activeIndex}*/}
                        {/*data={SYLLABLES}*/}
                    {/*/>*/}
                    <Images
                        listOfPictures={this.state.listOfPictures}
                        activeIndex={this.props.activeIndex}/>
                    <Buttons name='grammar'/>
                </div>
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
    return {
        values: state.diagnostic.sensoMotorLevel.grammar.values,
        activeIndex: state.diagnostic.sensoMotorLevel.grammar.activeIndex
    }
}

const mapDispatchToProps = {
    setValuePairSounds, setActiveIndex
}

export default connect(mapStateToProps, mapDispatchToProps)(Grammar)