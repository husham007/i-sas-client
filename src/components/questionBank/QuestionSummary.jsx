import React from 'react'
import moment from 'moment'
import { Card, CardActions, CardContent, Button, Typography, makeStyles } from '@material-ui/core'
// import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: '60%',
        margin: theme.spacing(4)
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}));


const QuestionSummary = ({question}) => {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    question :
                </Typography>
                <Typography variant="h5" component="h2">
                    {question.question}
                    {/* which on declare variable in javascript? */}
                {/* </Typography>
                 <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Type :
                </Typography>
                <Typography variant="h5" component="h2">
                    {question.questionType} */}
                    {/* Multiple choice */}
                {/* </Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Level :
                </Typography>
                <Typography variant="h5" component="h2">
                    {question.questionLevel} */}
                    {/* medium */}
                </Typography>
                {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Category :
                </Typography>
                <Typography variant="h5" component="h2">
                    {question.questionCategory} */}
                    {/* programming */}
                {/* </Typography> */}
                {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Answer :
                </Typography>
                <Typography variant="h5" component="h2">
                    {question.answer} */}
                    {/* let */}
                {/* </Typography> */}
                <Typography className={classes.pos} color="textSecondary">
                    Author :
                </Typography>
                <Typography variant="body2" component="p">
                    {/* {question.authorFirstName} {question.authorLastName} */}
                    Mostafa Hazareh
                </Typography>
                {/* <Typography className={classes.pos} color="textSecondary"> */}
                    {/* {moment(question.createdAt.toDate()).calendar()} */}
                    {/* 12.07.2019 */}
                {/* </Typography>  */}
            </CardContent>
        </Card>
    )
}

export default QuestionSummary
