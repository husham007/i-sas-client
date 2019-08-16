import React, { Component } from 'react';
import { FormControl, InputLabel, Input, MenuItem, Select } from '@material-ui/core'
import { withStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux'
import { compose } from 'redux'
import { searchANYQuestion } from '../../store/actions/bankAction'


const styles = theme => ({
    root: {
        display: "flex",
        justifyContent: 'center'
    },
    formControl: {
        flex: 1,
        margin: theme.spacing(2),
        maxWidth: '16%'
    },

});


class FilterQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // id: this.props.question.id,
            // question: this.props.question.question,
            // questionType: this.props.question.questionType,
            // questionCategory: this.props.question.questionCategory,
            // questionLevel: this.props.question.questionLevel,
            // answer: this.props.question.answer

            questionType: '',
            questionCategory: '',
            questionLevel: '',
            search: this.props.search
        }
    }
    handleChange = e => {
        // console.log(this.state)
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
        this.props.searchANYQuestion(this.state.search)
    }
    handleClick = () => {

    }
    render() {
        const { classes } = this.props,
            { questionType, questionCategory, questionLevel } = this.state;
        console.log(this.state)
        // console.log(this.props)
        return (
            <div className={classes.root}>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="questionType">by Type : </InputLabel>
                    <Select
                        name="questionType"
                        value={questionType}
                        onChange={this.handleChange}
                        input={<Input id="questionType" />}
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value="singleChoice">Single Choice</MenuItem>
                        <MenuItem value="multipleChoice">Multiple Choice</MenuItem>
                        <MenuItem value="matching">Matching</MenuItem>
                        <MenuItem value="fillBlank">Fill the Blank</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="questionType">by Level : </InputLabel>
                    <Select
                        name="questionLevel"
                        value={questionLevel}
                        onChange={this.handleChange}
                        input={<Input id="questionLevel" />}
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value="Easy">Easy</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="Hard">Hard</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="questionCategory">by Category : </InputLabel>
                    <Select
                        name="questionCategory"
                        value={questionCategory}
                        onChange={this.handleChange}
                        input={<Input id="questionCategory" />}
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value="midterm">midTerm</MenuItem>
                        <MenuItem value="weeklyTest">weekly test</MenuItem>
                        <MenuItem value="finalExam">Final Exam</MenuItem>
                    </Select>
                </FormControl>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        text: state.bank.questions.question
    }
}
const mapDispatchToProps = dispatch => {
    return {
        searchANYQuestion: (text) => dispatch(searchANYQuestion(text))
    }
}
export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(FilterQuestion);