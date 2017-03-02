import React, { PropTypes } from 'react';
import PostCard from './PostCard'
import CircularProgress from 'material-ui/CircularProgress';

export default function PostsList({posts, deletePost}) {
    const emptyContent = (
        <CircularProgress size={80} thickness={5} />
    );

    const postsList = (
        <div>
            {posts.map((post) => <PostCard post={post} key={post.id} deletePost={deletePost} />)}
        </div>
    );

    return (
      <div>
          {posts.length === 0 ? emptyContent : postsList}
      </div>
    )
}

PostsList.propTypes = {
    posts: PropTypes.array.isRequired,
    deletePost: PropTypes.func.isRequired
};