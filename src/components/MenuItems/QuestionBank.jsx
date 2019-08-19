import React from 'react'
import QuestionList from '../questionBank/QuestionList'
import { AppBar, Tabs, Tab, Typography, Box, makeStyles } from '@material-ui/core'
import CreateQuestion from '../questionBank/CreateQuestion';
import { connect } from 'react-redux'
import qM from '../../assets/images/qM.jpg'
import SearchQuestion from '../questionBank/SearchQuestion';
import QuestionSummary from '../questionBank/QuestionSummary';
import gql from 'graphql-tag';
import { loadQuestions } from '../../store/actions/bankAction';
import { compose } from 'redux';
import { withApollo } from 'react-apollo';
import { useQuery } from '@apollo/react-hooks';

const USERS = gql`
query {
users {
    id
    }  
}
`;

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

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        minHeight: '76vh',
        backgroundImage: `url(${qM})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'noRepeat',
        backgroundAttachment: 'fixed',
    },
    shortIndicator: {
        maxWidth: 60,
        marginLeft: theme.spacing(6),
    }
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
    // console.log(props)
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    function handleChange(event, newValue) {
        setValue(newValue);
    }
    //console.log(props.client.link);
    /*
    let questions = [];
     props.client
    .query({ query: QUESTIONS})
    .then(({data}) => {        
        console.log(data)
         // props.loadQuestions(data);
         questions = [...questions, ...data.questions.page];
            
    })
    .catch(err =>{throw err});

    */
    

    const { loading, error, data } = useQuery(QUESTIONS);
    
    if (loading) return null;
    if (error) console.log(error);
    
   

    
    return (
        <div value={value} className={classes.root}>
            <AppBar position="sticky" color="secondary">
                <Tabs value={value} onChange={handleChange} classes={{ indicator: classes.shortIndicator }} indicatorColor="primary">
                    <Tab label="CREATE" />
                    <Tab label="SEARCH" />
                    <Tab label="STATISTICS" />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0} >
                <CreateQuestion />
                {/* <QuestionList questions={questions} /> */}
                {data.questions.page && data.questions.page.map((question) => <QuestionSummary question={question} key={question.id} />)}
            </TabPanel>
            <TabPanel value={value} index={1}>
                <SearchQuestion />
                {props.questions && props.questions.map((question) => <QuestionSummary question={question} key={question.id} />)}
            </TabPanel>
            <TabPanel value={value} index={2}>
                statistics
            </TabPanel>
        </div>
    )
}

const mapStateToProps = state => {
    console.log(state);
    return {
        questions: state.rootReducer.bank.questions,
        // auth: state.firebase.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadQuestions: (data) => dispatch(loadQuestions(data)),
        
    }
}


// export default compose(
//     connect(mapStateToProps),
//     firestoreConnect([
//         {collection: 'questions'}
//     ])
// )(QuestionBank)



export default compose(connect(mapStateToProps, mapDispatchToProps),
    withApollo
)(QuestionBank)