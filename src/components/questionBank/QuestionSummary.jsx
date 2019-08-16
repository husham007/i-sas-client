import React, { Component } from 'react'
// import moment from 'moment'
import { Card, CardActions, CardContent, Typography, Table, TableBody, TableRow, TableCell, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteAlert from '../Alerts/DeleteAlert';
import EditQuestion from './EditQuestion';

const styles = theme => ({
    card: {
        display: 'flex',
        flexWrap: 'wrap',
        maxWidth: '60%',
        margin: 'auto',
        marginBottom: '12px',
        background: '#011',
        [theme.breakpoints.down('sm')]:{
            maxWidth: '85%',
            marginRight:'-5px'
        }
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
});


class QuestionSummary extends Component {
    render() {
        const { question, classes } = this.props;
        // console.log(question)
        return (
            <Card className={classes.card}>
                <ExpansionPanel style={{width:'100%',background:'none'}}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} style={{ display: 'flex'}}>   
                        <Table style={{flex:4,}}>
                            <TableBody>
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
                            </TableBody>
                        </Table>
                        <CardActions style={{ flex: 1 }}>
                            <DeleteAlert question={question} />
                            <EditQuestion question={question} />
                        </CardActions>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <CardContent>
                            <Table>
                                <TableBody>
                                    
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
                                            <Typography variant="body1" style={{ fontSize: 'calc(0.6vw + 9px)' }}>
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
                                            <Typography variant="body1">
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
                                </TableBody>
                            </Table>
                        </CardContent>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </Card>
        )
    }

}

export default withStyles(styles)(QuestionSummary)