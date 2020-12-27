import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getProfileById} from "../../actions/profile";
import Spinners from "../layout/spinners";
import {Link} from 'react-router-dom'
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGitHub from "./ProfileGitHub";


const Profile = ({match, getProfileById, profile: {profile, loading}, auth}) => {

    useEffect(() => {
        getProfileById(match.params.id)
    }, [getProfileById])


    return (
        <Fragment>
            {!profile || loading ? <Spinners/> :
                <Fragment>
                    <Link to={'/profiles'} className={'btn btn-light'}>
                        Back To Profiles
                    </Link>
                    {auth.isAutheticated && !auth.loading &&
                    auth.user._id === profile.user._id &&
                    (<Link to={'/edit-profile'} className={'btn btn-dark'}>Edit Profile</Link>)
                    }
                    <div className="profile-grid my-1">
                        <ProfileTop profile={profile}/>
                        <ProfileAbout profile={profile}/>
                        <div className="profile-exp bg-white p-2">
                            <h2 className="text-primary">Experience</h2>
                            {profile.experience && profile.experience.length > 0 ?
                                (<Fragment>
                                    {profile.experience.map(experience => (
                                        <ProfileExperience key={experience.id} experience={experience}/>
                                    ))}
                                </Fragment>)
                                :
                                (<h4>No Experience credentials</h4>)
                            }
                        </div>
                        <div className="profile-edu bg-white p-2">
                            <h2 className="text-primary">Education</h2>
                            {profile.education && profile.education.length > 0 ?
                                (<Fragment>
                                    {profile.education.map(education => (
                                        <ProfileEducation key={education.id} education={education}/>
                                    ))}
                                </Fragment>)
                                :
                                (<h4>No Education credentials</h4>)
                            }
                        </div>
                        {profile.githubusername && (
                            <ProfileGitHub username={profile.githubusername}/>
                        )}
                    </div>
                </Fragment>
            }
        </Fragment>
    )

}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profiles: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
    return ({
        profile: state.profile,
        auth: state.auth
    })
}

const mapDispatchToProps = (dispatch) => {
    return ({
        getProfileById: bindActionCreators(getProfileById, dispatch),
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)