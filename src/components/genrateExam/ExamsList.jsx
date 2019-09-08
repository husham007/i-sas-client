import React, { Component } from 'react';
import { List, ListItem, Divider } from '@material-ui/core';
import ExamSummary from './ExamSummary';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { selectExam } from '../../store/actions/examAction';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    root: {
        display: 'flex',
    },
    list: {
        width: 200,
        // background: 'none',
        height: '55vh',

    }
})



class ExamsList extends Component {
    state = {
        selectedExam: this.props.selected,

    }
    handleGet = (e) => {
        const { id } = e.target;
        this.props.selectExam(id)
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <div>
                    <List component="nav" className={classes.list}>
                        <ListItem style={{ fontSize: '18px', fontFamily: 'TimesNewRoman', textAlign: 'center', background: '#111' }}>Exams List</ListItem>
                        {this.props.exams.map((exam, id) => <div key={exam.id}><ListItem id={id} onClick={this.handleGet} button>{exam.name} </ListItem><Divider /></div>)}

                    </List>
                </div>
                <div>
                    {this.props.selected ? <ExamSummary btn={false} remove={false} questions={this.props.exams[this.props.selected].examQuestions} exam={{
                        id: this.props.exams[this.props.selected].id,
                        type: this.props.exams[this.props.selected].type,
                        options: this.props.exams[this.props.selected].options,
                        name: this.props.exams[this.props.selected].name,
                        instructions: this.props.exams[this.props.selected].instructions,
                        startTime: this.props.exams[this.props.selected].startTime,
                        duration: this.props.exams[this.props.selected].duration,
                        book: 'javascript',
                    }} /> : null}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        selected: state.rootReducer.exam.selected
    }
}
const mapDispatchToProps = dispatch => {
    return {
        selectExam: (id) => dispatch(selectExam(id))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(ExamsList);