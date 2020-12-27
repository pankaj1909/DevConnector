import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getProfiles} from "../../actions/profile";
import Spinners from "../layout/spinners";
import ProfileItem from "./ProfleItem";

const Profiles = ({getProfiles, profile: {profiles, loading}}) => {

    useEffect(() => {
        getProfiles()
    }, [getProfiles])


    return (
        <Fragment>
            {loading ? <Spinners/> : <Fragment>
                <h1 className={"large text-primary"}>Developers</h1>
                <p className={"lead"}>
                    <i className={"fab fa-connectdevelop"}/>Browse and connect with developers
                </p>
                <div className={"profiles"}>
                    {profiles.length > 0 ? (
                        profiles.map(profile =>
                            <ProfileItem key={profile.id} profile={profile}/>
                        )
                    ) : <h4>No Profiles</h4>}
                </div>
            </Fragment>}
        </Fragment>
    )

}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
    return ({
        profile: state.profile
    })
}

const mapDispatchToProps = (dispatch) => {
    return ({
        getProfiles: bindActionCreators(getProfiles, dispatch),
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Profiles)