import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getCurrentProfile} from "../../actions/profile";
import {Link} from "react-router-dom";

const DashboardActions = (props) => {
    let {auth: {user}, profile: {profile, loading}} = props

    return (
        <div className="dash-buttons">
            <Link to="/edit-profile" className="btn btn-light"><i className="fas fa-user-circle text-primary"/> Edit
                Profile</Link>
            <Link to="/add-experience" className="btn btn-light"><i className="fab fa-black-tie text-primary"/> Add
                Experience</Link>
            <Link to="/add-education" className="btn btn-light"><i
                className="fas fa-graduation-cap text-primary"/> Add Education</Link>
        </div>
    )

}

DashboardActions.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return ({
        auth: state.auth,
        profile: state.profile
    })
}

const mapDispatchToProps = (dispatch) => {
    return ({
        getCurrentProfile: bindActionCreators(getCurrentProfile, dispatch)
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardActions)