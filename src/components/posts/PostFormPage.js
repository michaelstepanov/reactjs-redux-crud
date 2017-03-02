import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { boundAddPost, boundFetchPost, boundUpdatePost } from '../../actions';
import PostForm from './PostForm';

class PostFormPage extends Component {
    state = {
        redirect: false
    }

    componentDidMount = () => {
        const { match } = this.props;
        if (match.params.id) {
            this.props.boundFetchPost(match.params.id);
        }
    }

    savePost = ({id, title, body}) => {
        if (id) {
            return this.props.boundUpdatePost({ id, title, body }).then(
                () => {this.setState({ redirect: true })},
            );
        } else {
            return this.props.boundAddPost({ title, body }).then(
                () => {this.setState({ redirect: true })},
            );
        }
    }

    cancel = () => {
        this.setState({ redirect: true });
    }

    render() {
        return (
            <div>
                {
                    this.state.redirect ?
                    <Redirect to="/posts" /> :
                    <PostForm
                        post={this.props.post}
                        savePost={this.savePost}
                        cancel={this.cancel}
                    />
                }
            </div>
        );
    }
}

function mapStateToProps(state, props) {
    const { match } = props;
    if (match.params.id) {
        return {
            post: state.posts.find(post => post.id === parseInt(match.params.id, 10))
        };
    } else {
        return {
            post: null
        };
    }
}

export default connect(mapStateToProps, { boundAddPost, boundFetchPost, boundUpdatePost })(PostFormPage);