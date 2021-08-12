import React from 'react'
import { fields } from './fields.json'

export default class StateOfFunctions extends React.Component {
    constructor(props) {
        super(props)
        this.updateState = this.props.updateState
        this.state = this.props.getState('stateOfFunctions')
    }

    handleChange = e => {
        const {name, value} = e.target
        this.setState({ [name]: value }, () => {
            this.props.updateState({ stateOfFunctions: this.state })
        })
    }

    render() {
        return (
            <React.Fragment>
                <p className='section-heading'>{this.props.name}</p>
                <div className='state-of-functions'>
                    <div className='form mt-4'>
                    { fields.map(item => (
                        <div className='form-group' key={item.id}>
                            <label className='col-form-label' htmlFor={item.name}>{item.title}</label>
                            <textarea
                                data-id={item.id}
                                onChange={this.handleChange}
                                className='form-control'
                                name={item.name}
                                title={item.title}
                                value={this.state[item.name]}
                                />
                        </div>
                        ))
                    }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}