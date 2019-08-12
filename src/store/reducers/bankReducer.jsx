import { CREATE_QUESTION, DELETE_QUESTION, EDIT_QUESTION } from '../actions/actionTypes'

const initState = {
    index: null,
    editing: false,
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
            const questions = [...state.questions];
            questions.splice(payload.index, 1);
            return { ...state, questions: questions };
        case EDIT_QUESTION:
            const questions = [...state.questions];
            questions.splice(payload.index, 1,payload.question);
            return { ...state, questions: questions };
        default:
            return state;
    }
};

export default bankReducer