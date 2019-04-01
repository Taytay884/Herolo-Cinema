import React from 'react';
import {reduxForm, Field} from 'redux-form'


const validate = values => {
    const errors = {}
    if (!values.title)
        errors.title = 'Required'
    if (!values.year) {
        errors.year = 'Required'
    } else if (values.year < 1900 || values.year > (new Date().getFullYear()))
        errors.year = 'Please enter valid year'
    if (!values.runtime)
        errors.runtime = 'Required'
    if (!values.genre)
        errors.genre = 'Required'
    if (!values.director)
        errors.director = 'Required'
    return errors
}

const renderInput = ({input, meta, label}) => {
    return (
        <div>
            <label>{label}</label>
            <input {...input}/>
            {meta.error && meta.touched &&
            <span>{meta.error}</span>
            }
        </div>
    )
}


const MovieForm = (props) => {

    const {handleSubmit} = props;
    return (
        <form onSubmit={handleSubmit}>
            <Field name="title" type="string" label="Title" component={renderInput}/>
            <Field name="year" type="number" label="Year" component={renderInput}/>
            <Field name="runtime" label="RunTime" type="number" component={renderInput}/>
            <Field name="genre" label="Genre" type="string" component={renderInput}/>
            <Field name="director" label="Director" type="string" component={renderInput}/>
            <button type="submit">save</button>
        </form>
    )
}

export default reduxForm({
    form: 'MovieEdit',
    validate,
    enableReinitialize: true
})(MovieForm)
