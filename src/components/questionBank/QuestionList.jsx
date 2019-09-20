import React from 'react'
import QuestionSummary from './QuestionSummary';
// import { Link } from 'react-router-dom'

const QuestionList = ({ questions }) => {
    if(questions === null){
        return(
            <div> nothing in the List</div>
        )
    }else{
        return (
            <div style={{ marginTop: '60px' }}>
                {questions && questions.map((question) => <QuestionSummary question={question} key={question.id} />)}
                {/* return(
                    <Link to={"/questionBank/question/" + question.id} key={question.id}>
                    <QuestionSummary question={question} key={question.id}/>
                    </Link>
                )
            )} */}
            </div>
        )
    }
    
}

export default QuestionList
