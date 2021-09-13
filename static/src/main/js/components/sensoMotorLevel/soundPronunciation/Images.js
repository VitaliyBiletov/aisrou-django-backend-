import React from 'react'
import axios from 'axios/index'
import {connect} from 'react-redux'

const soundLocation = {1:'Начало',2:'Середина',3:'Конец'}

class Images extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pathes:[],
        }
    }

    componentDidMount(){
        console.log('mount')
        axios.post(`/load-pictures/${this.props.activeIndex}/`)
            .then((res) => {
                const pathes = res.data.listOfPictures.map(path =>
                    ({
                        positionNumber: parseInt(path.match(/\d+/)),
                        to: `/static/src/main/img/syllables/${this.props.activeIndex}/${path}`
                    }))
                this.setState({pathes: pathes})
        })
    }

    componentDidUpdate(prevProps){
        if (prevProps.activeIndex != this.props.activeIndex){
         axios.post(`/load-pictures/${this.props.activeIndex}/`)
            .then((res) => {
                const pathes = res.data.listOfPictures.map(path =>
                    ({
                        positionNumber: parseInt(path.match(/\d+/)),
                        to: `/static/src/main/img/syllables/${this.props.activeIndex}/${path}`
                    }))
                this.setState({pathes: pathes})
        })
        }

    }

    render(){
        console.log(this.state)
        return(
            <div className="sound-pronunciation-images mt-3">
                {this.state.pathes.map((path, index) => (
                    <div key={index} className="sound-pronunciation-image">
                        <p>{soundLocation[path.positionNumber]}</p>
                        <img src={path.to}/>
                    </div>
                ))}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        activeIndex: state.diagnostic.sensoMotorLevel.soundPronunciation.activeIndex
    }
}


export default connect(mapStateToProps, null)(Images)