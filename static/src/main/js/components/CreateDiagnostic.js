import React from 'react'
import axios from "axios/index"
import Loader from './Loader'
import {PAIRS_OF_SOUNDS} from "./sensoMotorLevel/phonemicPerception/pairsOfSounds"
import {SYLLABLES} from "./sensoMotorLevel/soundPronunciation/syllables"
import {EXERCISES} from "./sensoMotorLevel/articulatoryMotor/exercises";
import {SOUND_SYLLABLES} from "./sensoMotorLevel/soundSyllableStructure/soundSyllables";

export default class CreateDiagnostic extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            date: { value: null, isInvalid: false},
            csrf:'',
            loading: false
        }
    }

    componentDidMount(){
        $(document).mouseup((e) => {
            if (this.state.date.isInvalid){
                const div = $('.section-creating-diagnostic')
                if (!div.is(e.target) && div.has(e.target).length === 0){
                    this.setState({date: {...this.state.date, isInvalid: false}})
                }
            }
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
            data.append('syllables_count', SYLLABLES.length),
            data.append('exercises_count', EXERCISES.length),
            data.append('sound_syllable_count', SOUND_SYLLABLES.length),
            axios({
                url: '/create/',
                method: 'POST',
                data: data
            }, ).then(res => {
                window.location = `/diagnostic/`
            })
            }
        }

    render(){
        console.log(this.state)
        return (
            <div className='section-creating-diagnostic'>
                {!this.state.loading ? (
                <div className="section-content">
                    <div className='heading'>Создание диагностики</div>
                    <div className="date-field">
                        <label
                            htmlFor="date_of_creation"
                        >
                            Дата заполнения:
                        </label>
                        <input
                            name="date_of_creation"
                            type="date"
                            className={ this.state.date.isInvalid ? 'form-control is-invalid': 'form-control'}
                            onChange={this.handleChangeDate}
                        />
                    </div>
                    <div className="buttons-container">
                        <button
                            className="btn btn-success"
                            onClick={ this.handleClick }
                            id="create-diag">
                            Создать
                        </button>
                    </div>
                </div>) : null}
            </div>
        )
    }
}
