import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Route, Redirect} from 'react-router-dom'


const PrivateRoute = ({
                          component: Component,
                          auth: {isAuthenticated = false, logout = false},
                          ...rest
                      }) => (
    <Route
        {...rest}
        render={(props) =>
            !isAuthenticated && logout ? (
                <Redirect to={'/login'}/>
            ) : (
                <Component {...props}/>
            )
        }
    />
)


PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return ({
        auth: state.auth
    })
}

export default connect(mapStateToProps)(PrivateRoute)