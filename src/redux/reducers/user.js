import * as actionTypes from '../constants/actionTypes';

export const user = (state={}, action) => {
    switch (action.type){
        case actionTypes.USER_LOGIN:
            return action.data;
        case actionTypes.USER_LOGIN_OUT:
            return action.data;
        default:
            return state
    }

};