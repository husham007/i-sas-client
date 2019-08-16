import authReducer from './authReducer';
import bankReducer from './bankReducer';
import {combineReducers} from 'redux';


const rootReducer = combineReducers({
    auth: authReducer,
    bank : bankReducer,   
});

export default rootReducer;
