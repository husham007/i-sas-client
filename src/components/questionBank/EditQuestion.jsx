import React, { Component } from 'react';
// import uuidv4 from 'uuid/v4'
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, FormControl, FormLabel, RadioGroup, FormControlLabel, InputLabel, Input, Select, Radio, MenuItem, FormHelperText } from '@material-ui/core'
import { withStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux'
import { compose } from 'redux'
import { editQuestion } from '../../store/actions/bankAction'
import { Edit } from '@material-ui/icons'
// import { Redirect } from 'react-router-dom'
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});



const styles = theme => ({
    root: {
        display: "flex",
        flexDirection: 'column',
    },
    formControl: {
        margin: theme.spacing(2),
        minWidth: 120
    },
    editBtn: {
        marginLeft: 10,
        [theme.breakpoints.down('xs')]: {
            marginLeft: 0,
        }
    },
    edit:{
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
    }
});

class EditQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            selected: null,
            hasError: false,
            id: this.props.question.id,
            question: this.props.question.question,
            questionType: this.props.question.questionType,
            questionCategory: this.props.question.questionCategory,
            questionLevel: this.props.question.questionLevel,
            answer: this.props.question.answer
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
        console.log(this.props.question.id)
        console.log(this.state)
        const { id, question, questionType, questionCategory, questionLevel, answer } = this.state
        const q = { id, question, questionType, questionCategory, questionLevel, answer }
        this.props.editQuestion(q);

        this.setState({ hasError: false });
        if (!question || !questionType || !questionCategory || !questionLevel || !answer) {
            this.setState({ hasError: true });
        } else {
            this.handleToggle()
        }
    }
    render() {
        const { open, hasError } = this.state;
        const { classes } = this.props;
        const { question, questionType, questionCategory, questionLevel, answer } = this.state;
        // const { auth } = this.props
        // if (!auth.uid) return <Redirect to="/" />
        return (
            <form className={classes.root}>
                <Button size="small" onClick={this.handleToggle} variant="outlined" color="primary" >
                    <div className={classes.edit}>Edit</div>
                    <Edit className={classes.editBtn} />
                </Button>
                <Dialog open={open} onClose={this.handleToggle} TransitionComponent={Transition}
                    keepMounted fullWidth>
                    <DialogTitle id="form-dialog-title" style={{ paddingBottom: 0 }} >Edit Question</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To edit this question.
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
                            EDIT
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

// const mapStateToProps = state => {
//     return {
//         auth: state.firebase.auth
//     }
// }

const mapDispatchToProps = dispatch => {
    return {
        editQuestion: (question) => dispatch(editQuestion(question))
    }
}

// export default compose(
//     withStyles(styles),
//     connect(mapStateToProps,mapDispatchToProps)
// )(CreateQuestion);
export default compose(
    withStyles(styles),
    connect(null, mapDispatchToProps)
)(EditQuestion)