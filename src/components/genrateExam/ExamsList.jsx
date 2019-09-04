import React, { Component } from 'react';
import { List, ListItem, Divider } from '@material-ui/core';
import ExamSummary from './ExamSummary';

class ExamsList extends Component {
    state = {
        selectedExam: ''
    }
    handleGet = (e) => {
        const { id, value } = e.target;
        this.setState({
            [id]: value,
            selectedExam: id
        })
    }
    render() {
        console.log(this.state)
        console.log(this.props.exams)
        return (
            <div style={{ display: 'flex' }}>
                <div>
                    <List component="nav" style={{ width: 220, background: 'none', height: '100%', marginTop: -20, maxHeight: 470 }}>
                        {this.props.exams.map((exam, id) => <div><ListItem id={id} onClick={this.handleGet} button>{exam.name}</ListItem><Divider /></div>)}

                    </List>
                </div>
                <div>

                    {/* {this.state.selectedExam ? <ExamSummary exam={this.props.exams.find( exam => exam.name === this.state.selectedExam)}/> : null} */}
                    {this.state.selectedExam ? <ExamSummary btn={false} questions={this.props.exams[this.state.selectedExam].examQuestions} exam={{
                        type: this.props.exams[this.state.selectedExam].type,
                        name: this.props.exams[this.state.selectedExam].name,
                        instructions: this.props.exams[this.state.selectedExam].instructions,
                        startTime: this.props.exams[this.state.selectedExam].startTime,
                        duration: this.props.exams[this.state.selectedExam].duration,
                        book: 'javascript',
                    }} /> : null}
                </div>
            </div>
        );
    }
}

export default ExamsList;