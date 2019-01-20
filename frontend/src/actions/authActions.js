import { GET_ERRORS } from './types'
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode'
import { SET_CURRENT_USER } from './types';
export const registerUser = (userData, history) => {
    return (dispatch) => {
        console.log(userData);
        axios
            .post('http://localhost:5000/api/users/register', userData)
            .then(res => history.push('/login'))
            .catch(err =>
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            );
    }
}

export const loginUser = (userData) => {
    return (dispatch) => {
        axios.post('http://localhost:5000/api/users/login', userData)
            .then(res => {
                const { token } = res.data;
                localStorage.setItem('jwtToken', token);
                setAuthToken(token);
                const decoded = jwt_decode(token);
                dispatch(setCurrentUser(decoded));
            })
            .catch(err => {
                console.log(err.response);
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            })
    }
}

export function setCurrentUser(decoded) {
    console.log(decoded);
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export function isLoading(loading) {
    return {
        type: IS_LOADING,
        loading
    }
}

export const logoutUser = (userData) => {
    return (dispatch) => {
        localStorage.removeItem('jwtToken');
        setAuthToken(false);
        dispatch(setCurrentUser({}));
    }
}
