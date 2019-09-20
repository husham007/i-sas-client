import React, { Component } from 'react';
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { withStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux'
import Slide from '@material-ui/core/Slide';
import { withApollo } from 'react-apollo';
import { compose } from 'redux';
import gql from 'graphql-tag';
import { deleteExam } from '../../store/actions/examAction';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const styles = theme => ({

    deleteBtn: {
        marginLeft: 10,
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

const DELETE_EXAM = gql`
mutation deleteExam($id: ID!){
    deleteExam (id: $id) 
}    
`;


class DeleteExam extends Component {
    state = {
        open: false
    }
    handleToggle = () => {
        this.setState({
            open: !this.state.open
        })
    }
    handleDelete = () => {
        console.log(this.props.exam);
        this.props.client
            .mutate({ mutation: DELETE_EXAM, variables: { id: this.props.exam.id } })
            .then((result) => {
                console.log(result)
                if (result.data.deleteExam) {
                    this.props.deleteExam(this.props.exam.id);
                    this.handleToggle()
                } else {

                }


            })
            .catch(err => { console.log(err); this.props.signInErr(JSON.parse(JSON.stringify(err))) });
        // this.props.deleteExam(this.props.exam.id)
        this.handleToggle()

    }

    render() {
        // const { question, deleteQuestion } = this.props;
        const { classes } = this.props;
        return (
            <div>
                <Button size="small" variant="outlined" onClick={this.handleToggle} style={{ color: '#d32f2f', paddingLeft: 20, width: 110 }} >
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
    connect(null, { deleteExam }),
    withApollo,
)(DeleteExam)


