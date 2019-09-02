import React, { Component } from 'react';
import { Grid, Typography, Divider } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import EditExam from './EditExam';
import DeleteExam from './DeleteExam';
import { compose } from 'redux'
import { connect } from 'react-redux'
import QuestionSummary from '../questionBank/QuestionSummary';
import { removeQuestion, setErrorMessage } from '../../store/actions/examAction'


const Styles = theme => ({
    container: {
        width: '80%',
        backgroundColor: '#011',
        margin: 'auto',
        marginTop: theme.spacing(10),
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

class ExamSummary extends Component {
    handleRemove = (e) => {
        console.log('this is remove btn');
        const { id } = e.target
        this.props.removeQuestion(id)
        this.props.setErrorMessage(id, null)
    }

    handleSum = () => {
        let sum = 0;
        this.props.examQuestions.forEach(question => { sum = sum + parseInt(question.marks) })
        console.log(sum)
        return sum;

    }
    render() {
        const { classes, exam, examQuestions } = this.props
        return (
            <Grid container className={classes.container}>
                <Grid item className={classes.title}>
                    <div>
                        <Typography variant="h3">{exam.name}</Typography>
                    </div>
                    <div style={{ flexBasis: '20%', display: 'flex', justifyContent: 'space-between' }}>
                        <EditExam />
                        <DeleteExam />
                    </div>
                </Grid>
                <Grid item className={classes.details}>
                    <div style={{ flex: 2, paddingRight: 15 }}>
                        <Typography variant="h5">Type: <span>{exam.type}</span></Typography>
                        <Typography variant="h5">Instructions: <span>{exam.instructions}</span></Typography>
                    </div>
                    <div style={{ flex: 1 }}>
                        <Typography variant="subtitle1">Total questions: {examQuestions.length}</Typography>
                        <Typography variant="subtitle1">Total marks: {this.handleSum()}</Typography>
                    </div>
                    <div style={{ flex: 1 }}>
                        <Typography variant="subtitle1">Start Time: {exam.startTime}</Typography>
                        <Typography variant="subtitle1">Duration: {exam.duration} min</Typography>
                    </div>
                </Grid>
                <Divider />
                <Grid item fullWidth>
                    <div style={{ margin: 30 }}>
                        {this.props.examQuestions.map((question) => <div><QuestionSummary question={question.question} /> {question.marks}<button id={question.question.id} onClick={this.handleRemove} >remove</button></div>)}
                    </div>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    console.log(state.rootReducer.exam.examQuestions)
    return {
        ...state,
        examQuestions: state.rootReducer.exam.examQuestions,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeQuestion: (question) => dispatch(removeQuestion(question)),
        setErrorMessage: (id, msg) => dispatch(setErrorMessage(id, msg))
    }
}

export default compose(
    withStyles(Styles),
    connect(mapStateToProps, mapDispatchToProps)
)(ExamSummary);