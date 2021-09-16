import React from 'react'
import Buttons from '../template/Buttons'
import Help from '../template/Help'
import StatusBar from '../template/StatusBar'
import {connect} from 'react-redux'
import Text from "./Text";

class Subsection extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            helpVisible: false,
            isOpen: null,
            index: 0,
        }
    }

    componentDidMount(){
        this.setState({isOpen: this.props.isOpen})
    }

    componentDidUpdate(prevProps){
        if (prevProps.isOpen !== this.props.isOpen){
            this.setState({isOpen: this.props.isOpen})
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

    handleClick = (e) => {
        this.props.isOpenAll(!this.state.isOpen)
        this.setState({isOpen: !this.state.isOpen})
    }

    render(){
        return(
            <div className='subsection'>
                <div className="subsection-heading">
                    <span className={`visibility-switch ${this.state.isOpen ? 'active' : ''}`} onClick={this.handleClick}>{this.state.isOpen ? "\u25B2" : "\u25BC"}</span>{this.props.title}
                </div>
                {this.state.isOpen ? (<div className='animate__animated animate__fadeIn'>
                <div className="subsection-instruction">
                    <p><b>Инструкция: </b>{this.props.instruction}</p>
                </div>
                <div onClick={this.openHelp} className='help-icon'>?</div>
                <StatusBar
                    dataFromState={this.props.values}
                    data={this.props.data}
                    name={this.props.name}
                    setIndex={this.setIndex}
                    index={this.state.index}
                />
                <div className='subsection-content'>
                    {console.log(this.props.data[this.state.index].text)}
                <Text text={this.props.data[this.state.index].text}/>
                {this.props.children ? React.cloneElement(this.props.children, {index: this.state.index}) : null}
                </div>
                <Buttons name={this.props.name} index={this.state.index} setIndex={this.setIndex}/>
                {this.state.helpVisible && (
                    <Help
                        isVisible={this.state.helpVisible}
                        hints={this.props.hints}
                        closeHelp={this.closeHelp}
                    />
                )}
                </div>) : null}
            </div>
            )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {values, activeIndex} = state.diagnostic.sensoMotorLevel[ownProps.name]
    return {values, activeIndex}
}

export default connect(mapStateToProps, null)(Subsection)