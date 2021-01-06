import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getPost} from "../../actions/post";
import Spinners from "../layout/spinners";
import PostItem from "../posts/PostItem";
import {Link} from 'react-router-dom'
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";


const Post = ({getPost, post: {post, loading}, match}) => {

    useEffect(() => {
        getPost(match.params.id)
    }, [getPost])


    return (
        <Fragment>
            {loading ? <Spinners/> : <Fragment>
                <Link to="/posts" className="btn">Back To Posts</Link>
                <PostItem post={post} showActions={false}/>
                <CommentForm postId={post?._id || ''}/>
                <div className="comments">
                    {post.comments.map(comment => (
                        <CommentItem key={comment._id} comment={comment} postId={post._id}/>
                    ))}
                </div>
            </Fragment>}
        </Fragment>
    )

}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
    return ({
        post: state.post
    })
}

const mapDispatchToProps = (dispatch) => {
    return ({
        getPost: bindActionCreators(getPost, dispatch),
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)