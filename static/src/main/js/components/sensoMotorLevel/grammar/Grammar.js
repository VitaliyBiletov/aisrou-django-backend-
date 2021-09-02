import React from 'react'
import StatusBar from '../../template/StatusBar'
import Buttons from '../../template/Buttons'
import classNames from "classnames/index";
import {setActiveIndex, setValuePairSounds, setAListOfPictures} from "../../../redux/actions";
import {connect} from 'react-redux'
import {SYLLABLES} from './syllables'
import Images from './Images'
import Text from '../../template/Text'
import axios from "axios/index";

class Grammar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            helpVisible: false,
            isClose: false,
            listOfPictures:[]
        }
    }

    componentDidUpdate(){
        console.log('did')
            axios.get(`/diagnostic/load-pictures/${this.props.activeIndex}/`)
            .then(res => {
                this.props.setAListOfPictures(this.props.activeIndex)
            })
            .catch(err => console.error(err))
    }

    render(){
        const classes = classNames({
            'helpContainer': true,
            'animate__animated': true,
            'animate__flipInY': this.state.helpVisible,
            'animate__flipOutY': this.state.isClose,
        })
        return (
            <React.Fragment>
                <div className='section grammar'>
                    <div className="heading">{this.props.name}</div>
                    <div onClick={this.openHelp} className='helpIcon'>?</div>
                    <div className='section-container'>
                        <StatusBar
                            dataFromState={this.props.values}
                            activeIndex={this.props.activeIndex}
                            data={SYLLABLES}
                            setActiveIndex={this.props.setActiveIndex}
                            name='grammar'
                        />
                        <Text
                            activeIndex={this.props.activeIndex}
                            data={SYLLABLES}
                        />
                        <Images listOfPictures={this.state.listOfPictures}/>
                        <Buttons name='grammar'/>
                    </div>
                    {this.state.helpVisible && (
                        <div className={classes}>
                            <Help closeHelp={this.closeHelp}/>
                        </div>
                    )}
                </div>
            </React.Fragment>
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
    setValuePairSounds, setActiveIndex, setAListOfPictures
}

export default connect(mapStateToProps, mapDispatchToProps)(Grammar)