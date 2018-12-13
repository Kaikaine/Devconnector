
import { ADD_POST } from './../actions/types';

const initalState = {
    posts: [],
    post: {},
    loading: false
}

export default function(state= initalState, action) {
    switch(action.type){
        case ADD_POST:
        return {
            ...state,
            posts: [action.payload, ...state.posts]
        }
        default:
        return state
    }
    
}