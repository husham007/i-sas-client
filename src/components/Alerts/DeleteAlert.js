import React, { Component } from 'react';
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { deleteQuestion } from '../../store/actions/bankAction';
import { connect } from 'react-redux'
import Slide from '@material-ui/core/Slide';
import DeleteSnackbar from './DeleteSnackbar'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


class DeleteAlert extends Component {
    state = {
        open: false,
        del: false
    }
    handleToggle = () => {
        this.setState({
            open: !this.state.open,
            // del: !this.state.del
        })
    }
    handleDelete = () => {
        this.props.deleteQuestion(this.props.question.id)
        this.handleToggle()
    }
    render() {
        // const { question, deleteQuestion } = this.props;
        return (
            <div>
            <div>
                <Button size="small" variant="outlined" onClick={this.handleToggle} style={{ color: '#d32f2f' }}>
                    Delete
                <Delete style={{ marginLeft: 10 }} />
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
                {!this.state.del ? <DeleteSnackbar open={this.state.open} Toggle={this.handleToggle} /> : null}
            </div>

        );
    }
}

export default connect(null, { deleteQuestion })(DeleteAlert);