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
        // color: '#ffb503',
    }

});

class QuestionBankPaper extends Component {
    render() {
        const { classes, auth } = this.props;
        const makeActive = auth.token ? false : true;
        const colorIcon = auth.token ? '#ffb503' : '#fff';
        return (
            <ButtonBase disabled={makeActive} component={Link} to="/questionBank">
                <Paper className={classes.paper}>
                    <div className={classes.icon} style={{ color: `${ colorIcon }` }}><i className="fas fa-book"></i></div>
                    <Typography variant="h6">Question Bank</Typography>
                    <br />
                    <Typography variant="body2" style={{ lineHeight: 1.5 }}>
                        Quickly create great looking tests using miltiple question types and formatting options.
              </Typography>
                </Paper>
            </ButtonBase>
        );
    }
}

export default withStyles(Styles)(QuestionBankPaper);