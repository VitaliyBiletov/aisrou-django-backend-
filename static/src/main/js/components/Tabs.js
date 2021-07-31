import React from 'react'
import ReactDOM from 'react-dom'
import PhonemicPerception from './sensoMotorLevel/phonemicPerception/PhonemicPerception'

const TabContent = ({title, content}) => (
    <div className='tabContent'>
        <p className='tabContentTitle h1'>{title}</p>
        <div className='tabContentContainer'>{content}</div>
    </div>
)

export default class Tabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [
                {id: 0, title: 'Состояние функций', content: 'Пример1', active: false},
                {id: 1, title: 'Сенсо-моторный уровень', content: <PhonemicPerception/>, active: true},
                {id: 2, title: 'Грамматический строй речи', content: 'Пример3', active: false},
                {id: 3, title: 'Словарный запас', content: 'Пример4', active: false},
                {id: 4, title: 'Связная речь', content: 'Пример5', active: false},
                {id: 5, title: 'Языковой анализ', content: 'Пример6', active: false},
                {id: 6, title: 'Словообразование', content: 'Пример7', active: false},
                {id: 7, title: 'Чтение', content: 'Пример8', active: false},
                {id: 8, title: 'Письмо', content: 'Пример9', active: false},
            ]
        }
    }

    openTab = e => {
        e.preventDefault()
        const id = e.target.dataset.index
        const items = this.state.items
        const newItems = items.map(item => {
            if (item.id == id)
                item.active = true
            else
                item.active = false
            return item
        })
        this.setState({items: newItems})

        $(`.btn`).removeClass('active')
        $(`.btn[data-index=${id}]`).addClass('active')
    }

    render() {
        const [activeItem] = this.state.items.filter(item => item.active)
        return (
            <React.Fragment>
                    <ul className="nav nav-pills mt-1 pb-1" id='diagnosticTabs'>
                    {this.state.items.map((item, i)=>(
                        <li key={i} className="nav-item">
                            <button
                                type="button"
                                className={`btn btn-light m-1 ${activeItem.id == item.id ? 'active' : ''}`}
                                data-index={i}
                                onClick={this.openTab}
                            >{item.title}</button>
                        </li>
                    ))}
                    </ul>
                <hr/>
                <TabContent {...activeItem}/>
            </React.Fragment>
        )
    }
}