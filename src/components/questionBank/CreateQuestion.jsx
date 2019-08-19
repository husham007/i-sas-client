import React, { Component } from 'react';
import uuidv4 from 'uuid/v4'
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, FormControl, FormLabel, RadioGroup, FormControlLabel, InputLabel, Input, Select, Fab, Radio, MenuItem, FormHelperText } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createQuestion } from '../../store/actions/bankAction'
// import { Redirect } from 'react-router-dom'

const styles = theme => ({
    root: {
        display: "flex",
        flexDirection: 'column',
    },
    formControl: {
        margin: theme.spacing(2),
        minWidth: 120
    },
    addIcon: {
        position: "fixed",
    }
});

class CreateQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            selected: null,
            hasError: false,
            id: uuidv4(),
            questionType: '',
            question: '',
            questionCategory: '',
            questionLevel: '',
            answer: ''
        }
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
    handleRadios = name => ({ target: { value } }) => {
        this.setState({
            [name]: value
        })
    }
    handleSubmit = e => {
        e.preventDefault()
        console.log(this.state)
        // this.props.history.push('/questionBank');
        const { id, question, questionType, questionCategory, questionLevel, answer } = this.state
        const q = { id, question, questionType, questionCategory, questionLevel, answer }
        this.props.createQuestion(q);

        this.setState({ hasError: false });
        if (!question || !questionType || !questionCategory || !questionLevel || !answer) {
            this.setState({ hasError: true });
        } else {
            this.handleToggle();
            this.setState({
                questionType: '',
                question: '',
                questionCategory: '',
                questionLevel: '',
                answer: ''
            })
        }
    }

    render() {
        const { open, hasError, questionType, questionLevel, questionCategory, question, answer } = this.state;
        const { classes } = this.props;
        // const { auth } = this.props
        // if (!auth.uid) return <Redirect to="/" />
        return (
            <form className={classes.root}>
                <Fab size="large" onClick={this.handleToggle} className={classes.addIcon} aria-label="Add" color="secondary" >
                    <AddIcon />
                </Fab>
                <Dialog open={open} onClose={this.handleToggle} fullWidth>
                    <DialogTitle id="form-dialog-title" style={{ paddingBottom: 0 }}>Create Question</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To create a new question.
                        </DialogContentText>
                        <FormControl fullWidth className={classes.formControl} error={hasError} >
                            <InputLabel htmlFor="questionType">Question Type : </InputLabel>
                            <Select
                                name="questionType"
                                value={questionType}
                                onChange={this.handleChange}
                                input={<Input id="questionType" />}
                            >
                                <MenuItem value="singleChoice">Single Choice</MenuItem>
                                <MenuItem value="multipleChoice">Multiple Choice</MenuItem>
                                <MenuItem value="matching">Matching</MenuItem>
                                <MenuItem value="fillBlank">Fill the Blank</MenuItem>
                            </Select>
                            {hasError && <FormHelperText>This is required!</FormHelperText>}
                        </FormControl>
                        <br />
                        <FormControl className={classes.formControl} error={hasError} fullWidth>
                            <InputLabel htmlFor="question">Question : </InputLabel>
                            <Input id="question" name="question" value={question} onChange={this.handleChange} />
                            {hasError && <FormHelperText>This is required!</FormHelperText>}
                        </FormControl>
                        <br />
                        <FormControl fullWidth className={classes.formControl} error={hasError} >
                            <InputLabel htmlFor="questionCategory">Question Category : </InputLabel>
                            <Select
                                name="questionCategory"
                                value={questionCategory}
                                onChange={this.handleChange}
                                input={<Input id="questionCategory" />}
                            >
                                <MenuItem value="midterm">midTerm</MenuItem>
                                <MenuItem value="weeklyTest">weekly test</MenuItem>
                                <MenuItem value="finalExam">Final Exam</MenuItem>
                            </Select>
                            {hasError && <FormHelperText>This is required!</FormHelperText>}
                        </FormControl>
                        <br />
                        <FormControl component="fieldset" className={classes.formControl} error={hasError} fullWidth>
                            <FormLabel>Question Level : </FormLabel>
                            <RadioGroup name="questionLevel" value={questionLevel} onChange={this.handleRadios('questionLevel')} style={{ display: 'inline-block' }}>
                                <FormControlLabel
                                    value="easy"
                                    id="easy"
                                    name="easy"
                                    control={<Radio color="primary" />}
                                    label="Easy"
                                />
                                <FormControlLabel
                                    value="medium"
                                    id="medium"
                                    name="medium"
                                    control={<Radio color="primary" />}
                                    label="Medium"
                                />
                                <FormControlLabel
                                    value="hard"
                                    id="hard"
                                    name="hard"
                                    control={<Radio color="primary" />}
                                    label="Hard"
                                />
                            </RadioGroup>
                            {hasError && <FormHelperText>This is required!</FormHelperText>}
                        </FormControl>
                        <br />
                        <FormControl className={classes.formControl} error={hasError} fullWidth>
                            <InputLabel htmlFor="answer">Answer : </InputLabel>
                            <Input id="answer" name="answer" value={answer} onChange={this.handleChange} />
                            {hasError && <FormHelperText>This is required!</FormHelperText>}
                        </FormControl>
                        <br />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleSubmit} disabled={!question || !questionType || !questionCategory || !questionLevel || !answer}>
                            CREATE
                        </Button>
                        <Button variant="contained" onClick={this.handleToggle} color="secondary">
                            CANCEL
                        </Button>
                    </DialogActions>
                </Dialog>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        //         auth: state.firebase.auth
        questions: state.bank.questions
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createQuestion: (question) => dispatch(createQuestion(question))
    }
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(CreateQuestion)