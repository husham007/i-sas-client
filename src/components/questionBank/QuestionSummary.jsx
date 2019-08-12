import React, { Component } from 'react'
// import moment from 'moment'
import { Card, CardActions, CardContent, Typography, Table, TableRow, TableCell } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import DeleteAlert from '../Alerts/DeleteAlert';
import EditQuestion from './EditQuestion';


const styles = theme => ({
    card: {
        display: 'flex',
        flexWrap: 'wrap',
        maxWidth: '60%',
        margin: 'auto',
        marginBottom: '12px',
        background: '#011'
    },
});


class QuestionSummary extends Component {

    render() {
        const { question, classes } = this.props;
        // console.log(question)
        return (
            <Card className={classes.card}>
                <CardContent style={{ flex: 3 }}>
                    <Table>
                        <TableRow>
                            <TableCell>
                                <Typography variant="overline" color="textSecondary" gutterBottom>
                                    question :
                            </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body1">
                                    {question.question}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography variant="overline" color="textSecondary" gutterBottom>
                                    Type :
                            </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body1">
                                    {question.questionType}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography variant="overline" color="textSecondary" gutterBottom>
                                    Level :
                            </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body1">
                                    {question.questionLevel}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography variant="overline" color="textSecondary" gutterBottom>
                                    Category :
                            </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body1">
                                    {question.questionCategory}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography variant="overline" color="textSecondary" gutterBottom>
                                    Answer :
                            </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body1">
                                    {question.answer}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography variant="overline" color="textSecondary">
                                    Author :
                            </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body">
                                    Mostafa Hazareh
                            </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography variant="overline" color="textSecondary">
                                    Issue by :
                            </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography className={classes.pos} color="textSecondary">
                                    {/* {moment(question.createdAt.toDate()).calendar()} */}
                                    12.07.2019
                            </Typography>
                            </TableCell>
                        </TableRow>
                    </Table>
                </CardContent>
                <CardActions style={{ flex: 1, alignSelf: 'flex-start', marginTop: 20, marginBottom: 10 }}>
                    {/* <Button size="small" variant="outlined" color="primary" >Edit <Edit style={{ marginLeft: 10 }} /></Button> */}
                    {/* <Button size="small" variant="outlined" onClick={() => { deleteQuestion(question.id) }} style={{ color: 'red' }}>Delete <Delete style={{ marginLeft: 10 }} /></Button> */}
                    <EditQuestion question={question} />
                    <DeleteAlert question={question} />
                </CardActions>
            </Card>
        )
    }

}

export default withStyles(styles)(QuestionSummary)