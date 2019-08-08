import React, { Component } from 'react';
import uuidv4 from 'uuid/v4'
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, FormControl, RadioGroup, FormControlLabel, InputLabel, Input, Select, Fab, Radio, MenuItem, FormHelperText } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom';
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
        margin: theme.spacing.unit,
        minWidth: 120
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2
    }
});

class CreateQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            selected: null,
            hasError: false,
            id:'',
            questionType: '',
            question: '',
            questionCategory: '',
            questionLevel: '',
            answer: '',
            newQuestion:[]
        }
    }
    handleToggle = () => {
        this.setState({
            open: !this.state.open
        })
    }
    handleChange = name => ({ target: { value } }) => {
        // const { id, value } = e.target
        this.setState({
            [name]: value
            // selected: value
        })
    }
    handleSubmit = e => {
        e.preventDefault()
        console.log(this.state)
        // this.props.history.push('/questionBank');
        const {questionType,question,questionCategory,questionLevel,answer} = this.state
        const newQ = {
            id: uuidv4(),
            questionType,
            question,
            questionCategory,
            questionLevel,
            answer
        }
        this.setState({
            newQuestion: [{...this.state.newQuestion, newQ}]
        })
        this.props.createQuestion(newQ);
        // this.setState({ hasError: false });
        // if (!this.state.selected) {
        //     this.setState({ hasError: true });
        // }
    }
    // handleClick = () => {
    //     this.setState({ hasError: false });
    //     if (!this.state.selected) {
    //         this.setState({ hasError: true });
    //     }
    // }
    render() {
        const { open, selected, hasError } = this.state;
        const { classes } = this.props;
        // const { auth } = this.props
        // if (!auth.uid) return <Redirect to="/" />
        return (
            <form className={classes.root}>
                <Fab onClick={this.handleToggle} aria-label="Add" color="secondary" >
                    <AddIcon />
                </Fab>
                <Dialog open={open} onClose={this.handleToggle} fullWidth>
                    <DialogTitle id="form-dialog-title">Create Question</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To create a new question.
                        </DialogContentText>
                        <FormControl className={classes.formControl} error={hasError} >
                            <InputLabel htmlFor="questionType">Question Type : </InputLabel>
                            <Select
                                fullWidth
                                name="questionType"
                                value={selected}
                                onChange={this.handleChange('questionType')}
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
                        <FormControl fullWidth>
                            <InputLabel htmlFor="question">Question : </InputLabel>
                            <Input id="question" name="question" onChange={this.handleChange('question')} />
                        </FormControl>
                        <br />
                        <FormControl className={classes.formControl} error={hasError} >
                            <InputLabel htmlFor="questionCategory">Question Category : </InputLabel>
                            <Select
                                fullWidth
                                name="questionCategory"
                                value={selected}
                                onChange={this.handleChange('questionCategory')}
                                input={<Input id="questionCategory" />}
                            >
                                <MenuItem value="midterm">midTerm</MenuItem>
                                <MenuItem value="weeklyTest">weekly test</MenuItem>
                                <MenuItem value="finalExam">Final Exam</MenuItem>
                            </Select>
                            {hasError && <FormHelperText>This is required!</FormHelperText>}
                        </FormControl>
                        <br />
                        <FormControl component="fieldset" fullWidth>
                            <InputLabel htmlFor="questionLevel">Question Level : </InputLabel>
                            <br />
                            <RadioGroup name="questionLevel" onChange={this.handleChange('questionLevel')} style={{ display: 'inline-block' }}>
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
                        </FormControl>
                        <br />
                        <FormControl fullWidth>
                            <InputLabel htmlFor="answer">Answer : </InputLabel>
                            <Input id="answer" name="answer" onChange={this.handleChange('answer')} />
                        </FormControl>
                        <br />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleToggle} color="secondary">
                            Cancel
                        </Button>
                        <Button color="primary" onClick={this.handleSubmit} component={Link} to="/questionBank">
                            CREATE
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
        createQuestion: (question) => dispatch(createQuestion(question))
    }
}

// export default compose(
//     withStyles(styles),
//     connect(mapStateToProps,mapDispatchToProps)
// )(CreateQuestion);
export default compose(
    withStyles(styles),
    connect(null, mapDispatchToProps)
)(CreateQuestion)