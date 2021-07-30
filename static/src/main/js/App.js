import React from 'react'
import ReactDOM from 'react-dom'
import Tabs from './components/Tabs'
import PhonemicPerception from "./components/sensoMotorLevel/phonemicPerception/PhonemicPerception";

class App extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Tabs />
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('diagnostic-container'))