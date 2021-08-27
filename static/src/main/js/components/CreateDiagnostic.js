import React from 'react'
import axios from "axios/index";

export default class CreateDiagnostic extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            date: {},
            csrf:'',
        }

    }

    componentDidMount(){
        axios.post('/list_pupils/')
        .then((response) => {
            this.setState({
                date:{value:'', isInvalid: false},
                csrf: response.data['csrf'],
            })
        })
    }

    handleChangeDate = e => {
        this.setState({ date: {value: e.target.value, isInvalid: false}})
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
                    {...date, isInvalid: false}
            })
            axios.post('diagnostic/create',
            {
                'type':'create',
                'selected_pupil_id': this.props.selected_pupil,
                'date': date,
            })
            .then((res) => {
               window.location = '/diagnostic'
            }
                // ReactDOM.render(<Diagnostic/>, document.getElementById('content'))
            )
        }
    }

    render(){
    return (
        <div className="form-diagnostic">
            <p className='title'>Создание диагностики</p>
            <div className="form-container">
                <div className="form-group">
                    <label
                        htmlFor="date_of_creation"
                        className='col-md-5'>
                        Дата заполнения:
                    </label>
                    <input
                        id="date_of_creation"
                        name="date_of_creation"
                        type="date"
                        className={ this.state.date.isInvalid ? 'form-control is-invalid': 'form-control'}
                        onChange={this.handleChangeDate}
                    />
                </div>
                <button
                    className="btn btn-success menu-btn"
                    onClick={ this.handleClick }
                    id="create-diag">
                    Создать
                </button>
            </div>
        </div>

    )
    }
}
