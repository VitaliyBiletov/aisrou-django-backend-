import React from 'react'
import axios from "axios/index";
import Loader from './Loader'


export default class DiagnosticEditor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listOfDiagnostics: [],
            diagnosticId: undefined,
            loading: true
        }
    }

    componentDidMount() {
        const {selected_pupil} = this.props
        this.getListOfDiagnostics(selected_pupil)
    }

    componentDidUpdate(prevProps) {
        if (this.props.selected_pupil.id !== prevProps.selected_pupil.id) {
            const {selected_pupil} = this.props
            this.setState({listOfDiagnostics: [], loading: true})
            this.getListOfDiagnostics(selected_pupil)
        }
    }

    getListOfDiagnostics = (selected_pupil) => {
        axios.post('list_diags/', {'selected_pupil_id': selected_pupil.id})
            .then(res => {
                const {data} = res
                if (data.list_of_diagnostics.length == 1) {

                }
                this.setState({listOfDiagnostics: data.list_of_diagnostics, loading: false})
            })
            .catch(err => console.log(err))
    }

    handleEditDiagnostic = e => {
        const {diagnosticId} = this.state
        console.log(diagnosticId)
        if (!diagnosticId) {
            console.log('Выберите диагностику')
        }
        else {
            axios.post('diagnostic/edit', {'id': diagnosticId})
                .then(res => window.location = '/diagnostic')
                .catch(err => console.log(err))
        }
    }

    handleDeleteDiagnostic = e => {
        const csrfToken = this.props.csrf
        const {diagnosticId} = this.state
        if (confirm('Вы действительно хотите удалить обследование?')) {
            if (!diagnosticId) {
                console.log('Выберите диагностику')
            } else {
                //Запрос на удаление
                axios({
                    method: 'post',
                    url: 'diagnostic/delete',
                    data: {'diagnostic_id': diagnosticId, 'pupil_id': this.props.selected_pupil.id},
                    headers: {"X-CSRFToken": csrfToken},
                })
                    .then(res => {
                        const {data} = res
                        console.log(data)
                        this.setState({
                            listOfDiagnostics: data.diagnostics_list,
                        })
                    })
            }
        }
    }

    handleClickTr = e => {
        this.setState({diagnosticId: Number($(e.target).closest('tr').attr('data-value'))})
    }


    render() {
        console.log('state of change diagnostic', this.state)
        const {listOfDiagnostics, diagnosticId} = this.state;
        return (
            <React.Fragment>
                { this.state.loading && <Loader /> }
                { this.state.listOfDiagnostics.length ? (
                <div className="form-diagnostic diagnostic-editor">
                    <p className='title'>Список обследований</p>
                    <div className="form-container d-flex flex-column ">
                        <ListOfDiagnostics
                            list = { listOfDiagnostics }
                            handleChangeDiagnostic = { this.handleChangeDiagnostic }
                            handleCheckBoxChange = { this.handleCheckBoxChange }
                            handleClickTr={ this.handleClickTr }
                            value = { diagnosticId }
                        />
                        <div className="d-flex flex-row btns mt-3">
                            <button
                                className='btn btn-primary mr-2'
                                disabled={ listOfDiagnostics.length <= 0 }
                                onClick={this.handleEditDiagnostic}
                            >Изменить</button>
                            <button
                                className='btn btn-danger'
                                disabled={ listOfDiagnostics.length <= 0 }
                                onClick={this.handleDeleteDiagnostic}
                            >Удалить</button>
                        </div>
                    </div>
                </div>) : ( this.state.loading ? null : <div
                    className="mx-auto text-center alert alert-warning"
                    role="alert"
                    style={{width: '500px'}}>
                    Список обследований пуст!
                </div>)}
            </React.Fragment>
        )
    }
}

function ListOfDiagnostics(props){
    const { list, value } = props
        return (
            <table className="table table-sm">
                <thead>
                    <tr>
                     <th>№</th>
                     <th>id</th>
                     <th>Дата</th>
                    </tr>
                </thead>
                <tbody>{
                    list.map(({id, date}, index) =>
                        <tr
                            onClick={props.handleClickTr}
                            data-value={id}
                            key={id}
                            style={{cursor: 'pointer'}}
                            className={`diagnostic-editor-tr ${id == value ? 'table-primary': null}`}>
                            <th>{ index }</th>
                            <td>{ id }</td>
                            <td>{ date }</td>
                        </tr>)
                }</tbody>
            </table>
        )
}