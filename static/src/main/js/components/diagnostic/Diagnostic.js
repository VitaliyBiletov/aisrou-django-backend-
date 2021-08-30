import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink
} from 'react-router-dom'
import StateOfFunctions from "../stateOfFunctions/StateOfFunctions"
import SensoMotorLevel from "../sensoMotorLevel/SensoMotorLevel";
import axios from "axios"
import Loader from "../Loader"
import {connect} from 'react-redux'
import {updateInitialState} from "../../redux/actions";
import {store} from '../App'


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

class Diagnostic extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // window.onbeforeunload = function(e) {
        //   e.returnValue = '';
        // };
        const {updateInitialState} = this.props
        updateInitialState(store.getState())
    }

    handleSaveData = (e) => {
        axios.post('save', {'data': store.getState()})
    }

    handleClickBack = (e) => {
        window.location = '/'
    }

    render() {
        return (
            <React.Fragment>
                <Router>
                    <div className='diagnostic-nav'>
                        {items.map(item => (
                            <NavLink activeClassName="active" key={item.id} to={item.link}>{item.title}</NavLink>
                        ))}
                    </div>
                    {/*/!*{this.state.loading ? (*!/*/}
                    <div className="diagnostic-content">
                        <Switch>
                            <Route path='/diagnostic/state-of-function'>
                                <StateOfFunctions/>
                            </Route>
                            <Route path='/diagnostic/'>
                                <DiagnosticMain/>
                            </Route>
                        </Switch>
                    </div>
                    {/*/!*) : <Loader/>}*!/*/}
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

const mapDispatchToProps = {
    updateInitialState
};

export default connect(null, mapDispatchToProps)(Diagnostic)