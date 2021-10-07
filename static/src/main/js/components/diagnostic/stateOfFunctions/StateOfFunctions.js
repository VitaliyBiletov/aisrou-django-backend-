import React from 'react'
import {FIELDS} from './fieldsList'
import {connect} from 'react-redux'
import {stateOfFunctionsInputValue} from "../../../redux/actions";


const StateOfFunctions = ({stateOfFunctions, stateOfFunctionsInputValue, name}) => {

    const handleChange = e => {
        const name = e.target.name
        const value = e.target.value
        stateOfFunctionsInputValue(name, value)
    }

    return (
        <React.Fragment>
            <div className='diagnostic-section state-of-functions'>
                <p className='diagnostic-section-heading'>{name}</p>
                <div className='form mt-4'>
                    {FIELDS.map((item, index) => {
                        return (
                            <div className='form-group' key={index}>
                                <label className='col-form-label' htmlFor={item.name}>{item.title}</label>
                                <textarea
                                    data-id={item.id}
                                    onChange={handleChange}
                                    className='form-control'
                                    name={item.name}
                                    title={item.title}
                                    value={stateOfFunctions[item.name]}
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

const mapStateToProps = state => {
    return {
        stateOfFunctions: state.diagnostic.stateOfFunctions
    }
}

const mapDispatchToProps = {
    stateOfFunctionsInputValue,
}

export default connect(mapStateToProps, mapDispatchToProps)(StateOfFunctions)