const initState = {
    authError: null,
    token: null
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN_ERROR':
            console.log('login error');
            return {
                ...state,
                authError: 'login failed'
            };
            case 'TOKEN':
            console.log('TOKEN, Payload', action.payload);
            return {
                ...state,
                authError: null,
                token: action.payload
            };             
            case 'AUTH_ERR':
            console.log('AUTH_ERR, Payload', action.payload);
            return {
                ...state,
                authError: action.payload
            };   
        case 'LOGIN_SUCCESS':
            console.log('login successed');
            return {
                ...state,
                authError: null
            };
        case 'SIGNOUT_SUCCESS':
            console.log('sign out success');
            return {...state, token: null};
        case 'SIGNUP_SUCCESS':
            console.log('sign up success');
            return {
                ...state,
                authError: null
            };
        case 'SIGNUP_ERROR':
            console.log('sign up error');
            return {
                ...state,
                authError: action.err.message
            }
        default:
            return state;
    }
};
export default authReducer
