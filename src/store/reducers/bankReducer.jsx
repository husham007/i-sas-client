import { CREATE_QUESTION, DELETE_QUESTION, EDIT_QUESTION, LOAD_QUESTIONS, LOAD_BOOK, SEARCH_QUESTION_ANY, SEARCH_PARAMETERS, SNACKBAR, LOAD_STATISTICS} from '../actions/actionTypes'



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
    searchResult: [],
    loading: false,
    types: [],
    levels: [],
    categories: [],
    bookLoading: false,
    statistics:[],
    statisticsLoading:false
};

const bankReducer = (state = initState, { type, payload }) => {

    switch (type) {
        case CREATE_QUESTION:
            console.log('created question :)', payload.question)
            return { ...state, loading: false, bookLoading: false };
        case LOAD_QUESTIONS:
            // console.log('loadQuestions :)', payload.questions)
            return { ...state, loading: true, questions: [...payload.questions] };
        case LOAD_BOOK:
            // console.log('loadBook :)', payload.book)
            return { ...state, bookLoading: true, types: [...payload.book.types], levels: [...payload.book.levels], categories: [...payload.book.categories] };
        case DELETE_QUESTION:
            console.log('this is deleted...')
            return { ...state, questions: [], loading: false };
        case EDIT_QUESTION:
            console.log('this is edited !')
            return { ...state, questions: [], loading: false };
        case SEARCH_QUESTION_ANY:
            console.log('search result!', payload)
            return { ...state, searchResult: [...payload.searchResult] };
        case SEARCH_PARAMETERS:
            return { ...state, [payload.name]: payload.value };
        case LOAD_STATISTICS:
            return { ...state,statisticsLoading:true, statistics: [...payload.data] }
        default:
            return state;
    }
};

export default bankReducer