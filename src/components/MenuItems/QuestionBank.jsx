import React from 'react'
// import QuestionList from '../questionBank/QuestionList'
import { AppBar, Tabs, Tab, Typography, Box, makeStyles } from '@material-ui/core'
import CreateQuestion from '../questionBank/CreateQuestion';
import { connect } from 'react-redux'
import qM from '../../assets/images/qM.jpg'
import SearchQuestion from '../questionBank/SearchQuestion';
import QuestionSummary from '../questionBank/QuestionSummary';
import gql from 'graphql-tag';
import { loadQuestions, loadBook } from '../../store/actions/bankAction';
import { compose } from 'redux';
import { withApollo } from 'react-apollo';
import { useQuery } from '@apollo/react-hooks';
import SnackBar from '../Alerts/SnackBar';
import LoadingProgress from '../Alerts/LoadingProgress';
import QuestionStatistics from '../questionBank/QuestionStatistics';
import QuestionStatisticsBarChart from '../questionBank/QuestionStatisticsBarChart';
import { loadStatistics } from '../../store/actions/bankAction';



// const USERS = gql`
// query {
// users {
//     id
//     }  
// }
// `;

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
            options
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

const GET_STATISTICS = gql`
query getStatistics($book: String!) {
    getStatistics(book: $book) {
        statistic
        key
        value
    }
  }`;


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        minHeight: '78vh',
        backgroundImage: `url(${qM})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'noRepeat',
        backgroundAttachment: 'fixed',
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

const QuestionBank = (props) => {
    //console.log(props);
const statistics = useQuery(GET_STATISTICS, {
        variables: { book: "javascript" },
        fetchPolicy: "cache-first",
    });

    const { loading, error, data } = useQuery(QUESTION_BOOK_BY_NAME, {
        variables: { name: "javascript" },
        fetchPolicy: "cache-first",
    });
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    function handleChange(event, newValue) {
        setValue(newValue);
    }

    (async () => {
        if (props.bank.loading) {

        } else {
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
        }

    })();

    

    if(statistics.loading){
       return <LoadingProgress />
    };
    if (!props.bank.statisticsLoading) {
        // console.log(statistics);
        props.loadStatistics(statistics.data.getStatistics);
    }else{

    }




    

    if (loading) return <LoadingProgress />;
    if (error) console.log(error);
    if (!props.bank.bookLoading) {
        // console.log(data);
        props.loadBook(data.questionBookByName);
    }

    return (
        <div value={value} className={classes.root}>
            <AppBar position="sticky" color="secondary">
                <Tabs value={value} onChange={handleChange} indicatorColor="primary" style={{ marginLeft: '8%' }}>
                    <Tab label="CREATE QUESTION" />
                    <Tab label="SEARCH QUESTION" />
                    <Tab label="STATISTICS" />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0} >
                <CreateQuestion />
                {props.bank && props.bank.questions.map((question) => <QuestionSummary question={question} key={question.id} remove={false} />)}
            </TabPanel>
            <TabPanel value={value} index={1}>
                <SearchQuestion cas={true} />
                <div style={{ textAlign: 'center' }}>
                    {props.bank && props.bank.searchResult.length > 0 ? <Typography variant="h6" color="primary"> {props.bank.searchResult.length} result(s) found.</Typography> : <Typography variant="h6" color="primary">Search is Empty</Typography>}
                </div>
                {props.bank && props.bank.searchResult.map((question) => <QuestionSummary question={question} key={question.id} remove={false} />)}
            </TabPanel>
            <TabPanel value={value} index={2}>
                <QuestionStatisticsBarChart bank={props.bank.statistics} />
                <QuestionStatistics bank={props.bank} />
            </TabPanel>
            {props.snackBarMessage ? <SnackBar message={props.snackBarMessage} /> : null}
        </div>
    )
}

const mapStateToProps = state => {
    console.log(state)
    return {
        bank: state.rootReducer.bank,
        snackBarMessage: state.rootReducer.snackBar.snackBarMessage,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadQuestions: (data) => dispatch(loadQuestions(data)),
        loadBook: (data) => dispatch(loadBook(data)),
        loadStatistics: data => dispatch(loadStatistics(data))
    }
}


export default compose(connect(mapStateToProps, mapDispatchToProps),
    withApollo
)(QuestionBank)