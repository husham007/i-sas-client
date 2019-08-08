import React from 'react'
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
// import {connect} from 'react-redux'
// import {firestoreConnect} from 'react-redux-firebase'
// import {compose} from 'redux'



const useStyles = makeStyles({
    card: {
        minWidth: '60%',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});



const QuestionDetails = (props) => {
    const classes = useStyles();
    const id= props.match.params.id
    // const {question} = props;
    // if(question){
    console.log(props)
    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      Question - {id} :
                </Typography>
                    <Typography variant="h5" component="h2">
                        {/* {question.question} */}
                        which on declare variable in javascript?
                </Typography>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Type :
                </Typography>
                    <Typography variant="h5" component="h2">
                        {/* {question.questionType} */}
                        Multiple choice
                </Typography>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Level :
                </Typography>
                    <Typography variant="h5" component="h2">
                        {/* {question.questionLevel} */}
                        Medium
                </Typography>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Category :
                </Typography>
                    <Typography variant="h5" component="h2">
                        {/* {question.questionCategory} */}
                        programming
                </Typography>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Answer :
                </Typography>
                    <Typography variant="h5" component="h2">
                        {/* {question.answer} */}
                        const
                </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        Author :
                </Typography>
                    <Typography variant="body2" component="p">
                        {/* {question.authorFirstName}
                            {question.authorLastName} */}
                        Mostafa Hazareh
                        </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" variant="outlined">Edit</Button>
                    <Button size="small" variant="outlined">Delete</Button>
                </CardActions>
            </Card>
        </div>
    )
    // }else{
    //     return(
    //         <div>
    //             <p> question is loading ...</p>
    //         </div>
    //     )
    // }

}

// const mapStateToProps = (state, ownProps) =>{
//     const id = ownProps.match.params.id
//     const questions = state.firestore.data.questions
//     const question = questions ? questions[id] : null
//     return{
//         question: question
//     }
// }

// export default compose(
//     connect(mapStateToProps),
//     firestoreConnect([
//         {collection:'questions'}
//     ])
// )(QuestionDetails)
export default QuestionDetails
