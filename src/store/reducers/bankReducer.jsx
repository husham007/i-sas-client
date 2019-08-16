import { CREATE_QUESTION, DELETE_QUESTION, EDIT_QUESTION, SEARCH_QUESTION_ANY } from '../actions/actionTypes'

const initState = {
    questions: [
        {
            id: '1',
            questionType: 'fill blanks',
            question: 'what is array ?',
            questionCategory: 'javascript',
            questionLevel: 'medium',
            answer: 'a variable that contains many values.',
            // createdAt: ''
        },
        {
            id: '2',
            questionType: 'multiple choice',
            question: 'which one is variable ?',
            questionCategory: 'javascript',
            questionLevel: 'easy',
            answer: 'a variable that contains many values.',
            // createdAt: ''
        },
        {
            id: '3',
            questionType: 'Single choice',
            question: 'what is arrow function ?',
            questionCategory: 'javascript',
            questionLevel: 'hard',
            answer: 'a variable that contains many values.',
            // createdAt: ''
        },

    ],
    // question: ''
};

const bankReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case CREATE_QUESTION:
            console.log('created question :)', payload.question)
            return { ...state, questions: [...state.questions, payload.question] };
        case DELETE_QUESTION:
        console.log('this is deleted...')
            const questions = [...state.questions];
            questions.splice(payload.index, 1);
            return { ...state, questions: questions };
        case EDIT_QUESTION:
        console.log('this is edited !')
            const Qs = [...state.questions];
            Qs.splice(payload.index, 1,payload.index);
            return { ...state, questions: Qs };
        case SEARCH_QUESTION_ANY:
        console.log('search result!')
            const filteredQ = [...state.questions];
            const searched = filteredQ.filter( q =>{
                return q.question.toLowerCase().includes(payload.text.toLowerCase())
            })
            const result = payload.text === '' ? null : searched;
            return { ...state, questions: result };
            default:
            return state;
    }
};

export default bankReducer