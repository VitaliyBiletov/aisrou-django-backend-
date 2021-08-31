import React from 'react'
import StatusBar from "./StatusBar";
import Buttons from './Buttons'
import Text from './Text'
import Help from './Help'
import 'animate.css/animate.css'
import classNames from 'classnames'
import {pairsOfSounds} from './pairsOfSounds.json'
import {connect} from 'react-redux'

const colors = ['red', 'yellow', 'blue', 'green']

export default class PhonemicPerception extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            helpVisible: false,
            isClose: false,
        }
    }

    openHelp = e => {
        this.setState({
            helpVisible: true,
            isClose: false,
        })
    }

    closeHelp = e => {
        this.setState({
            isClose: true,
        })
        setTimeout(() => this.setState({helpVisible: false}), 800)
    }

    render() {
        const classes = classNames({
            'helpContainer': true,
            'animate__animated': true,
            'animate__flipInY': this.state.helpVisible,
            'animate__flipOutY': this.state.isClose,
        })

        const activePair = pairsOfSounds[this.state.activeIndex]

        return (
            <div className='phonemic-perception'>
                <div className="heading">Фонематическое восприятие</div>
                <div onClick={this.openHelp} className='helpIcon'>?</div>
                <div className='phonemic-perception-container'>
                    <StatusBar/>
                               {/*setActivePair={this.setActivePair}*/}
                               {/*activeIndex={this.state.activeIndex}/>*/}
                    {/*<Text activePair={activePair}/>*/}
                    {/*<Buttons />*/}
                </div>
                {this.state.helpVisible && (
                    <div className={classes}>
                        <Help closeHelp={this.closeHelp}/>
                    </div>
                )}
            </div>
        )
    }
}
//
// const mapStateToProps = state => {
//     return {
//         pairsOfSounds: state.diagnostic.sensoMotorLevel.phonemicPerception.pairsOfSounds
//     }
// }
//
// export default connect(mapStateToProps, null)(PhonemicPerception)