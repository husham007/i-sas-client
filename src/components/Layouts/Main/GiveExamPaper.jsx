import React, { Component } from 'react';
import { ButtonBase, Paper, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom'


const Styles = theme => ({

    paper: {
        padding: theme.spacing(1, 2),
        margin: theme.spacing(3),
        backgroundColor: '#000',
        overflowY: 'auto',
        border: '2px',
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

class GiveExamPaper extends Component {
    render() {
        const { classes } = this.props;
        return (
            <ButtonBase disabled component={Link} to="/">
                <Paper className={classes.paper}>
                    <div className={classes.icon}><i className="fas fa-chalkboard-teacher"></i></div>
                    <Typography variant="h6">Give Exam</Typography>
                    <br />
                    <Typography variant="overline" style={{ lineHeight: '1' }}>
                        Testify instantly marks and grades your tests. Powerful reports then allow you to perform in-depth analysis across all responses.
              </Typography>
                </Paper>
            </ButtonBase>
        );
    }
}

export default withStyles(Styles)(GiveExamPaper);