import React, { Component } from 'react'
// import moment from 'moment'
import { Card, CardContent, Typography, Table, TableBody, TableRow, TableCell, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, ExpansionPanelActions } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { ExpandMore, AddCircleOutlineSharp } from '@material-ui/icons';
import clsx from 'clsx';
import EditQuestion from './EditQuestion';
import { connect } from 'react-redux'
import { compose } from 'redux'
import DeleteQuestion from './DeleteQuestion';
import AddToExam from '../genrateExam/AddToExam';

const styles = theme => ({
    card: {
        display: 'flex',
        maxWidth: '60%',
        margin: 'auto',
        marginBottom: '12px',
        background: '#011',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '85%',
        },
        [theme.breakpoints.down('xs')]: {
            maxWidth: '95%',
        }
    },
    head: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        background: 'none'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    },
    dense: {
        marginTop: theme.spacing(2),
    },

});


class QuestionSummary extends Component {
    state = {
        createdAt: '',
    }
    handleOnChange = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
        // this.props.searchANYQuestion(this.state.search)
    }
    render() {
        const { question, exam, classes } = this.props;
        return (
            <Card className={classes.card}>
                <ExpansionPanel style={{ width: '100%', background: 'none' }}>
                    <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <Typography variant="overline" color="textSecondary" gutterBottom>
                                            question:
                            </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body1">
                                            {question.statement}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
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
                                                {question.type}
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
                                                {question.level}
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
                                                {question.category}
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
                                            {question.author.username}
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
                                                {/* {moment(this.state.createdAt.toDate()).calendar()} */}
                                                12.07.2019
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanelActions style={{ position: 'sticky', display: 'block', width: 160, paddingTop: 20 }}>
                    {(() => {
                        if (this.props.marks) {
                            return <AddToExam question={question} />
                        } else if (this.props.exam) {
                            return null
                        } else {
                            return <div>
                                <EditQuestion question={question} />
                                <DeleteQuestion question={question} />
                            </div>
                            
                        }
                    })()}
                    {/* {this.props.marks ? null : <EditQuestion question={question} />}
                    {this.props.marks  ? <AddToExam question={question} /> : <DeleteQuestion question={question} />} */}
                </ExpansionPanelActions>
            </Card>
        )
    }

}

const mapStateToProps = state => {
    //console.log(state);
    return {
        ...state,
    }
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps, null),
)(QuestionSummary)
