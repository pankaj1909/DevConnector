import React, {Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Link, withRouter} from "react-router-dom";
import {createOrUpdateProfile} from "../../actions/profile";

const CreateProfile = (props) => {

    const [formData, setFormData] = useState({
        company: '',
        website: '',
        location: "",
        bio: "",
        status: "",
        githubusername: "",
        skills: "",
        youtube: "",
        facebook: "",
        twitter: "",
        instagram: "",
        linkedin: ""
    })

    const [displaySocialInputs, toggleSocialInputs] = useState(false)

    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = formData

    const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = (e) => {
        e.preventDefault();
        props.createOrUpdateProfile(formData, props.history)
    }

    return (
        <Fragment>
            <h1 className="large text-primary">
                Create Your Profile
            </h1>
            <p className="lead">
                <i className="fas fa-user"/> Let's get some information to make your
                profile stand out
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                    <select value={status} onChange={(e) => handleChange(e)} name="status">
                        <option value="0">* Select Professional Status</option>
                        <option value="Developer">Developer</option>
                        <option value="Junior Developer">Junior Developer</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="Manager">Manager</option>
                        <option value="Student or Learning">Student or Learning</option>
                        <option value="Instructor">Instructor or Teacher</option>
                        <option value="Intern">Intern</option>
                        <option value="Other">Other</option>
                    </select>
                    <small className="form-text">Give us an idea of where you are at in your career</small>
                </div>
                <div className="form-group">
                    <input type="text" value={company} onChange={(e) => handleChange(e)} placeholder="Company"
                           name="company"/>
                    <small className="form-text"
                    >Could be your own company or one you work for</small
                    >
                </div>
                <div className="form-group">
                    <input type="text" value={website} onChange={(e) => handleChange(e)} placeholder="Website"
                           name="website"/>
                    <small className="form-text"
                    >Could be your own or a company website</small
                    >
                </div>
                <div className="form-group">
                    <input type="text" value={location} onChange={(e) => handleChange(e)} placeholder="Location"
                           name="location"/>
                    <small className="form-text"
                    >City & state suggested (eg. Boston, MA)</small
                    >
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Skills"
                           onChange={(e) => handleChange(e)}
                           value={skills}
                           name="skills"/>
                    <small className="form-text"
                    >Please use comma separated values (eg.
                        HTML,CSS,JavaScript,PHP)</small
                    >
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        value={githubusername}
                        onChange={(e) => handleChange(e)}
                        placeholder="Github Username"
                        name="githubusername"
                    />
                    <small className="form-text"
                    >If you want your latest repos and a Github link, include your
                        username</small
                    >
                </div>
                <div className="form-group">
                    <textarea placeholder="A short bio of yourself" onChange={(e) => handleChange(e)} value={bio}
                              name="bio"/>
                    <small className="form-text">Tell us a little about yourself</small>
                </div>

                <div className="my-2">
                    <button onClick={() => toggleSocialInputs(!displaySocialInputs)} type="button"
                            className="btn btn-light">
                        Add Social Network Links
                    </button>
                    <span>Optional</span>
                </div>

                {displaySocialInputs &&
                <Fragment>
                    <div className="form-group social-input">
                        <i className="fab fa-twitter fa-2x"/>
                        <input type="text" placeholder="Twitter URL" onChange={(e) => handleChange(e)} value={twitter}
                               name="twitter"/>
                    </div>

                    <div className="form-group social-input">
                        <i className="fab fa-facebook fa-2x"/>
                        <input type="text" placeholder="Facebook URL"
                               onChange={(e) => handleChange(e)}
                               value={facebook}
                               name="facebook"/>
                    </div>

                    <div className="form-group social-input">
                        <i className="fab fa-youtube fa-2x"/>
                        <input type="text" placeholder="YouTube URL"
                               onChange={(e) => handleChange(e)}
                               value={youtube}
                               name="youtube"/>
                    </div>

                    <div className="form-group social-input">
                        <i className="fab fa-linkedin fa-2x"/>
                        <input type="text" placeholder="Linkedin URL"
                               onChange={(e) => handleChange(e)}
                               value={linkedin}
                               name="linkedin"/>
                    </div>

                    <div className="form-group social-input">
                        <i className="fab fa-instagram fa-2x"/>
                        <input type="text" placeholder="Instagram URL"
                               onChange={(e) => handleChange(e)}
                               value={instagram}
                               name="instagram"/>
                    </div>
                </Fragment>
                }

                <input type="submit" className="btn btn-primary my-1"/>
                <Link to="/dashboard" className="btn btn-light my-1">Go Back</Link>
            </form>
        </Fragment>
    )
}

CreateProfile.propTypes = {
    createOrUpdateProfile: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => {
    return ({
        createOrUpdateProfile: bindActionCreators(createOrUpdateProfile, dispatch)
    })
}

export default connect(null, mapDispatchToProps)(withRouter(CreateProfile))