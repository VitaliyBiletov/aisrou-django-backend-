import React from 'react'
import StateOfFunctions from "../stateOfFunctions/StateOfFunctions"
import SensoMotorLevel from "../sensoMotorLevel/SensoMotorLevel";
import axios from "axios"
import Loader from "../Loader"
import {connect} from 'react-redux'
import {updateInitialState} from "../../redux/actions";
import {store} from '../App'
import {Tabs, TabList, TabPanel, Tab} from "react-tabs";
import {generatedNoty} from '../../functions'

const items = [
    {id: 0, link: 'state-of-function', title: 'Состояние функций', component: <StateOfFunctions name='Состояние функций'/> },
    {id: 1, link: 'senso-motor-level', title: 'Сенсо-моторный уровень', component: <SensoMotorLevel name='Сенсо-моторный уровень'/> },
    {id: 2, link: 'soundPronunciation', title: 'Грамматический строй речи', component: null },
    {id: 3, link: 'vocabulary', title: 'Словарный запас', component: null },
    {id: 4, link: 'coherent-speech', title: 'Связная речь', component: null },
    {id: 5, link: 'language-analysis', title: 'Языковой анализ', component: null },
    {id: 6, link: 'word-formation', title: 'Словообразование', component: null },
    {id: 7, link: 'reading', title: 'Чтение', component: null },
    {id: 8, link: 'writing', title: 'Письмо', component: null },
]

class Diagnostic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            loadingSave: false,
            activeTab: sessionStorage.getItem('activeTab') || 0
        }
    }

    componentDidMount() {
        // console.log('type: ',sessionStorage.getItem('type'))
        if (sessionStorage.getItem('type') =='edit'){
            // setTimeout(()=>{
                const {updateInitialState} = this.props
                updateInitialState(store.getState())
                this.setState({loading: false})
            // }, 3000)

        }
    }

    handleSaveData = (e) => {
        this.setState({loadingSave: true})
        axios.post('/save', {'data': store.getState()})
            .then(()=>{
                // setTimeout(()=>{
                    const successNoty = generatedNoty('success', 'Изменения сохранены!')
                    successNoty.show()
                    this.setState({loadingSave: false})
                // }, 1000)
            })
            .catch(err => {
                const errNoty = generatedNoty('error', err.message)
                errNoty.show()
        })
    }

    handleClickBack = (e) => {
        window.location = '/'
    }

    render() {
        return (
            <div className="diagnostic">
                {this.state.loading ? <Loader/> : (
                <Tabs onSelect={(index) => sessionStorage.setItem('activeTab', index)} defaultIndex={Number(this.state.activeTab)}>
                    <TabList>
                        {items.map(item => (
                            <Tab className='link' key={item.id}>{item.title}</Tab>
                            ))
                        }
                    </TabList>

                    {items.map(item => (
                        <TabPanel key={item.id}>
                            {item.component}
                        </TabPanel>
                    ))
                    }
                </Tabs>
                )
                }
                <div className='fixed-bottom bar-bottom'>
                    <div className='container'>
                        <button className='btn btn-success m-2' onClick={this.handleSaveData}>{ this.state.loadingSave ? 'Идёт сохранение...' : 'Сохранить'}</button>
                        <button className='btn btn-primary m-2' onClick={this.handleClickBack}>Назад</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = {
    updateInitialState
};

export default connect(null, mapDispatchToProps)(Diagnostic)