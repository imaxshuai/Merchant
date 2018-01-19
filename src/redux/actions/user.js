import * as actionTypes from '../constants/actionTypes';
import * as userRequest from '../../api/user';

export const login = (user)=> {
    return {
        type: actionTypes.USER_LOGIN,
        data: user
    }
};

export const loginOut = ()=>{
    return {
        type: actionTypes.USER_LOGIN_OUT,
        data: {
            state: false,
            data: {}
        }
    }
}