import React from 'react'
// import QuestionList from '../questionBank/QuestionList'
import { AppBar, Tabs, Tab, Typography, Box, makeStyles, Button, TextField } from '@material-ui/core'
import CreateExam from './CreateExam';
import { connect } from 'react-redux'
import examBC from '../../assets/images/exam.jpg'
import gql from 'graphql-tag';
import { loadQuestions, loadBook } from '../../store/actions/bankAction';
import { compose } from 'redux';
import { withApollo } from 'react-apollo';
import ExamSummary from './ExamSummary';
import SearchQuestion from '../questionBank/SearchQuestion'
import QuestionSummary from '../questionBank/QuestionSummary';
import { showExamSearch, loadExams } from '../../store/actions/examAction'
import { useQuery } from '@apollo/react-hooks';
import ExamsList from './ExamsList';
import BankSnackBar from '../Alerts/SnackBar';


// const USERS = gql`
// query {
// users {
//     id
//     }  
// }
// `;
const EXAMS = gql`
query
{
    exams{
    id
    name
    type
    instructions
    startTime
    duration
    examQuestions {
      question{
          id
        statement
        type
        category
        level
        answer
        author{
            username
        }
      }
      marks
    }
  }
}`;
const QUESTIONS = gql`
query
{
    questions {
        page {
            id
            statement
            level
            category
            answer
            type
            author {
                username
            }        
        }
    }
}`;

const QUESTION_BOOK_BY_NAME = gql`
query questionBookByName($name: String!) {
    questionBookByName(name: $name) {
        book
        types
        categories
        levels
    }
  }`;

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        minHeight: '78vh',
        backgroundImage: `url(${examBC})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'noRepeat',
        backgroundAttachment: 'fixed',
    },
    box: {
        width: '80%',
        backgroundColor: '#011',
        margin: 'auto',
        textAlign: 'center',
        paddingTop: 40,
        height: '20vh',
        marginTop: theme.spacing(10),
    },

}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

const Exam = (props) => {
    console.log(props.snackBarMessage);
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [val, setVal] = React.useState(false);
    function handleChange(event, newValue) {
        setValue(newValue);
    }

    (async () => {
        await props.client
            .query({ query: QUESTIONS })
            .then(({ data }) => {
                // console.log(data) 
                //console.log(props.bank.questions);
                if (!props.bank.loading) {
                    props.loadQuestions(data.questions.page);
                }

                // questions = [...questions, ...data.questions.page];

            })
            .catch(err => { throw err });

    })();

    let { loading, error, data } = useQuery(QUESTION_BOOK_BY_NAME, {
        variables: { name: "javascript" },
    });
    if (loading) return null;
    if (error) console.log(error);
    if (!props.bank.bookLoading) {
        // console.log(data);
        props.loadBook(data.questionBookByName);
    }

    // let { loading, error, data } = useQuery(EXAMS);
    // if (loading) return null;
    // if (error) console.log(error);
    // if (!props.examLoaded) {
    //     // console.log(data);
    //     props.loadExams({ data });
    // }
    (async () => {
        await props.client
            .query({ query: EXAMS })
            .then(({ data }) => {
                // console.log(data) 
                //console.log(props.bank.questions);
                if (!props.examLoaded) {
                    props.loadExams(data);
                }

                // questions = [...questions, ...data.questions.page];

            })
            .catch(err => { throw err });

    })();

    let result = [];
    if (props.exam) {
        console.log(props)
        if (props.searchActive) {
            result = props.searchResult
            console.log(result)
        } else {
            result = props.bank.questions
        }

    }

    return (
        <div value={value} className={classes.root}>
            <AppBar position="sticky" color="secondary">
                <Tabs value={value} onChange={handleChange} indicatorColor="primary" style={{ marginLeft: '8%' }}>
                    <Tab label="CREATE EXAM" />
                    <Tab label="All EXAMS" />
                    <Tab label="GROUP MEMBERS" />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0} >
                <CreateExam />
                {(() => {
                    if (props.exam) {
                        return <div>
                            <ExamSummary exam={props.exam} btn={true} remove={true}/>
                            <SearchQuestion cas={false} />
                        </div>
                    } else {
                        return <Box className={classes.box}>CREATE A NEW EXAM HERE !</Box>
                    }
                })()}

                {result.map((question) => <QuestionSummary marks={true} question={question} key={question.id} remove={false}/>)}
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ExamsList exams={props.exams} remove={false} />

            </TabPanel>
            <TabPanel value={value} index={2}>
                <h2>students list here!</h2>
            </TabPanel>
            {props.snackBarMessage ? <BankSnackBar message={props.snackBarMessage} /> : null}
        </div>
    )
}

const mapStateToProps = state => {
    console.log(state)
    return {
        snackBarMessage: state.rootReducer.snackBar.snackBarMessage,
        bank: state.rootReducer.bank,
        exam: state.rootReducer.exam.exam,
        exams: state.rootReducer.exam.exams,
        searchActive: state.rootReducer.exam.isSearchActive,
        examSearch: state.rootReducer.exam.showExamSearch,
        searchResult: state.rootReducer.exam.searchResult,
        examLoaded: state.rootReducer.exam.examLoaded
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadQuestions: (data) => dispatch(loadQuestions(data)),
        loadBook: (data) => dispatch(loadBook(data)),
        showExamSearch: (value) => dispatch(showExamSearch(value)),
        loadExams: (data) => dispatch(loadExams(data))

    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withApollo
)(Exam)