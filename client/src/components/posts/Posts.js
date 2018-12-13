import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import Postform from "./PostForm";
import Spinner from "../common/Spinner";
import { getPosts } from '../../actions/postActions';
import PostFeed from './PostFeed';

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
      this.props.getPosts()
  }

  render() {
    const {posts, loading} = this.props.post

    let postContent;

    if(posts === null || loading) {
        postContent = <Spinner />
    } else {
        postContent = <PostFeed posts={posts} />
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
            <Postform />
            {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
    post: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired

}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, {getPosts})(Posts);
