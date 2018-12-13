import { GET_ERRORS, CLEAR_ERRORS } from './../actions/types';
const initalState = {};
  
  export default function(state = initalState, action) {
    switch (action.type) {
      case GET_ERRORS:
      return action.payload
      case CLEAR_ERRORS:
      return {}
      default:
        return state;
    }
  }
  