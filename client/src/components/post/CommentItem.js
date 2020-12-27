import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {removeComment} from "../../actions/post";
import {Link} from "react-router-dom";
import Moment from "react-moment";

const CommentItem = ({
                         postId,
                         comment: {
                             _id,
                             text,
                             name,
                             avatar,
                             user,
                             date
                         },
                         auth,
                         removeComment

                     }) => {
    return (
        <Fragment>
            <div className="post bg-white p-1 my-1">
                <div>
                    <Link to={`/profile/${user}`}>
                        <img
                            className="round-img"
                            src={avatar}
                            alt=""
                        />
                        <h4>{name}</h4>
                    </Link>
                </div>
                <div>
                    <p className="my-1">{text}</p>
                    <p className="post-date">
                        Posted on <Moment format={'YYYY/MM/DD'}>{date}</Moment>
                    </p>
                    {!auth.loading && user === auth.user._id && (
                        <button
                            onClick={() => removeComment(postId, _id)}
                            type="button"
                            className="btn btn-danger"
                        >
                            <i className="fas fa-times"/>
                        </button>
                    )}
                </div>
            </div>
        </Fragment>
    )
}

CommentItem.propTypes = {
    postId: PropTypes.number.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    removeComment: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return ({
        auth: state.auth
    })
}

const mapDispatchToProps = (dispatch) => {
    return ({
        removeComment: bindActionCreators(removeComment, dispatch),
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem)