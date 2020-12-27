import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {logout} from "../../actions/auth";
import {bindActionCreators} from "redux";

const Navbar = (props) => {
    let {auth = {}} = props
    let {isAutheticated, loading} = auth

    const authLinks = (
        <ul>
            <li>
                <Link to="/profiles">
                    <span>Developers</span>
                </Link>
            </li>
            <li>
                <Link to="/posts">
                    <span>Posts</span>
                </Link>
            </li>
            <li>
                <Link to="/dashboard">
                    <i className="fas fa-user"/>{' '}
                    <span className='hide-sm'>Dashboard</span>
                </Link>
            </li>
            <li>
                <a onClick={props.logout} href='#!'>
                    <i className="fas fa-sign-out-alt"/>{' '}
                    <span className='hide-sm'>Logout</span>
                </a>
            </li>
        </ul>
    )

    const guestLinks = (
        <ul>
            <li>
                <Link to="/profiles">
                    <span>Developers</span>
                </Link>
            </li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    )

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/"><i className="fas fa-code"/> DevConnector</Link>
            </h1>
            {!loading && (<Fragment>{isAutheticated ? authLinks : guestLinks}</Fragment>)}
        </nav>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
    return ({
        auth: state.auth
    })
}

const mapDispatchToProps = dispatch => {
    return {
        logout: bindActionCreators(logout, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)