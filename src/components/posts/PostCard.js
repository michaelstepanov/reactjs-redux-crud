import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';

export default function PostCard({post, deletePost}) {
    return (
        <div className="row">
            <div className="col s12">
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">{post.id}. {post.title}</span>
                        <p>{post.body}</p>
                    </div>
                    <div className="card-action">
                        <Link to={`/posts/${post.id}/edit`} className="waves-effect waves-light btn"><i className="material-icons" style={{float: 'left'}}>edit</i> Edit</Link>
                        <a className="waves-effect waves-light btn red lighten-2" style={{marginLeft: '10px'}} onClick={() => deletePost(post.id)}><i className="material-icons" style={{float: 'left'}}>delete</i>Delete</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

PostCard.propTypes = {
    post: PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired
};