import { RESET_SNACKBAR,SNACKBAR_MSG, } from '../actions/actionTypes';


const initState = {
    snackBarMessage: null,
}

const snackBarReducer = (state = initState, { type, payload }) => {

    switch (type) {
        case RESET_SNACKBAR:
            console.log('this is snackbar')
            return { ...state, snackBarMessage: null }
        case SNACKBAR_MSG:
            return { ...state, snackBarMessage: payload.message}
        default:
            return state;
    }
};

export default snackBarReducer