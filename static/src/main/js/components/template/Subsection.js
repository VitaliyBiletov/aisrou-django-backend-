import React from 'react'
import Buttons from '../template/Buttons'
import Help from '../template/Help'
import StatusBar from '../template/StatusBar'
import {connect} from 'react-redux'

class Subsection extends React.Component{
    constructor(props){
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

    render(){
        return(
            <React.Fragment>
                <div className="subsection-heading">{this.props.title}</div>
                <div className="subsection-instruction">
                    <p><b>Инструкция: </b>{this.props.instruction}</p>
                </div>
                <div onClick={this.openHelp} className='help-icon'>?</div>
                <div className='subsection-container'>
                <StatusBar
                    dataFromState={this.props.values}
                    data={this.props.data}
                    name={this.props.name}
                    activeIndex={this.props.activeIndex}
                />
                {this.props.children}
                </div>
                <Buttons name={this.props.name}/>
                {this.state.helpVisible && (
                    <Help
                        isVisible={this.state.helpVisible}
                        hints={this.props.hints}
                        closeHelp={this.closeHelp}
                    />
                )}
            </React.Fragment>
            )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {values, activeIndex} = state.diagnostic.sensoMotorLevel[ownProps.name]
    return {values, activeIndex}
}

export default connect(mapStateToProps, null)(Subsection)