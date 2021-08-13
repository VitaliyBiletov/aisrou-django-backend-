import React from 'react'
import { fields } from './fields.json'
import _ from 'lodash'

export default class StateOfFunctions extends React.Component {
    constructor(props) {
        super(props)
    }

    // handleChange = e => {
    //     const {name, value} = e.target
    //         const pointer = e.target.selectionStart;
    //     console.log(pointer)
    //     const element = e.target;
    //     window.requestAnimationFrame(() => {
    //       element.selectionStart = pointer;
    //       element.selectionEnd = pointer;
    //     });
    //     this.setState({ [name]: value }, () => {
    //         this.props.updateState({ stateOfFunctions: this.state })
    //     })
    // }

    render() {
        console.log('render')
        return (
            <React.Fragment>
                <p className='section-heading'>{this.props.name}</p>
                <div className='state-of-functions'>
                    <div className='form mt-4'>
                    { fields.map(item =>
                    {
                        return(
                            <div className='form-group' key={item.id}>
                                <label className='col-form-label' htmlFor={item.name}>{item.title}</label>
                                <textarea
                                    data-id={item.id}
                                    key={item.id}
                                    onChange={this.props.onChange('stateOfFunctions')}
                                    className='form-control'
                                    name={item.name}
                                    title={item.title}
                                    value={this.props.getState[item.name]}
                                />
                            </div>
                        )
                    })
                    }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}