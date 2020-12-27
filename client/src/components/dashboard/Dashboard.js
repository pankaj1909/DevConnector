import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {deleteAccountAndProfile, getCurrentProfile} from "../../actions/profile";
import Spinners from "../layout/spinners";
import {Link} from "react-router-dom";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";

const Dashboard = (props) => {
    let {auth: {user}, profile: {profile, loading}} = props

    useEffect(() => {
        props.getCurrentProfile()
    }, [])

    return loading && !profile ? <Spinners/> : <Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
            <i className={"fas fa-user"}/>Welcome {user && user.name}
        </p>
        {profile !== null ? (
            <Fragment>
                <DashboardActions/>
                <Experience experience={profile.experience}/>
                <Education education={profile.education}/>
                <div className={"my-2"}>
                    <button className={"btn btn-danger"} onClick={() => props.deleteAccountAndProfile() }>
                        <i className={"fas fa-user-minus"}/>{' '}
                        Delete My Account
                    </button>
                </div>

            </Fragment>
        ) : (
            <Fragment>
                <p>You have not yet setup a profile, please add some info</p>
                <Link to={'/create-profile'} className={"btn btn-primary my-1"}>
                    Create Profile
                </Link>
            </Fragment>
        )
        }

    </Fragment>
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccountAndProfile: PropTypes.func.isRequired,
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
        getCurrentProfile: bindActionCreators(getCurrentProfile, dispatch),
        deleteAccountAndProfile: bindActionCreators(deleteAccountAndProfile, dispatch)
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)