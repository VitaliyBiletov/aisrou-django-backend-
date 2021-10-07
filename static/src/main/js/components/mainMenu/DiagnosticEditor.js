import React from 'react'
import axios from "axios/index";
import Loader from '../Loader'


export default class DiagnosticEditor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listOfDiagnostics: [],
            diagnosticId: null,
            loading: true
        }
    }

    componentDidMount() {
        const {selected_pupil} = this.props
        this.getListOfDiagnostics(selected_pupil)
        $(document).mouseup((e) => {
            if (this.state.diagnosticId !== null){
                const div = $('.section-list-of-diagnostics')
                if (!div.is(e.target) && div.has(e.target).length === 0){
                    this.setState({diagnosticId: null})
                }
            }
        })
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
                // setTimeout(()=>{
                    this.setState({listOfDiagnostics: data.list_of_diagnostics, loading: false})
                // },2000)

            })
            .catch(err => console.log(err))
    }

    handleEditDiagnostic = e => {
        const data = new FormData()
        data.append('pupil_id', this.props.selected_pupil.id)
        data.append('diagnostic_id', this.state.diagnosticId)

        axios({
            url: '/edit/',
            method: 'POST',
            data: data
        }, ).then(res => {
            window.location = `/diagnostic/`
        })
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
                        this.setState({
                            listOfDiagnostics: data.diagnostics_list,
                            diagnosticId: null,
                        })
                    })
            }
        }
    }

    handleClickTr = e => {
        this.setState({diagnosticId: Number($(e.target).closest('tr').attr('data-value'))})
    }

    handleDoubleClickTr = e => {
        this.setState({diagnosticId: Number($(e.target).closest('tr').attr('data-value'))})
        this.handleEditDiagnostic()
    }


    render() {
        const {listOfDiagnostics, diagnosticId} = this.state;
        console.log(diagnosticId)
        return (
            <div className='section-list-of-diagnostics'>
                {this.state.loading && <Loader />}
                {this.state.listOfDiagnostics.length ? (
                <div className="section-content">
                    <div className='heading'>Список обследований</div>
                    <div className="list-of-diagnostics-container">
                        <ListOfDiagnostics
                            list = { listOfDiagnostics }
                            handleChangeDiagnostic = { this.handleChangeDiagnostic }
                            handleCheckBoxChange = { this.handleCheckBoxChange }
                            handleClickTr={ this.handleClickTr }
                            handleDoubleClickTr={ this.handleDoubleClickTr }
                            value = { diagnosticId }
                        />
                    </div>
                    <div className="buttons-container">
                        <button
                            className='btn btn-primary'
                            disabled={this.state.diagnosticId == null}
                            onClick={this.handleEditDiagnostic}
                        >Изменить</button>
                        <button
                            className='btn btn-danger'
                            disabled={this.state.diagnosticId == null}
                            onClick={this.handleDeleteDiagnostic}
                        >Удалить</button>
                    </div>
                </div>) : ( this.state.loading ? null : <div
                    className="mx-auto text-center alert alert-warning"
                    role="alert"
                    style={{width: '500px'}}>
                    Список обследований пуст!
                </div>)}
            </div>
        )
    }
}

function ListOfDiagnostics(props){
    const { list, value } = props
        return (
            <table className="table table-bordered">
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
                            onDoubleClick={props.handleDoubleClickTr}
                            onClick={props.handleClickTr}
                            data-value={id}
                            key={id}
                            className={`${id == value ? 'active-row': null}`}>
                            <th>{ index }</th>
                            <td>{ id }</td>
                            <td>{ date }</td>
                        </tr>)
                }</tbody>
            </table>
        )
}