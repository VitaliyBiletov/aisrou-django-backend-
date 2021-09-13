import React from 'react'
import axios from "axios/index";
import Loader from '../../Loader'

const soundLocation = {1:'Начало',2:'Середина',3:'Конец'}

export default class SoundPronunciation extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            pathes:[],
            isLoading: true,
        }
    }

    componentDidMount(e){
        this.setState({isLoading: true})
        // setTimeout(()=>{
        axios.post(`/load-pictures/${this.props.index}/`)
            .then((res)=>{
                const pathes = res.data.listOfPictures.map(pic => `/static/src/main/img/syllables/${this.props.index}/${pic}`)
                this.setState({pathes: pathes, isLoading: false})
            })
        // }, 1000)

    }

    componentWillUpdate(nextProps){
        if (nextProps.index !== this.props.index){
            console.log('Внутри условия')
            this.setState({isLoading: true})
            // setTimeout(()=>{
            axios.post(`/load-pictures/${nextProps.index}/`)
            .then((res)=>{
                const pathes = res.data.listOfPictures.map(pic => `/static/src/main/img/syllables/${this.props.index}/${pic}`)
                this.setState({pathes: pathes, isLoading: false})
            })
            // },1000)

        }

    }

    render(){
        console.log('render:', this.state.isLoading)
        return(
            <div className='subsection-container'>
                <div style={{height:'250px'}} className="sound-pronunciation-images mt-3">
                    {this.state.isLoading ? <Loader/> : this.state.pathes.map((path, index) => (
                        <div key={index} className="sound-pronunciation-image animate__animated animate__fadeIn">
                            <p>{soundLocation[parseInt(path.match(/\d+\./))]}</p>
                            <img src={path} onError={(e) => console.log(e)}/>
                        </div>))
                    }
                </div>
            </div>
        )
    }
}