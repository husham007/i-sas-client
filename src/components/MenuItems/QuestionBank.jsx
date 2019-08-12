import React from 'react'
import QuestionList from '../questionBank/QuestionList'
import { AppBar, Tabs, Tab, Typography, Box, makeStyles } from '@material-ui/core'
import CreateQuestion from '../questionBank/CreateQuestion';
import { connect } from 'react-redux'
import QuestionMark from '../../assets/images/questionMark.jpg'


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        height: '100%',
        backgroundImage: `url(${QuestionMark})`,
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
    console.log(props)
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    function handleChange(event, newValue) {
        setValue(newValue);
    }

    const { questions } = props
    return (
        <div value={value} className={classes.root}>
            <AppBar position="sticky" color="secondary">
                <Tabs value={value} onChange={handleChange} classes={{ indicator: classes.shortIndicator }} indicatorColor="primary">
                    <Tab label="CREATE" />
                    <Tab label="SEARCH" />
                    <Tab label="STATESTICS" />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0} >
                <CreateQuestion questions={questions} />
                <QuestionList
                    questions={questions}
                />
            </TabPanel>
            <TabPanel value={value} index={1}>
                search
            </TabPanel>
            <TabPanel value={value} index={2}>
                statestics
            </TabPanel>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        questions: state.bank.questions,
        // auth: state.firebase.auth
    }
}

// export default compose(
//     connect(mapStateToProps),
//     firestoreConnect([
//         {collection: 'questions'}
//     ])
// )(QuestionBank)

export default connect(mapStateToProps)(QuestionBank)