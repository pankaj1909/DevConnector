import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getPosts} from "../../actions/post";
import Spinners from "../layout/spinners";
import PostItem from "./PostItem";
import PostForm from "./PostForm";

const Posts = ({getPosts, post: {posts, loading}}) => {

    useEffect(() => {
        getPosts()
    }, [getPosts])


    return (
        <Fragment>
            {loading ? <Spinners/> : <Fragment>
                <h1 className="large text-primary">Posts</h1>
                <p className="lead"><i className="fas fa-user"/> Welcome to the community!</p>
                <PostForm/>
                {posts.map(post => (
                    <PostItem post={post}/>
                ))}
            </Fragment>}
        </Fragment>
    )

}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
    return ({
        post: state.post
    })
}

const mapDispatchToProps = (dispatch) => {
    return ({
        getPosts: bindActionCreators(getPosts, dispatch),
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)