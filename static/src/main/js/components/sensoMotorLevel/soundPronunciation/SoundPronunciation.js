import React from 'react'
import axios from "axios/index";
import Loader from '../../Loader'

const soundLocation = {1:'Начало',2:'Середина',3:'Конец'}

export default class SoundPronunciation extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            pathes:[],
            isLoading: false,
        }
    }

    componentDidMount(e){
        this.setState({isLoading: true})
        // setTimeout(()=>{
        axios.post(`/load-pictures/${this.props.index}/`)
            .then((res)=>{
                const pathes = res.data.listOfPictures.map(pic => `/static/src/main/img/syllables/${this.props.index}/${pic}`)
                this.setState({isLoading: false, pathes: pathes})
            })
        // }, 1000)

    }

    componentDidUpdate(prevProps){
        if (prevProps.index !== this.props.index){
            this.setState({isLoading: true})
            // setTimeout(()=>{
            axios.post(`/load-pictures/${this.props.index}/`)
            .then((res)=>{

                const pathes = res.data.listOfPictures.map(pic => `/static/src/main/img/syllables/${this.props.index}/${pic}`)
                this.setState({isLoading: false, pathes: pathes})
            })
            // },1000)

        }

    }

    render(){
        return(
            <div className='subsection-container'>
                <div className="sound-pronunciation-images mt-3">
                    {this.state.isLoading ? null : this.state.pathes.map((path, index) => (
                        <div key={index} className="sound-pronunciation-image">
                            <p>{soundLocation[parseInt(path.match(/\d+\./))]}</p>
                            <img src={path}/>
                        </div>))
                    }
                </div>
            </div>
        )
    }
}