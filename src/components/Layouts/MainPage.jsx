import React from 'react'
import { Grid, Paper, Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

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
  paper: {
    padding: theme.spacing(1, 2),
    margin: theme.spacing(3),
    backgroundColor: '#000',
    overflowY: 'auto',
    border: '2px',
    borderStyle: 'solid',
    borderColor: '#7f7f7f',
    height: '280px',
    '&:hover':{
      borderColor:'#ffb503',

    }
  }

}));

const Main = () => {
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
            <Paper className={classes.paper}>
              <i className="fas fa-book" style={{ fontSize: '55px', margin: 30 }}></i>

              <Typography variant="h6">Question Bank</Typography>
              <br />
              <Typography variant="overline" style={{ lineHeight: '1' }}>Quickly create great looking tests using miltiple question types and formatting options.</Typography>
            </Paper>
          </Grid>
          <Grid item sm>
            <Paper className={classes.paper}>
              <i className="fas fa-laptop-code" style={{ fontSize: '55px', margin: 30 }}></i>
              <Typography variant="h6">Create Exam</Typography>
              <br />
              <Typography variant="overline" style={{ lineHeight: '1' }}>Test can eigther be published privately to a sleect grpup or open them up to everyone with a single link and registration page.</Typography>
            </Paper>
          </Grid>
          <Grid item sm>
            <Paper className={classes.paper}>
              <i className="fas fa-chalkboard-teacher" style={{ fontSize: '55px', margin: 30 }}></i>
              <Typography variant="h6">Give Exam</Typography>
              <br />
              <Typography variant="overline" style={{ lineHeight: '1' }}>Testify instantly marks and grades your tests. Powerful reports then allow you to perform in-depth analysis across all responses.</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
export default Main
