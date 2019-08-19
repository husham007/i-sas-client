const initState = {
    authError: null,
    token: null,
    id: null,
    username: null,
    email: null,
    role: null,
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN_ERROR':
            console.log('login error');
            return {
                ...state,
                authError: 'login failed'
            };
        case 'SET_TOKEN':
            console.log('TOKEN, Payload', action.payload);
            return {
                ...state,
                authError: null,
                token: action.payload.token,
                username: action.payload.decodedToken.username,
                email: action.payload.decodedToken.email,
                id: action.payload.decodedToken.id,
                role: action.payload.decodedToken.role,
            };

        case 'GET_TOKEN':
            console.log('TOKEN, Payload', action.payload);
            return {
                ...state,
                authError: null,
                token: action.payload.token ? action.payload.token : null,
                username: action.payload.token ? action.payload.decodedToken.username : null,
                email: action.payload.token? action.payload.decodedToken.email : null,
                id: action.payload.token ? action.payload.decodedToken.id: null,
                role: action.payload.token ? action.payload.decodedToken.role: null,
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
            return { ...state,
                 token: null,
                 username: null,
                 email: null,
                 role: null,
                 id: null
                 };
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
