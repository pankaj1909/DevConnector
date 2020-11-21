import React, {Fragment, useState} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {setAlert} from "../../actions/alert";
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types';

const Register = (props) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    })

    const {name = '', email = '', password = '', password2 = ''} = formData

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = async e => {
        e.preventDefault()
        if (password !== password2) {
            props.setAlert('Password do not match', 'danger')
        } else {

        }
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"/> Create Your Account</p>
            <form className="form" onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                    <input type="text" placeholder="Name" name="name" required value={name}
                           onChange={(e) => onChange(e)}/>
                </div>
                <div className="form-group">
                    <input type="email" placeholder="Email Address" name="email" required value={email}
                           onChange={(e) => onChange(e)}/>
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={(e) => onChange(e)}
                        minLength="6"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        value={password2}
                        onChange={(e) => onChange(e)}
                        minLength="6"
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Register"/>
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </Fragment>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => {
    return {
        setAlert: bindActionCreators(setAlert, dispatch),
    };
};

export default connect(null, mapDispatchToProps)(Register)