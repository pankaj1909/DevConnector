import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'

const Landing = ({isAutheticated}) => {
    if (isAutheticated) {
        return (
            <Redirect to={'/dashboard'}/>
        )
    }
    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1 className="x-large">Developer Connector</h1>
                    <p className="lead">
                        Create a developer profile/portfolio, share posts and get help from
                        other developers
                    </p>
                    <div className="buttons">
                        <Link to="/register" className="btn btn-primary">Register</Link>
                        <Link to="/login" className="btn btn-light">Login</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

Landing.propTypes = {
    isAutheticated: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => {
    return ({
        isAutheticated: state.auth.isAutheticated,
    })
}

export default connect(mapStateToProps)(Landing)