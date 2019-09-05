import React, { Component } from 'react';
import { List, ListItem, Divider } from '@material-ui/core';
import ExamSummary from './ExamSummary';
import {connect} from 'react-redux'
import {selectExam} from '../../store/actions/examAction'

class ExamsList extends Component {
    state = {
        selectedExam: this.props.selected,

    }

    
    handleGet = (e) => {
        const { id } = e.target;
        // this.setState({
        //     // [id]: value,
        //     selectedExam: id,
        // })
        this.props.selectExam(id)
    }
    render() {
        console.log(this.props.selected)
        console.log(this.props.exams)
        return (
            <div style={{ display: 'flex' }}>
                <div>
                    <List component="nav" style={{ width: 220, background: 'none', height: '100%', marginTop: -20, maxHeight: 470 }}>
                        {this.props.exams.map((exam, id) => <div key={exam.id}><ListItem id={id} onClick={this.handleGet} button>{exam.name} </ListItem><Divider /></div>)}

                    </List>
                </div>
                <div>
                    {this.props.selected ? <ExamSummary btn={false} remove={false} questions={this.props.exams[this.props.selected].examQuestions} exam={{
                        id: this.props.exams[this.props.selected].id,
                        type: this.props.exams[this.props.selected].type,
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

const mapStateToProps = state =>{
    return{
        selected: state.rootReducer.exam.selected
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        selectExam: (id) => dispatch(selectExam(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExamsList);