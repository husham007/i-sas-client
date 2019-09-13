import { RESET_SNACKBAR, SNACKBAR_MSG } from './actionTypes';


export const resetSnackBar = () => {
    return {
        type: RESET_SNACKBAR,
        payload: {

        }
    }
};

export const snackBarMsg = msg => {
    return {
        type: SNACKBAR_MSG,
        payload: {
            message: msg
        }
    }
}