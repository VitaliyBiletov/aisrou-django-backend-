import React from 'react'
import {connect} from 'react-redux'
import axios from "axios/index";


const soundLocation = ['Начало','Середина','Конец']

export default class Images extends React.Component {
    constructor(props) {
        super(props)
    }

    render(){
        return(
            <div className="grammar-images mt-3">
                {this.props.listOfPictures.map((pic, index) => (
                    <div key={index} className="grammar-image">
                        <p>{soundLocation[+pic[0]-1]}</p>
                        <img src={`/static/src/main/img/syllables/${this.props.activeIndex}/${pic}`}/>
                    </div>
                ))}
            </div>
        )
    }
}