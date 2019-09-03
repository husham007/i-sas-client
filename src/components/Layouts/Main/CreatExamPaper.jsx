import React, { Component } from 'react';
import { ButtonBase, Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom'


const Styles = theme => ({
    paper: {
        padding: theme.spacing(1, 2),
        margin: theme.spacing(3),
        backgroundColor: '#000',
        overflowY: 'auto',
        border: '1px',
        borderStyle: 'solid',
        borderColor: '#7f7f7f',
        height: '320px',
        '&:hover': {
            borderColor: '#ffb503',
        }
    },
    icon: {
        fontSize: '55px',
        margin: 30,
        '&:hover': {
            color: '#ffb503',
        }
    }

});

class CreatExamPaper extends Component {
    render() {
        const { classes, auth } = this.props;
        const makeActive = auth.token ? false : true;
        return (
            <ButtonBase disabled={makeActive} component={Link} to="/exam">
                <Paper className={classes.paper}>
                    <div className={classes.icon}><i className="fas fa-laptop-code"></i></div>
                    <Typography variant="h6">Exam</Typography>
                    <br />
                    <Typography variant="body2" style={{ lineHeight: 1.5 }}>
                        Test can either be published privately to a select group or open them up to everyone with a single link and registration page.
                    </Typography>
                </Paper>
            </ButtonBase>
        );
    }
}

export default withStyles(Styles)(CreatExamPaper);