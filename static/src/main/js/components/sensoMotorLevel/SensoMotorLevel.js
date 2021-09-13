import React from 'react'
import PhonemicPerception from "./phonemicPerception/PhonemicPerception"
import SoundPronunciation from "./soundPronunciation/SoundPronunciation"
import ArtuclatoryMotor from "./articulatoryMotor/ArtuclatoryMotor";
import Subsection from '../template/Subsection'
import {PAIRS_OF_SOUNDS} from "./phonemicPerception/pairsOfSounds";
import {SYLLABLES} from "./soundPronunciation/syllables";
import {EXERCISES} from "./articulatoryMotor/exercises";

const SUBSECTIONS = [
    {
        name: 'phonemicPerception',
        nameOfClass: 'phonemic-perception',
        title: 'Фонематическое восприятие',
        data: PAIRS_OF_SOUNDS,
        instruction: 'Слушай внимательно и повторяй за мной слоги как можно точнее',
        hints: [
            {id:0, text:'Отказ от выполнения, полная невозможность воспроизведения пробы'},
            {id:1, text:'Неточное воспроизведение обоих членов пары с перестановкой слогов, их заменой и пропусками'},
            {id:2, text:'Первый член воспроизводится правильно, второй уподобляется первому (ба-па-ба-па)'},
            {id:3, text:'Точное и правильное воспроизведение в темпе предъявления'},
        ],
        component: <PhonemicPerception/>
    },
    {
        name: 'soundPronunciation',
        nameOfClass:'sound-pronunciation',
        title:'Звукопроизношение',
        data: SYLLABLES,
        instruction:'Называй слова по картинкам',
        hints:[
            {id:0, text:'Звук нарушен'},
            {id:1, text:'Звук в стадии автоматизации'},
            {id:2, text:'Звук в стадии дифференциации'},
            {id:3, text:'Нормативное произношение звука'},
        ],
        component: <SoundPronunciation/>
    },
    {
        name: 'articulatoryMotor',
        nameOfClass: 'articulatory-motor',
        title: 'Артикуляционная моторика',
        data: EXERCISES,
        instruction: 'Посмотри на картинки и попробуй повторить упражнения для тренировки губ и языка так же',
        hints:[
            {id:0, text:'Невыполнение упражнения'},
            {id:1, text:'Выполнение с ошибками - длительный поиск позы, неполный объем движения и т.п.'},
            {id:2, text:'Замедленное и напряженное выполнение'},
            {id:3, text:'Правильное выполнение с точным соответствием всех характеристик'},
        ],
        component: <ArtuclatoryMotor/>
    }
]

export default class SensoMotorLevel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenAll: true,
            countIsOpen: SUBSECTIONS.length
        }
    }

    handleClick = (e) => {
        const {isOpenAll} = this.state
        this.setState({isOpenAll: !isOpenAll, countIsOpen: isOpenAll ? 0 : SUBSECTIONS.length})
    }

    handleIsOpenAll = (status) => {
        let counter = this.state.countIsOpen
        counter = status ? counter + 1 : counter - 1
        if (counter == SUBSECTIONS.length){
            this.setState({isOpenAll: true})
        }
        if (counter == 0){
            this.setState({isOpenAll: false})
        }
        this.setState({countIsOpen: counter})
    }


    render() {
        return (
            <div className="diagnostic-section senso-motor-level">
                <p className='diagnostic-section-heading'><span className={`visibility-switch ${this.state.isOpenAll ? 'active' : ''}`} onClick={this.handleClick}>{this.state.isOpenAll ? "\u25B2" : "\u25BC"}</span>
                    {this.props.name}</p>

                {SUBSECTIONS.map(({name, nameOfClass, title, data, instruction, hints, component}, index) => (
                    <React.Fragment key={index}>
                        <div className={`diagnostic-subsection ${nameOfClass}`}>
                            <Subsection
                                name={name}
                                nameOfClass={nameOfClass}
                                data={data}
                                title={title}
                                instruction={instruction}
                                hints={hints}
                                isOpen={this.state.isOpenAll}
                                isOpenAll={this.handleIsOpenAll}
                            >{component}</Subsection>
                        </div>
                        <hr/>
                    </React.Fragment>
                ))}

            </div>
        )
    }
}

