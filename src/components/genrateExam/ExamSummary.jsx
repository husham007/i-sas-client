import React, { Component } from 'react';
import { Grid, Typography, Divider, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import EditExam from './EditExam';
import DeleteExam from './DeleteExam';
import { compose } from 'redux'
import { connect } from 'react-redux'
import QuestionSummary from '../questionBank/QuestionSummary';
import { removeQuestion, setErrorMessage, createExam } from '../../store/actions/examAction'
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';


const Styles = theme => ({
    root: {
        width: '90%',
        backgroundColor: '#111',
        margin: 'auto',
        marginTop: theme.spacing(10),
        display: 'flex',
        flexDirection: 'column'
    },
    grid: {
        padding: theme.spacing(3)
    },
    title: {
        width: '80%',
        padding: theme.spacing(2, 0),
        display: 'flex',
        justifyContent: 'space-between',
        margin: 'auto'
    },
    details: {
        width: '80%',
        display: 'flex',
        justifyContent: 'space-between',
        itemAlign: 'center',
        margin: 'auto'
    },
})

const CREATE_EXAM = gql`
mutation createExam($examInput: ExamInput!) {
    createExam(examInput: $examInput) {
        name
        id
        type
        instructions
        startTime
        duration
        book
        author{
            username
        }
        examQuestions{
            question{
                statement
            }
            marks
        }
    }
  }`;

class ExamSummary extends Component {
    handleRemove = (id) => {
        console.log('this is remove btn');
        //  const { id } = e.target
        this.props.removeQuestion(id)
        this.props.setErrorMessage(id, null)
    }

    handleSum = (questions) => {
        let sum = 0;
        questions.forEach(question => { sum = sum + parseInt(question.marks) })
        // console.log(sum)
        return sum;

    }
    handleCreate = () => {
        console.log(this.props)
        this.props.createExam(this.props.rootReducer.exam, CREATE_EXAM, this.props.client)
    }
    render() {
        let { classes, examQuestions, exam, questions } = this.props
        console.log(exam)
        if (questions) {
            examQuestions = questions;
        }
        return (
            <div className={classes.root}>
                <Grid container className={classes.grid}>
                    <Grid item className={classes.title} xs={12}>
                        <div>
                            <Typography variant="h5">{exam.name}</Typography>
                        </div>
                        <div style={{ flexBasis: '22%', display: 'flex', justifyContent: 'space-between', marginRight: 20 }}>
                            <EditExam exam={exam} />
                            <DeleteExam exam={exam} />
                        </div>
                    </Grid>
                    <Grid item className={classes.details} xs={12}>
                        <div style={{ flex: 2, paddingRight: 15 }}>
                            <Typography variant="h5">Type: <span>{exam.type}</span></Typography>
                            <Divider variant="middle" />
                            <Typography variant="h5">Instructions: <span>{exam.instructions}</span></Typography>
                        </div>
                        <div style={{ flex: 1 }}>
                            <Typography variant="subtitle1">Total questions: {examQuestions.length}</Typography>
                            <Divider variant="middle" />
                            <Typography variant="subtitle1">Total marks: {this.handleSum(examQuestions)}</Typography>
                        </div>
                        <div style={{ flex: 1 }}>
                            <Typography variant="subtitle1">Start Time: {exam.startTime}</Typography>
                            <Divider variant="middle" />
                            <Typography variant="subtitle1">Duration: {exam.duration}/ min</Typography>
                        </div>
                    </Grid>
                    <Divider />
                    <Grid item style={{ paddingTop: 30 }} xs={12}>
                        {examQuestions.map((question) => <QuestionSummary exam={true} remove={this.props.remove} question={question.question} key={question.question.id} questionMark={question.marks} questionId={question.question.id} handleRemove={this.handleRemove} />)}
                    </Grid>
                    <Grid item style={{ textAlign: 'center', paddingTop: 55 }} xs={12}>
                        {this.props.btn ? <Button onClick={this.handleCreate} variant="contained" color="secondary" disabled={!(examQuestions.length > 0)}>CREATE EXAM</Button> : null}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log(state.rootReducer.exam.examQuestions)
    return {
        ...state,
        // exam: state.rootReducer.exam,

        examQuestions: state.rootReducer.exam.examQuestions,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeQuestion: (question) => dispatch(removeQuestion(question)),
        setErrorMessage: (id, msg) => dispatch(setErrorMessage(id, msg)),
        createExam: (exam, query, client) => dispatch(createExam(exam, query, client))
    }
}

export default compose(
    withStyles(Styles),
    connect(mapStateToProps, mapDispatchToProps),
    withApollo
)(ExamSummary);