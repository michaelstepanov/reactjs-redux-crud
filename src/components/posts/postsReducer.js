import { SET_POSTS, ADD_POST, FETCH_POST, UPDATE_POST, DELETE_POST } from '../../actions';

export default function posts(state = [], action = {}) {
    switch(action.type) {
        case SET_POSTS:
            return action.posts;

        case ADD_POST:
            return [
                ...state,
                action.post
            ];

        case UPDATE_POST:
            return state.map(post => {
                if (post.id === action.post.id) return action.post;
                return post;
            });

        case DELETE_POST:
            return state.filter(post => post.id !== action.id);

        case FETCH_POST:
            const index = state.findIndex(post => post.id === action.post.id);
            if (index > -1) {
                return state.map(post => {
                    if (post.id === action.post.id) return action.post;
                    return post;
                });
            } else {
                return [
                    ...state,
                    action.post
                ];
            }

        default:
            return state;
    }
}