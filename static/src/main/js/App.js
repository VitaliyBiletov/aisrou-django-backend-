import React from 'react'
import ReactDOM from 'react-dom'
import Tabs from './components/Tabs'
import PhonemicPerception from "./components/sensoMotorLevel/phonemicPerception/PhonemicPerception";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            stateOfFunctions: {
                'hearing':'','vision':'','breath':'','voice':'',
                'prosody':'','articulation_apparatus':'',
                'motor_skills':'','additional_information':''
            }
        }
    }

    showState = e => {
        e.preventDefault()
        console.log(this.state)
    }

    render() {
        return (
            <React.Fragment>
                <Tabs/>
                <button className='btn btn-secondary' onClick={showState}>Отправить</button>
            </React.Fragment>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('diagnostic-container'))