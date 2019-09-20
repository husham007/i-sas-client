import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
    progress: {
        marginTop: '15%',
        marginLeft: '50%',
        fontSize:'20px'
        // justifyContent: 'center'
    },
}));

export default function LoadingProgress() {
    const classes = useStyles();

    return (
        <div className={classes.progress}>
            <CircularProgress  color="secondary" size="5rem" />
            <p>LOADING ...</p>
        </div>
    );
}