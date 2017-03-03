export const SET_POSTS = 'SET_POSTS';
export const ADD_POST = 'ADD_POST';
export const FETCH_POST = 'FETCH_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const SET_POSTS_PAGE = 'SET_POSTS_PAGE';
export const SET_POSTS_LIMIT = 'SET_POSTS_LIMIT';
export const SET_POSTS_TOTAL = 'SET_POSTS_TOTAL';

const apiBaseUrl = 'https://jsonplaceholder.typicode.com';

export const setPosts = (posts) => ({
    type: SET_POSTS,
    posts
});

export const addPost = (post) => ({
    type: ADD_POST,
    post
});

export const fetchPost = (post) => ({
    type: FETCH_POST,
    post
});

export const updatePost = (post) => ({
    type: UPDATE_POST,
    post
});

export const deletePost = (id) => ({
    type: DELETE_POST,
    id
});

export const setPostsPage = (page) => ({
    type: SET_POSTS_PAGE,
    page
});

export const setPostsLimit = (limit) => ({
    type: SET_POSTS_LIMIT,
    limit
});

export const setPostsTotal = (total) => ({
    type: SET_POSTS_TOTAL,
    total
});

export const boundDeletePost = (id) => {
    return dispatch => {
        return fetch(apiBaseUrl + `/posts/${id}`, {
            method: 'delete',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(handleResponse)
        .then(post => dispatch(deletePost(id)))
    }
};

export const boundUpdatePost = (data) => {
    return dispatch => {
        return fetch(apiBaseUrl + `/posts/${data.id}`, {
            method: 'put',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(handleResponse)
        .then(post => dispatch(updatePost(post)))
    }
};

export const boundAddPost = (data) => {
    return dispatch => {
        return fetch(apiBaseUrl + '/posts', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(handleResponse)
        .then(post => dispatch(addPost(post)))
    }
};

export const boundFetchPosts = (data = {}) => {
    return dispatch => {
        const _page = data._page || 1;
        const _limit = data._limit || 3;

        dispatch(setPostsPage(_page));
        dispatch(setPostsLimit(_limit));

        fetch(apiBaseUrl + `/posts?_page=${_page}&_limit=${_limit}`)
            .then(res => {
                const total = res.headers.get('X-Total-Count');
                dispatch(setPostsTotal(total));
                
                return res.json()
            })
            .then(posts => dispatch(setPosts(posts)))
    }
};

export const boundFetchPost = (id) => {
    return dispatch => {
        fetch(apiBaseUrl + `/posts/${id}`)
            .then(res => res.json())
            .then(post => dispatch(fetchPost(post)))
    }
};

export const getUrlParams = (search) => {
    if (!search) return {};

    let hashes = search.slice(search.indexOf('?') + 1).split('&');
    let params = {};
    hashes.map(hash => {
        let [key, val] = hash.split('=');
        params[key] = decodeURIComponent(val);
    })

    return params;
};

function handleResponse(response) {
    if (response.ok) {
        return response.json()
    } else {
        let error = new Error(response.statusText)
        error.response = response
        throw error
    }
}