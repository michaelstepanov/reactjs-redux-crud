import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import PostsList from './PostsList';
import { boundFetchPosts, boundDeletePost, getUrlParams } from '../../actions';
import Pagination from 'react-js-pagination';
import { Link } from 'react-router-dom'

class PostsPage extends Component {
    constructor(props) {
        super(props);

        this.handlePageChange = this.handlePageChange.bind(this)
    }

    componentDidMount() {
        let params = getUrlParams(this.props.location.search)
        if (this.props.page) params._page = this.props.page;
        if (this.props.limit) params._limit = this.props.limit;
        if (this.props.total) params._total = this.props.total;
        this.props.boundFetchPosts(params);
    }

    handlePageChange(pageNumber) {
        this.props.boundFetchPosts({_page: pageNumber});
    }

    render() {
        return (
            <div>
                <div style={{marginTop: '20px'}}>
                    <Link to={"/posts/create"} className="waves-effect waves-light btn"><i className="material-icons" style={{float: 'left'}}>add</i><span> Create Post</span></Link>
                </div>
                <h1>Posts List</h1>
                <PostsList posts={this.props.posts} deletePost={this.props.boundDeletePost} />
                <Pagination
                    activePage={this.props.page}
                    itemsCountPerPage={this.props.limit}
                    totalItemsCount={this.props.total}
                    pageRangeDisplayed={7}
                    onChange={this.handlePageChange}
                />
            </div>
        );
    }
}

PostsPage.propTypes = {
    posts: PropTypes.array.isRequired,
    boundFetchPosts: PropTypes.func.isRequired,
    boundDeletePost: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired
};

function mapStateToProps(state) {
    return {
        posts: state.posts,
        page: state.pagination.posts.page,
        limit: state.pagination.posts.limit,
        total: state.pagination.posts.total
    }
}

export default connect(mapStateToProps, { boundFetchPosts, boundDeletePost, getUrlParams })(PostsPage);