import React from 'react'
import { Grid, Paper, Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import QuestionBankPaper from './Main/QuestionBankPaper';
import CreatExamPaper from './Main/CreatExamPaper';
import GiveExamPaper from './Main/GiveExamPaper';
import { connect } from 'react-redux'
import {loadBook, loadQuestions} from '../../store/actions/bankAction'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { compose } from 'redux';
import { withApollo } from 'react-apollo';



const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    backgroundColor: '#000',
  },
  box: {
    margin: theme.spacing(4, 0, 4, 12),
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(1, 6),
    }

  },
  grid: {
    borderColor: '#fff',
    textAlign: 'center',
    width: '90%',
    margin: 'auto'
  },
}));

const QUESTION_BOOK_BY_NAME = gql`
query questionBookByName($name: String!) {
    questionBookByName(name: $name) {
        book
        types
        categories
        levels
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

const Main = ({ auth, bank,loadBook,client,loadQuestions }) => {
  const classes = useStyles();
  // const [spacing, setSpacing] = React.useState(2);
  

  (async () => {
    await client
      .query({ query: QUESTIONS })
      .then(({ data }) => {
        // console.log(data) 
        //console.log(props.bank.questions);
        if (data && !bank.loading) {
          loadQuestions(data.questions.page);
        }

        // questions = [...questions, ...data.questions.page];

      })
      .catch(err => { throw err });

  })();

  const { loading, error, data } = useQuery(QUESTION_BOOK_BY_NAME, {
    variables: { name: "javascript" },
    fetchPolicy: 'network-and-cache',
  });

  if (loading) return <div>loading</div>;
  //if (error) throw error;
  if (!bank.bookLoading && data) {
    // console.log(data);
    loadBook(data.questionBookByName);
  }
  return (
    <div>
      <Paper className={classes.root} square>
        <Box className={classes.box}>
          <Typography variant="h5">
            Integrify Student Assessment System
          </Typography>
          <br />
          <Typography variant="body2">
            Testify is a system to create a test of quiz for students,
            we can identify more here ...
          </Typography>
        </Box>
        <Grid container justify="center" className={classes.grid}>
          <Grid item sm>
            <QuestionBankPaper auth={auth} />
          </Grid>
          <Grid item sm>
            <CreatExamPaper auth={auth} />
          </Grid>
          <Grid item sm>
            <GiveExamPaper />
          </Grid>
        </Grid>
      </Paper>
      
    </div>
  );
}

const mapStateToProps = state => {
   console.log(state);
  return {
    // auth: state.rootReducer.auth,
    auth: state.rootReducer.auth,
    bank: state.rootReducer.bank
  }
}
const mapDispatchToProps = dispatch => {
  return {
    loadQuestions: (data) => dispatch(loadQuestions(data)),
    loadBook: (data) => dispatch(loadBook(data)),

  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withApollo
) (Main)
