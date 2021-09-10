import React from 'react'
import axios from 'axios/index'

const soundLocation = ['Начало','Середина','Конец']

export default class Images extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pictures: []
        }
    }

    componentDidMount(){
        axios.post(`/load-pictures/${this.props.activeIndex}/`)
            .then((res) => {
                this.setState({pictures: res.data.listOfPictures})
        })
    }

    componentDidUpdate(prevProps){
        if (prevProps.activeIndex != this.props.activeIndex){
         axios.post(`/load-pictures/${this.props.activeIndex}/`)
            .then((res) => {
                this.setState({pictures: res.data.listOfPictures})
        })
        }

    }

    render(){
        return(
            <div className="sound-pronunciation-images mt-3">
                {this.state.pictures.map((pic, index) => (
                    <div key={index} className="sound-pronunciation-image">
                        <p>{soundLocation[+pic[0]-1]}</p>
                        <img src={`/static/src/main/img/syllables/${this.props.activeIndex}/${pic}`}/>
                    </div>
                ))}
            </div>
        )
    }
}