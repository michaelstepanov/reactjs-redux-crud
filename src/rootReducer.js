import { combineReducers } from 'redux';
import posts from './components/posts/postsReducer';
import { SET_POSTS_PAGE, SET_POSTS_LIMIT, SET_POSTS_TOTAL } from './actions';

export const postsPage = (state=1, action) => 
	(action.type === SET_POSTS_PAGE) ?
		 parseInt(action.page, 10) :
		 state

export const postsLimit = (state=3, action) => 
	(action.type === SET_POSTS_LIMIT) ?
		 parseInt(action.limit, 10) :
		 state

export const postsTotal = (state=0, action) => 
	(action.type === SET_POSTS_TOTAL) ?
		 parseInt(action.total, 10) :
		 state

export default combineReducers({
    posts,
    pagination: combineReducers({
        posts: combineReducers({
            page: postsPage,
            limit: postsLimit,
            total: postsTotal
        })
    })
});