const initState = {
    questions: [
        {
            id: 1,
            questionType: 'fill blanks',
            question: 'what is array ?',
            questionCategory: 'javascript',
            questionLevel: 'medium',
            answer: 'a variable that contains many values.',
            // createdAt: ''
        },
        {
            id: 2,
            questionType: 'multiple choice',
            question: 'which one is variable ?',
            questionCategory: 'javascript',
            questionLevel: 'easy',
            answer: 'a variable that contains many values.',
            // createdAt: ''
        },
        {
            id: 3,
            questionType: 'Single choice',
            question: 'what is arrow function ?',
            questionCategory: 'javascript',
            questionLevel: 'hard',
            answer: 'a variable that contains many values.',
            // createdAt: ''
        },

    ]

};

const bankReducer = (state = initState, action) => {
    switch (action.type) { 
        case 'CREATE_QUESTION_SUCCESS':
            console.log('created question :)', action.question)
            return { ...state, questions: [...state.questions, action.question] };
        case 'CREATE_QUESTION_ERROR':
            console.log('create question error :(', action.err)
            return state;
        default:
            return state;
    }
};

export default bankReducer