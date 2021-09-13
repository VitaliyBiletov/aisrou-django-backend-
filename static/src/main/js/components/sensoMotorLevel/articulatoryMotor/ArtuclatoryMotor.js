import React from 'react'
import {connect} from 'react-redux'

class ArticulatoryMotor extends React.Component {
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
            <div className="face mt-3">
                <img src={`/static/src/main/img/faces/${this.props.activeIndex}.jpg`}/>
            </div>
        )
    }

}

const mapStateToProps = state => {
    const {values, activeIndex} = state.diagnostic.sensoMotorLevel.articulatoryMotor
    return {values, activeIndex}
}

export default connect(mapStateToProps, null)(ArticulatoryMotor)