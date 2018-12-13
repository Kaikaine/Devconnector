import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostItem from './PostItem'

class PostFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const {posts} = this.props

        return ( <div>
            {posts.map(post => (
                <PostItem key={post._id} post={post} />
            ))}

        </div> );
    }
}

PostFeed.propTypes = {
    posts: PropTypes.array.isRequired
}
 
export default PostFeed;