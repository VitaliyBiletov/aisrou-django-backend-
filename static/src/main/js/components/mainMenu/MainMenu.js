import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import axios from "axios";
import 'animate.css/animate.css'
import CreateDiagnostic from './CreateDiagnostic'
import DiagnosticEditor from "./DiagnosticEditor";
import Loader from '../Loader'

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
        return (
                <div className='sections-container'>
                    <div className='student-selection-section'>
                        <div className='student-choice-container'>
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
                    {!$.isEmptyObject(this.state.selected_pupil) ? <CreateDiagnostic selected_pupil={this.state.selected_pupil}/> : null}
                    {!$.isEmptyObject(this.state.selected_pupil) ? <DiagnosticEditor csrf={this.state.csrf} selected_pupil={this.state.selected_pupil}/> : null}
                </div>
        )
    }
}

ReactDOM.render(<MainMenu/>, document.getElementById('content'))


