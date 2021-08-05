import React from 'react'

export default class StateOfFunctions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            form: [
                {id: 0, name: 'hearing', title:'Слух'},
                {id: 1, name: 'vision', title:'Зрение'},
                {id: 2, name: 'breath', title:'Дыхание'},
                {id: 3, name: 'voice', title:'Голос'},
                {id: 4, name: 'prosody', title:'Просодика'},
                {id: 5, name: 'articulation_apparatus', title:'Артикуляционный аппарат'},
                {id: 6, name: 'motor_skills', title:'Моторика'},
                {id: 7, name: 'additional_information', title:'Дополнительня информация'},
            ]
        }
    }

    render() {
        const form = this.state.form
        return (
            <div className='form mt-4'>
            { form.map(item => (
                <div className='form-group' key={item.id}>
                    <label className='col-form-label' htmlFor={item.name}>{item.title}</label>
                    <textarea className='form-control' name={item.name} title={item.title}/>
                </div>
                ))
            }
            </div>
        )
    }
}