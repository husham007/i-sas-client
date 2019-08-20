import { CREATE_QUESTION, DELETE_QUESTION, EDIT_QUESTION, LOAD_QUESTIONS, LOAD_BOOK, SEARCH_QUESTION_ANY } from '../actions/actionTypes'



/*
const QUESTIONS = gql`
query {
questions {
    page {
        id
    }  
}
}
`;
console.log(client);
client.query({ query: QUESTIONS })
    .then((result) => {

        //this.props.signIn(result);
        console.log(result);

    })
    .catch(err => { console.log(err); this.props.signInErr(JSON.parse(JSON.stringify(err))) });

*/
const initState = {
   deleted: null,
   questions: [],
   loading: false,
   types: [],
   levels: [],
   categories: [],
   bookLoading: false,
};

const bankReducer = (state = initState, { type, payload }) => {
    
    switch (type) {
        case CREATE_QUESTION:
            console.log('created question :)', payload.question)
            return { ...state, questions: [...state.questions, payload.question] };
        case LOAD_QUESTIONS:
            console.log('loadQuestions :)', payload.questions)
            return { ...state, loading: true, questions: [...payload.questions] };
        case LOAD_BOOK:
        console.log('loadBook :)', payload.book)
        return { ...state, bookLoading: true, types: [...payload.book.types], levels: [...payload.book.levels], categories: [...payload.book.categories] };
        case DELETE_QUESTION:
            console.log('this is deleted...')           
            return { ...state, questions: [], loading: false};
        case EDIT_QUESTION:
            console.log('this is edited !')
            const Qs = [...state.questions];
            Qs.splice(payload.index, 1, payload.index);
            return { ...state, questions: Qs };
        case SEARCH_QUESTION_ANY:
            console.log('search result!')
            const filteredQ = [...state.questions];
            const searched = state.questions.filter(q => {
                return q.question.toLowerCase().includes(payload.text.toLowerCase())
            })
            const result = payload.text === '' ? null : searched;
            return { questions: result, filteredQ};
        default:
            return state;
    }
};

export default bankReducer