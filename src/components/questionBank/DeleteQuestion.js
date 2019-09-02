import React, { Component } from 'react';
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { deleteQuestion } from '../../store/actions/bankAction';
import { withStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux'
import Slide from '@material-ui/core/Slide';
import { withApollo } from 'react-apollo';
import { compose } from 'redux';
import gql from 'graphql-tag';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const styles = theme => ({
    root: {
        display: "flex",
        flexDirection: 'column',
    },
    deleteBtn: {
        marginLeft: 10,
        marginRight: 25,
        [theme.breakpoints.down('xs')]: {
            marginLeft: 0,
        }
    },
    delete: {
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
    }
});

const DELETE_QUESTION = gql`
mutation deleteQuestion($id: ID!){
    deleteQuestion (id: $id) 
}    
`;


class DeleteQuestion extends Component {
    state = {
        open: false
    }
    handleToggle = () => {
        this.setState({
            open: !this.state.open
        })
    }
    handleDelete = () => {
        this.props.client
            .mutate({ mutation: DELETE_QUESTION, variables: { id: this.props.question.id } })
            .then((result) => {

                this.props.deleteQuestion(this.props.question.id);
                this.handleToggle()

            })
            .catch(err => { console.log(err); this.props.signInErr(JSON.parse(JSON.stringify(err))) });
        // this.props.deleteQuestion(this.props.question.id)
        // this.handleToggle()

    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Button size="small" onClick={this.handleToggle} style={{ color: '#d32f2f' }}>
                    <div className={classes.delete}>Delete</div>
                    <Delete className={classes.deleteBtn} />
                </Button>
                <Dialog
                    open={this.state.open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleToggle}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">{"Are you sure"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            you want to delete this question ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button size="small" onClick={this.handleDelete} variant="contained" color="secondary">
                        {/* <div onClick={this.handleDelete}><DeleteSnackbar message={} /></div> */}
                            Delete
                        </Button>
                        <Button size="small" onClick={this.handleToggle} variant="outlined" color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default compose(
    withStyles(styles),
    connect(null, { deleteQuestion }),
    withApollo,
)(DeleteQuestion)


