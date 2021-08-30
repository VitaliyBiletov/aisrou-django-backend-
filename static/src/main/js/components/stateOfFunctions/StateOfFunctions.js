import React from 'react'
import {fields} from './fields.json'
import {connect} from 'react-redux'
import {stateOfFunctionsInputValue} from "../../redux/actions";


const StateOfFunctions = ({stateOfFunctions, stateOfFunctionsInputValue}) => {

    const handleChange = e => {
        const name = e.target.name
        const value = e.target.value
        stateOfFunctionsInputValue(name, value)
    }

    return (
        <React.Fragment>
            <p className='section-heading'>Состояние функций</p>
            <div className='state-of-functions'>
                <div className='form mt-4'>
                    {fields.map((item, index) => {
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