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
            index: 0,
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

    setIndex = (index) => {
        this.setState({index: index})
    }

    render(){
        return(
            <React.Fragment>
                <div className="subsection-heading">&#9660;{this.props.title}</div>
                <div className="subsection-instruction">
                    <p><b>Инструкция: </b>{this.props.instruction}</p>
                </div>
                <div onClick={this.openHelp} className='help-icon'>?</div>
                <div className='subsection-container'>
                <StatusBar
                    dataFromState={this.props.values}
                    data={this.props.data}
                    name={this.props.name}
                    setIndex={this.setIndex}
                    index={this.state.index}
                />
                {React.cloneElement(this.props.children, {index: this.state.index})}
                </div>
                <Buttons name={this.props.name} index={this.state.index} setIndex={this.setIndex}/>
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