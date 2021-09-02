import React from 'react'
import StatusBar from '../phonemicPerception/StatusBar'
import Buttons from '../phonemicPerception/Buttons'
import classNames from "classnames/index";


export default class Grammar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            helpVisible: false,
            isClose: false,
        }

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
                <div className='phonemic-perception'>
                    <div className="heading">Грамматика</div>
                    <div onClick={this.openHelp} className='helpIcon'>?</div>
                    <div className='grammar-container'>
                        <StatusBar/>

                        <Buttons />
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