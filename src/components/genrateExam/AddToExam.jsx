import React, { Component } from 'react';
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, TextField, Typography } from '@material-ui/core'
import { PlaylistAdd } from '@material-ui/icons'
import { withStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux'
import Slide from '@material-ui/core/Slide';
import { withApollo } from 'react-apollo';
import { compose } from 'redux';
// import gql from 'graphql-tag';
import { addQuestionToExam, setErrorMessage } from '../../store/actions/examAction'



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const styles = theme => ({

    addBtn: {
        marginLeft: 10,
        [theme.breakpoints.down('xs')]: {
            marginLeft: 0,
        }
    },
    add: {
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
    }
});


class AddToExam extends Component {
    state = {
        open: false,
        score: '',
        errorMessage: null,
    }
    handleToggle = () => {
        this.setState({
            open: !this.state.open
        })
    }
    handleChange = e => {
        // console.log(this.state)
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    // componentDidMount= ()=>{
    //     this.checkQuestion(this.props.question.id)
    // }

    handleAdd = () => {
        this.handleToggle()
        this.props.addQuestionToExam({ question: this.props.question, marks: this.state.score })
        this.setState({
            score: '',
            // errorMessage: null
        })
        // if (this.props.exam.examQuestions.find(question => {
        //     return question.question.id === this.props.question.id
        // })) {
        //     this.setState({
        //         score: this.state.score
        //     })
        // } else {
        //     this.props.addQuestionToExam({ question: this.props.question, marks: this.state.score })
        //     this.setState({
        //         score: ''
        //     })
        // }
    }

    checkQuestion = (id) => {
        console.log(id);
        if (this.props.exam.examQuestions.find(question => {
            return question.question.id === id
        })) {
            console.log('question exist')
            this.props.setErrorMessage(id, 'question exist')
            return true
        }
        else {
            //         // this.props.addQuestionToExam({ question: this.props.question.id, marks: this.state.score })
            //         // this.setState({
            //         //     score: ''
            //         // })
            console.log('not exist')
            // if (this.state.errorMessage) {
            //    this.setState({
            //        errorMessage: null
            //    })
            // }
            return false

        }
    }




    render() {

        const { classes, question } = this.props;
        //console.log(question.id)

        if (!this.props.errorMessage.get(question.id)) {
            this.checkQuestion(question.id)
        }

        // console.log(this.state)
        return (

            <div>
                <Button size="small" variant="outlined" onClick={this.handleToggle} color="primary">
                    <div className={classes.add}>Add</div>
                    <PlaylistAdd className={classes.addBtn} />
                </Button>
                <Dialog
                    open={this.state.open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleToggle}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">{"Points: "}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            {this.props.errorMessage.get(question.id)}
                        </DialogContentText>
                        <TextField
                            id="outlined-number"
                            label="Points"
                            name="score"
                            value={this.state.score}
                            onChange={this.handleChange}
                            type="number"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                            variant="outlined"
                            disabled={this.props.errorMessage.get(question.id) ? true : false}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button size="small" onClick={this.handleAdd} variant="contained" color="secondary" disabled={this.props.errorMessage.get(question.id) ? true : false || !this.state.score}>
                            Add
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

const mapStateToProps = state => {
    return {
        exam: state.rootReducer.exam,
        errorMessage: state.rootReducer.exam.errorMessage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addQuestionToExam: (exam) => dispatch(addQuestionToExam(exam)),
        setErrorMessage: (id, msg) => dispatch(setErrorMessage(id, msg))
    }
}


export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
    // withApollo,
)(AddToExam)


