import React from 'react'
import axios from "axios/index";
import {PAIRS_OF_SOUNDS} from "./sensoMotorLevel/phonemicPerception/pairsOfSounds";
import {SYLLABLES} from "./sensoMotorLevel/soundPronunciation/syllables";

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
            const data = new FormData()
            data.append('pupil_id', this.props.selected_pupil.id)
            data.append('date_of_creation', this.state.date.value)
            data.append('phonemic_perception_count', PAIRS_OF_SOUNDS.length)
            data.append('syllables_count', SYLLABLES.length)
            axios({
                url: '/create/',
                method: 'POST',
                data: data
            }, ).then(res => {
                sessionStorage.setItem('type','create')
                window.location = `/diagnostic/`
            })
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
