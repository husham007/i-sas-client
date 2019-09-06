import React, { Component } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, FormControl, Fab, MenuItem, FormHelperText, TextField, InputAdornment } from '@material-ui/core'
import { Add, Close } from '@material-ui/icons';
import clsx from 'clsx';
import { withStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createSoftExam } from '../../store/actions/examAction'
// import { withApollo } from 'react-apollo';
// import gql from 'graphql-tag';
// import { Redirect } from 'react-router-dom'

const styles = theme => ({
    root: {

    },
    dialog: {
        padding: theme.spacing(2),
        backgroundColor: '#011'
    },
    formControl: {
        // margin: theme.spacing(2),
        minWidth: 120
    },
    addIcon: {
        position: "fixed",
    },
    title: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    dense: {
        marginTop: 19,
    },

});

// const CREATE_QUESTION = gql`
//         mutation createQuestion($statement: String! $category: String! $type: String! $level: String! $answer: String! $book: String!){
//         createQuestion(statement: $statement category: $category type:$type level:$level answer:$answer book:$book ) {
//             id
//         }
//     }    
//     `;

class CreateExam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            selected: null,
            hasError: false,
            type: '',
            name: '',
            instructions: [],
            startTime: '',
            duration: '',
            book: 'javascript',
            author: this.props.author,
            loading: false
            // questions: []

        }
    }
    handleToggle = () => {
        this.setState({
            open: !this.state.open
        })
    }
    handleChange = e => {
        // console.log(this.state)
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }
    handleSubmit = e => {
        e.preventDefault()
        console.log(this.state)
        // this.props.history.push('/questionBank');
        const { type, name, instructions, startTime, duration, book, author } = this.state
        const exam = { name, type, instructions, startTime, duration, book, author };
        this.props.createSoftExam(exam);
        

        this.setState({ hasError: false });
        if (!name || !type || !instructions || !startTime || !duration) {
            this.setState({ hasError: true });
        } else {
            this.handleToggle();
            this.setState({
                type: '',
                name: '',
                instructions: '',
                startTime: '',
                duration: ''
            })
        }
    }

    render() {
        const { open, hasError, type, name, instructions, startTime, duration } = this.state;
        const { classes } = this.props;
        const types = ['Exam', 'Quiz', 'Assignment'];
        //console.log(this.state)
        // const { levels, types, categories } = this.props.bank;
        // const { auth } = this.props
        // if (!auth.uid) return <Redirect to="/" />
        return (
            <form className={classes.root}>
                <Fab size="large" onClick={this.handleToggle} className={classes.addIcon} aria-label="Add" color="secondary" >
                    <Add />
                </Fab>
                <Dialog open={open} onClose={this.handleToggle} fullWidth>
                    <form className={classes.dialog}>
                        <div className={classes.title}>
                            <DialogTitle id="form-dialog-title" style={{ paddingBottom: 0 }}>Create Exam</DialogTitle>
                            <div onClick={this.handleToggle} style={{ padding: '15px', cursor: 'pointer' }}><Close /></div>
                        </div>
                        <DialogContent>
                            <DialogContentText>
                                To create a new Exam.
                        </DialogContentText>
                            <FormControl error={hasError} fullWidth>
                                <TextField
                                    select
                                    label="Exam Type:"
                                    name="type"
                                    value={type}
                                    onChange={this.handleChange}
                                    margin="normal"
                                    variant="outlined"
                                    className={clsx(classes.textField, classes.dense)}
                                >
                                    {types.map(type => <MenuItem value={type} key={type + 1}>{type}</MenuItem>)}
                                </TextField>
                                {hasError && <FormHelperText>This is required!</FormHelperText>}
                            </FormControl>
                            <FormControl error={hasError} fullWidth>
                                <TextField
                                    autoComplete="off"
                                    id="name"
                                    value={name}
                                    name="name"
                                    onChange={this.handleChange}
                                    label="Exam Name:"
                                    margin="dense"
                                    variant="outlined"
                                    className={clsx(classes.textField, classes.dense)}
                                />
                                {hasError && <FormHelperText>This is required!</FormHelperText>}
                            </FormControl>
                            <FormControl error={hasError} fullWidth>
                                <TextField
                                    id="outlined-dense-multiline"
                                    label="Exam Instructions:"
                                    margin="dense"
                                    variant="outlined"
                                    multiline
                                    rowsMax="4"
                                    name="instructions"
                                    value={instructions}
                                    onChange={this.handleChange}
                                    className={clsx(classes.textField, classes.dense)}
                                />
                            </FormControl>
                            <br />
                            <div style={{ display: 'flex' }}>
                                <FormControl error={hasError} fullWidth>
                                    <TextField
                                        onChange={this.handleChange}
                                        name="startTime"
                                        value={startTime}
                                        id="datetime-local"
                                        label="start time"
                                        type="datetime-local"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        className={clsx(classes.textField, classes.dense)}
                                    />
                                </FormControl>
                                <FormControl error={hasError} fullWidth>
                                    <TextField
                                        className={clsx(classes.dense, classes.textField)}
                                        variant="outlined"
                                        type="Number"
                                        label="duration"
                                        value={duration}
                                        name="duration"
                                        onChange={this.handleChange}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">min</InputAdornment>,
                                        }}
                                    />
                                </FormControl>
                            </div>
                        </DialogContent>
                        <DialogActions style={{ marginRight: 25 }}>
                            <Button variant="contained" color="primary" onClick={this.handleSubmit} disabled={!name || !type || !instructions || !startTime || !duration}>
                                CREATE
                        </Button>
                            <Button variant="contained" onClick={this.handleToggle} color="secondary">
                                CANCEL
                        </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        author: state.rootReducer.auth.id,
        exam: state.exam
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // createQuestion: (client, question, query) => dispatch(createQuestion(client, question, query))
        createSoftExam: exam => dispatch(createSoftExam(exam))
    }
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
    // withApollo
)(CreateExam)