import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import axios from "axios";
import 'animate.css/animate.css'
import CreateDiagnostic from './CreateDiagnostic'

class MainMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listPupils: [],
            selected_pupil:'',
            csrf:'',
        }
    }

    componentDidMount(){
        console.log('did mount')
        axios.post('/list_pupils/')
        .then((response) => {
            const { pupils } = response.data
            this.setState({
                listPupils: pupils,
                selected_pupil: {},
                csrf: response.data['csrf'],
            })
        })
    }

    handleChange = e => {
        this.setState({selected_pupil: this.state.listPupils.find(pupil => pupil.id == e.target.value)})
    }

    render() {
        console.log('state of main menu: ', this.state)
        return (
                <React.Fragment>
                    <div className="form-container">
                    <div className="form text-center col-md-6">
                    <label
                        htmlFor="list_pupils">Выберите учащегося:
                    </label>
                    <select
                        name="pupil_id"
                        id="list_pupils"
                        className='form-control'
                        value={this.state.selected_pupil.id || 'default'}
                        onChange={this.handleChange}
                    >
                        <option value="default" disabled={true} hidden={true}>-------</option>
                        {this.state.listPupils.map(pupil => <option key={pupil.id} value={pupil.id}>{pupil.name}</option>

                        )}
                    </select>
                    </div>
                </div>
                <div className='form-create-diag'>
                    { !$.isEmptyObject(this.state.selected_pupil) ? <CreateDiagnostic selected_pupil={this.state.selected_pupil}/> : null}
                    {/*<ListDiagnostics*/}
                        {/*csrf={this.state.csrf}*/}
                        {/*selectedPupil={this.state.selectedPupil}*/}
                        {/*listDiags={this.state.listDiags}*/}
                        {/*setDiagnosticsList={this.setDiagnosticList}*/}
                    {/*/>*/}
                </div>
                </React.Fragment>
        )
    }
}

function ListDiagnostics(props){
    const [id, setId] = useState(null);

    const handleEditDiagnostic = e => {
        axios.post('diagnostic/edit',{'id': id})
            .then(res => window.location = '/diagnostic')
            .catch(err => console.log(err))
    }

    const handleDeleteDiagnostic = e => {
        const csrfToken = props.csrf
        console.log('d_id: ', id)
        if (!id) {
            console.log('Выберите диагностику')
        } else {
            //Запрос на удаление
            axios({
                method: 'post',
                url: 'diagnostic/delete',
                data: {'diagnostic_id': id, 'pupil_id': props.selectedPupil.id },
                headers: {"X-CSRFToken": csrfToken},
            })
                .then(res => {
                    props.setDiagnosticsList(res.data['diagnostics_list'])
                })
            console.log('Удалить - ', id)
        }
    }

    const handleChange = e => {
        console.log(e.target.value)
        setId(e.target.value)
    }

    return (
        <div className="form-diagnostic">
            <p className='title'>Изменение (удаление) диагностики</p>
            <div className="form-container d-flex flex-column ">
                <p>Список обследований ученика: <b>{props.selectedPupil.pupil}</b></p>
                { props.listDiags.length > 0 ? (
                    <select
                        size={props.listDiags.length}
                        onChange={handleChange}
                    >
                        {props.listDiags.map(diag => <option key={diag.id} value={diag.id}>id: {diag.id} | Дата: {diag.date}</option>)}
                    </select> ) : <p>Обследований нет!</p> }
                <div className="d-flex flex-row btns mt-3">
                    <button
                        className='btn btn-primary mr-2'
                        disabled={ props.listDiags.length <= 0 }
                        onClick={handleEditDiagnostic}
                    >Изменить</button>
                    <button
                        className='btn btn-danger'
                        disabled={ props.listDiags.length <= 0 }
                        onClick={handleDeleteDiagnostic}
                    >Удалить</button>
                </div>
            </div>
        </div>
    )
}

ReactDOM.render(<MainMenu/>, document.getElementById('content'))


