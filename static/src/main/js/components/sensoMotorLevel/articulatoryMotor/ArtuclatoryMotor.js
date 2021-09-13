import React from 'react'
import {connect} from 'react-redux'

export default class ArticulatoryMotor extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="face mt-3">
                <img src={`/static/src/main/img/faces/${this.props.index}.jpg`}/>
            </div>
        )
    }

}