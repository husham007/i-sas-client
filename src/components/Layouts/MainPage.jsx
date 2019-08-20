import React from 'react'
import { Grid, Paper, Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import QuestionBankPaper from './Main/QuestionBankPaper';
import CreatExamPaper from './Main/CreatExamPaper';
import GiveExamPaper from './Main/GiveExamPaper';
import { connect } from 'react-redux'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    backgroundColor: '#000',
  },
  box: {
    margin: theme.spacing(4, 18),
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(1, 3),
    }

  },
  grid: {
    borderColor: '#fff',
    textAlign: 'center',
    width: '80%',
    margin: 'auto'
  },
}));

const Main = ({ auth }) => {
  const classes = useStyles();
  // const [spacing, setSpacing] = React.useState(2);
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
  // console.log(state);
  return {
    auth: state.rootReducer.auth,
  }
}
export default connect(mapStateToProps, null)(Main)
