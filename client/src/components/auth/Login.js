import React, {Fragment, useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {login} from "../../actions/auth";
import {bindActionCreators} from 'redux'

const Login = (props) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const {email = '', password = ''} = formData

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = async e => {
        e.preventDefault()
        await props.login({email, password})
    }

    if (props.isAutheticated) {
        return <Redirect to="/dashboard"/>
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"/> Sign Into Your Account</p>
            <form className="form" onSubmit={(e) => onSubmit(e)}>
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
                <input type="submit" className="btn btn-primary" value="Login"/>
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </Fragment>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAutheticated: PropTypes.bool.isRequired,
}

const mapStateToProps = state => {
    return ({
        isAutheticated: state.auth.isAutheticated
    })
}

const mapDispatchToProps = dispatch => {
    return {
        login: bindActionCreators(login, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)