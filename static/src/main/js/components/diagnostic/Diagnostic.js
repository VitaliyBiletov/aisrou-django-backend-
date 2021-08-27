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
import $ from 'jquery'
import Loader from "../Loader";

const items = [
    {id: 0, link: 'state-of-function', title: 'Состояние функций'},
    {id: 1, link: 'senso-motor-level', title: 'Сенсо-моторный уровень'},
    {id: 2, link: 'grammar', title: 'Грамматический строй речи'},
    {id: 3, link: 'vocabulary', title: 'Словарный запас'},
    {id: 4, link: 'coherent-speech', title: 'Связная речь'},
    {id: 5, link: 'language-analysis', title: 'Языковой анализ'},
    {id: 6, link: 'word-formation', title: 'Словообразование'},
    {id: 7, link: 'reading', title: 'Чтение'},
    {id: 8, link: 'writing', title: 'Письмо'},
]

export default class Diagnostic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stateOfFunctions: {
                hearing: '', vision: '', breath: '', voice: '',
                prosody: '', articulation_apparatus: '',
                motor_skills: '', additional_information: ''
            },
            sensoMotorLevel: {
                phonemicPerception: [
                    {id: 0, value: null},
                    {id: 1, value: null},
                    {id: 2, value: null},
                    {id: 3, value: null},
                    {id: 4, value: null},
                    {id: 5, value: null},
                    {id: 6, value: null},
                    {id: 7, value: null},
                    {id: 8, value: null},
                    {id: 9, value: null},
                    {id: 10, value: null},
                    {id: 11, value: null},
                    {id: 12, value: null},
                ]
            },
            loading: false,
        }
    }

    componentDidMount() {
        // window.onbeforeunload = function(e) {
        //   e.returnValue = '';
        // };

        axios.post('/diagnostic/load-data', {
            data: this.state
        })
            .then(res => {
                this.setState({...res.data.data, loading: true})
            })
    }

    updateState = (newState) => {
        this.setState(newState)
    }

    getState = (name) => {
        return this.state[name]
    }

    handleSaveData = (e) => {
        axios.post('save', {'data': this.state})
    }

    handleChange = (name) => (e) => {
        let copyState = this.state[name]
        copyState[e.target.name] = e.target.value
        this.setState({[name]: copyState})
    }

    handleClickBack = (e) => {
        window.location = '/'
    }

    render() {
        console.log(this.state)
        return (
            <React.Fragment>
                <Router>
                    <div className='diagnostic-nav'>
                        {items.map(item => (
                            <NavLink activeClassName="active" key={item.id} to={item.link}>{item.title}</NavLink>
                        ))}
                    </div>
                    {this.state.loading ? (
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
                                        state={this.state.sensoMotorLevel}
                                        updateState={this.updateState}
                                        name='Сенсо-моторный уровень'/>
                                </Route>
                                <Route path='/diagnostic/'>
                                    <DiagnosticMain/>
                                </Route>
                            </Switch>
                        </div>) : <Loader/>}
                </Router>
                <div className='fixed-bottom bar-bottom'>
                    <div className='container'>
                        <button className='btn btn-primary m-2' onClick={this.handleSaveData}>Сохранить</button>
                        <button className='btn btn-primary m-2' onClick={this.handleClickBack}>Назад</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

function DiagnosticMain(props) {
    return (<p>Главная страница</p>)
}

ReactDOM.render(<Diagnostic/>, document.getElementById('diagnostic-container'))