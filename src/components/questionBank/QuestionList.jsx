import React from 'react'
import QuestionSummary from './QuestionSummary';
import { Link } from 'react-router-dom'

const QuestionList = ({ questions }) => {
    return (
        <div>
            {questions && questions.map( question =>{
                return(
                    <Link to={"/questionBank/question/" + question.id} key={question.id}>
                        <QuestionSummary question={question} />
                    </Link>
                )
            })}
        </div>
        // <div>
        //     <QuestionSummary />
        //     <QuestionSummary />
        //     <QuestionSummary />
        // </div>
    )
}

export default QuestionList
