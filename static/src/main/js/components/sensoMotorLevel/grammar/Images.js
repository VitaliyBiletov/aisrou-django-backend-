import React from 'react'
import {connect} from 'react-redux'

const soundLocation = ['Начало','Середина','Конец']

class Images extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        console.log('did')
    }

    render(){
        return(
            <div className="grammar-images">
                {this.props.listOfPictures.map((pic, index) => (
                    <div key={index} className="grammar-image">
                        {console.log(pic)}
                        <p>{soundLocation[+pic[0]-1]}</p>
                        <img src={`/static/src/main/img/syllables/${this.props.activeIndex}/${pic}`}/>
                    </div>
                ))}
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {listOfPictures, activeIndex} = state.diagnostic.sensoMotorLevel.grammar
    return {listOfPictures, activeIndex}
}

export default connect(mapStateToProps, null)(Images)