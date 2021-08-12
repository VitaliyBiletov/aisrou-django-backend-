import React from 'react'
import ReactDOM from 'react-dom'
import axios from "axios";
import 'animate.css/animate.css'

class MainMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listPupils: [],
            selectedPupil:{},
            listDiags:[],
            date: {
                value: null,
                isInvalid: false
            },
        }
    }

    componentDidMount= () => {
        axios.post('/list_pupils/')
        .then((response) => {
            this.setState({
                listPupils: response.data.pupils,
                selectedPupil: response.data.pupils[0]
            })
            this.getList(this.state.selectedPupil.id)
        })
    }

    handleClick = (e) => {
        e.preventDefault()
        const { date } = this.state
        if (!date.value){
            this.setState({date:
                    {value:null, isInvalid: true}
            })
        } else {
            this.setState({date:
                    {...this.state.date, isInvalid: false}
            })
            axios.post('diagnostics/create',
            {
                'selected_pupil_id': this.state.selectedPupil,
                'date': this.state.date,
            })
            .then((res) => {
               window.location = '/diagnostic'
            }
                // ReactDOM.render(<Diagnostic/>, document.getElementById('content'))
            )
        }
    }

    handleChange = (e) => {
        const listPupils = this.state.listPupils
        const selectedPupil = listPupils.find(pupil => pupil.id == e.target.value)
        this.setState(
        {
                selectedPupil: selectedPupil,
            }
        )
        this.getList(selectedPupil.id)
    }

    getList = (id) => {
        console.log(id)
        axios.post('/list_diags/', {
            selected_pupil_id: id
        } )
            .then((response) => {
                console.log(response)
            this.setState({listDiags: response.data.list_diags})
        })
    }

    handleChangeDate = (e) => {
        this.setState({date: {value: e.target.value, isInvalid: false}})
    }

    render() {
        return (
                <div className='form-create-diag'>
                    <CreateDiagnostic
                        selectedPupil={this.state.selectedPupil}
                        date={this.state.date}
                        listPupils={this.state.listPupils}
                        handleClick={this.handleClick}
                        handleChange={this.handleChange}
                        handleChangeDate={this.handleChangeDate}
                    />
                    <ListDiagnostics selectedPupil={this.state.selectedPupil} listDiags={this.state.listDiags}/>
                </div>
        )
    }
}

function CreateDiagnostic(props){
    return (
        <div className="form-diagnostic">
            <p className='title'>Создание диагностики</p>
            <div className="form-container">
                <div className="form-group">
                    <label
                        htmlFor="list_pupils">Выберите учащегося:
                    </label>
                    <select
                        name="pupil_id"
                        id="list_pupils"
                        className='form-control'
                        value={ props.selectedPupil.id }
                        onChange={ props.handleChange }>
                        {props.listPupils.map((pupil) => (
                        <option value={pupil.id} key={pupil.id}>{pupil.pupil}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label
                        htmlFor="date_of_creation">
                        Дата заполнения:
                    </label>
                    <input
                        id="date_of_creation"
                        name="date_of_creation"
                        type="date"
                        className={props.date.isInvalid ? 'form-control is-invalid':'form-control'}
                        onChange={props.handleChangeDate}/>
                </div>
                <button
                    className="btn btn-success menu-btn"
                    onClick={ props.handleClick }
                    id="create-diag">
                    Создать
                </button>
            </div>
        </div>

    )
}

function ListDiagnostics(props){
    return (
        <div className="form-diagnostic">
            <p className='title'>Изменение (удаление) диагностики</p>
            <div className="form-container d-flex flex-column ">
                <p>Список обследований ученика: <b>{props.selectedPupil.pupil}</b></p>
                { props.listDiags.length > 0 ? (
                    <select size={props.listDiags.length}>
                        {props.listDiags.map(diag => <option key={diag.id} value={diag.id}>Дата: {diag.date}</option>)}
                    </select> ) : <p>Обследований нет!</p> }
                <div className="d-flex flex-row btns mt-3">
                    <button className='btn btn-primary mr-2' disabled={props.listDiags.length > 0 ? false: true}>Изменить</button>
                    <button className='btn btn-danger' disabled={props.listDiags.length > 0 ? false: true}>Удалить</button>
                </div>
            </div>
        </div>
    )
}

ReactDOM.render(<MainMenu/>, document.getElementById('content'))


