import React, {Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Link, withRouter} from "react-router-dom";
import {addExperience} from "../../actions/profile";

const AddExperience = (props) => {

    const [formData, setFormData] = useState({
        company: '',
        title: '',
        location: "",
        from: "",
        to: "",
        current: "",
        description: "",
    })

    const [toDateDisabled, toggleDisabled] = useState(false)

    const {
        company,
        title,
        location,
        from,
        to,
        current,
        description,
    } = formData

    const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = (e) => {
        e.preventDefault();
        props.addExperience(formData, props.history)
    }

    return (
        <Fragment>
            <h1 className="large text-primary">
                Add An Experience
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"/> Add any developer/programming positions that you have had in the
                past
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                    <input type="text" placeholder="* Job Title" name="title" value={title}
                           onChange={(e) => handleChange(e)} required/>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Company" name="company" value={company}
                           onChange={(e) => handleChange(e)} required/>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Location"
                           value={location} onChange={(e) => handleChange(e)}
                           name="location"/>
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input type="date"
                           value={from} onChange={(e) => handleChange(e)}
                           name="from"/>
                </div>
                <div className="form-group">
                    <p>
                        <input type="checkbox" value={current}
                               checked={current}
                               onChange={(e) => {
                                   setFormData({...formData, current: !current});
                                   toggleDisabled(!toDateDisabled)
                               }}
                               name="current"/> {' '}Current Job</p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input type="date"
                           value={to}
                           disabled={toDateDisabled ? 'disabled' : ''}
                           onChange={(e) => handleChange(e)}
                           name="to"/>
                </div>
                <div className="form-group">
                      <textarea
                          name="description"
                          cols="30"
                          rows="5"
                          value={description}
                          onChange={(e) => handleChange(e)}
                          placeholder="Job Description"/>
                </div>
                <input type="submit" className="btn btn-primary my-1"/>
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    )
}

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => {
    return ({
        addExperience: bindActionCreators(addExperience, dispatch)
    })
}

export default connect(null, mapDispatchToProps)(withRouter(AddExperience))