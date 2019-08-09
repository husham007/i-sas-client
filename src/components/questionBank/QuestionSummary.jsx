import React from 'react'
// import moment from 'moment'
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core'
import {Edit , Delete} from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles(theme => ({
    card: {
        display:'flex',
        maxWidth: '60%',
        margin: 'auto',
        marginBottom:'12px',
        background:'#011'
    },
    title: {
        fontSize: 14,
    },
    pos: {
        // marginBottom: 12,
    },
}));


const QuestionSummary = ({question}) => {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardContent style={{ flex: 3 }}>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    question :
                </Typography>
                <Typography variant="h5" component="h2">
                    {question.question}
                </Typography>
                 <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Type :
                </Typography>
                <Typography variant="h5" component="h2">
                    {question.questionType}
                </Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Level :
                </Typography>
                <Typography variant="h5" component="h2">
                    {question.questionLevel}
                </Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Category :
                </Typography>
                <Typography variant="h5" component="h2">
                    {question.questionCategory}
                </Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Answer :
                </Typography>
                <Typography variant="h5" component="h2">
                    {question.answer}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    Author :
                </Typography>
                <Typography variant="body2" component="p">
                   Mostafa Hazareh
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {/* {moment(question.createdAt.toDate()).calendar()} */}
                    12.07.2019
                </Typography> 
            </CardContent>
            <CardActions style={{flex:1, alignSelf:'flex-start', marginTop:'20px'}}>
                <Button size="small" variant="outlined" color="primary">Edit <Edit style={{marginLeft:10}} /></Button>
                <Button size="small" variant="outlined" style={{ color: 'red' }}>Delete <Delete style={{ marginLeft: 10 }} /></Button>
            </CardActions>
        </Card>
    )
}

export default QuestionSummary
