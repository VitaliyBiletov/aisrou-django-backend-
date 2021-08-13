import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink
} from 'react-router-dom'
import StateOfFunctions from "../stateOfFunctions/StateOfFunctions"
import ReactDOM from "react-dom"
import SensoMotorLevel from "../sensoMotorLevel/SensoMotorLevel";
import axios from "axios";

const items = [
                {id: 0, link:'state-of-function', title: 'Состояние функций'},
                {id: 1, link:'senso-motor-level', title: 'Сенсо-моторный уровень'},
                {id: 2, link:'grammar', title: 'Грамматический строй речи'},
                {id: 3, link:'vocabulary', title: 'Словарный запас'},
                {id: 4, link:'coherent-speech', title: 'Связная речь'},
                {id: 5, link:'language-analysis', title: 'Языковой анализ'},
                {id: 6, link:'word-formation', title: 'Словообразование'},
                {id: 7, link:'reading', title: 'Чтение'},
                {id: 8, link:'writing', title: 'Письмо'},
            ]

export default class Diagnostic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stateOfFunctions: {
                hearing:'',vision:'',breath:'',voice:'',
                prosody:'',articulation_apparatus:'',
                motor_skills:'',additional_information:''
            },
            sensoMotorLevel: {
                phonemicPerception: [
                    {id:0, value:''},
                    {id:1, value:''},
                    {id:2, value:''},
                    {id:3, value:''},
                    {id:4, value:''},
                    {id:5, value:''},
                    {id:6, value:''},
                    {id:7, value:''},
                    {id:8, value:''},
                    {id:9, value:''},
                    {id:10, value:''},
                    {id:11, value:''},
                    {id:12, value:''},
                ]
            }
        }
    }

    componentDidMount() {
        axios.post('/diagnostic/load-data',{
            data: this.state
        })
            .then(res => this.setState(res.data.data))
    }

    updateState = (newState) => {
        this.setState(newState)
    }

    getState = (name) => {
        return this.state[name]
    }

    handleSendData = (e) => {
        axios.post('save', {'data': this.state})
    }

    handleChange = (name) => (e) => {
        let copyState = this.state[name]
        copyState[e.target.name] = e.target.value
        this.setState({ [name]: copyState })
    }

    render() {
        console.log(this.state)
        return (
            <React.Fragment>
            <Router>
                    <div className='diagnostic-nav'>
                       {items.map( item => (
                            <NavLink activeClassName="active" key={item.id} to={item.link}>{item.title}</NavLink>
                       ))}
                    </div>
                    <div className="diagnostic-content">
                        <Switch>
                            <Route path='/diagnostic/state-of-function'>
                                <StateOfFunctions
                                    getState={this.state.stateOfFunctions}
                                    updateState={this.updateState}
                                    onChange={this.handleChange}
                                    name='Состояние функций'/>
                            </Route>
                            <Route path='/diagnostic/senso-motor-level'>
                                <SensoMotorLevel
                                    getState={this.getState}
                                    updateState={this.updateState}
                                    name='Сенсо-моторный уровень'/>
                            </Route>
                            <Route path='/diagnostic/'>
                                <DiagnosticMain />
                            </Route>
                        </Switch>
                    </div>
            </Router>
                <div className='fixed-bottom bar-bottom'>
                    <div className='container'>
                        <button className='btn btn-primary m-2' onClick={this.handleSendData}>Сохранить</button>
                        <button className='btn btn-primary m-2'>Назад</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

function DiagnosticMain(props){
    return (<p>Главная страница</p>)
}

ReactDOM.render(<Diagnostic />, document.getElementById('diagnostic-container'))