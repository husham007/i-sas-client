import React, { Component } from 'react';
import { Icon, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, FormControl, FormLabel, RadioGroup, FormControlLabel, InputLabel, Input, Select, Fab, Radio, MenuItem, FormHelperText, Typography, TextField } from '@material-ui/core'
import { Add, Close } from '@material-ui/icons';
import clsx from 'clsx';
import { withStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createQuestion } from '../../store/actions/bankAction'
import { snackBarMsg } from '../../store/actions/snackBarAction'
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
// import { Redirect } from 'react-router-dom'

const styles = theme => ({
    root: {
        display: "flex",
        // flexDirection: 'column',
    },
    dialog: {
        padding: theme.spacing(2),
        backgroundColor: '#011'
    },
    formControl: {
        margin: theme.spacing(2),
        minWidth: 120
    },
    addIcon: {
        position: "fixed",
        [theme.breakpoints.down('xs')]: {
            position: 'relative',
        }
    },
    title: {
        display: 'flex',
        justifyContent: 'space-between'
    },
icon:{
    marginLeft:10
}
});

const CREATE_QUESTION = gql`
        mutation createQuestion($statement: String! $category: String! $type: String! $options: [String!] $level: String! $answer: String! $book: String!){
        createQuestion(statement: $statement category: $category type:$type options:$options level:$level answer:$answer book:$book ) {
            id
        }
    }    
    `;

class CreateQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            selected: null,
            hasError: false,
            type: '',
            options: [],
            currentOption: '',
            statement: '',
            category: '',
            level: '',
            answer: '',
            book: 'javascript'
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
        if (name === 'type') {
            this.setState({
                options: [],
                currentOption: '',
                statement: '',
                category: '',
                level: '',
                answer: '',
            })
        }
    }
    handleChangeOption = e => {
        // console.log(this.state)
        const { value } = e.target
        this.setState({
            currentOption: value,

        })
    }
    handleRadios = name => ({ target: { value } }) => {
        this.setState({
            [name]: value
        })
    }
    handleOption = (e) => {
        e.preventDefault()
        this.setState({
            options: [...this.state.options, this.state.currentOption],
            currentOption: ''
        })
    }
    handleRemoveOption = e => {
        e.preventDefault()
        const { name, id } = e.target;
        this.setState({
            options: this.state.options.filter(option => option !== id)
        })

    }
    handleSubmit = e => {
        e.preventDefault()
        console.log(this.state)
        // this.props.history.push('/questionBank');
        const { statement, type, category, level, answer, options } = this.state
        this.props.createQuestion(this.props.client, this.state, CREATE_QUESTION);
        // this.props.snackBarMsg('New Question is Created!')
        this.setState({ hasError: false });
        if (!statement || !type || !category || !level || !answer || !options) {
            this.setState({ hasError: true });
        } else {
            this.handleToggle();
            this.setState({
                type: '',
                statement: '',
                category: '',
                level: '',
                answer: '',
                options: ['option1']
            })
        }
    }

    render() {
        const { open, hasError, type, level, category, statement, answer, options, currentOption } = this.state;
        const { classes } = this.props;
        const { levels, types, categories } = this.props.bank;
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
                            <DialogTitle id="form-dialog-title" style={{ paddingBottom: 0 }}>Create Question</DialogTitle>
                            <div onClick={this.handleToggle} style={{ padding: '15px', cursor: 'pointer' }}><Close /></div>
                        </div>
                        <DialogContent>
                            <DialogContentText>
                                To create a new question.
                        </DialogContentText>
                            <FormControl fullWidth className={classes.formControl} error={hasError} >
                                <InputLabel htmlFor="type">Question Type : </InputLabel>
                                <Select
                                    name="type"
                                    value={type}
                                    onChange={this.handleChange}
                                    input={<Input id="type" />}
                                >
                                    {types.map(type => <MenuItem value={type} key={type}>{type}</MenuItem>)}
                                </Select>
                                {hasError && <FormHelperText>This is required!</FormHelperText>}
                            </FormControl>
                            <br />
                            <FormControl className={classes.formControl} error={hasError} fullWidth>
                                <TextField
                                    id="outlined-dense-multiline"
                                    label="Question:"
                                    margin="dense"
                                    // variant="outlined"
                                    multiline
                                    rowsMax="5"
                                    rows="2"
                                    name="statement"
                                    value={statement}
                                    onChange={this.handleChange}
                                    className={clsx(classes.textField, classes.dense)}
                                />
                                {hasError && <FormHelperText>This is required!</FormHelperText>}
                            </FormControl>
                            <br />
                            {type === 'MCQ' ? <FormControl style={{ display: 'flex' }} className={classes.formControl}>
                                <div >
                                    <InputLabel htmlFor="option">Option : </InputLabel>
                                    <Input name="option" value={this.state.currentOption} onChange={this.handleChangeOption} />
                                    <Fab size="small" color="primary" onClick={this.handleOption} disabled={!currentOption}><Add /></Fab>
                                </div>
                                <div>
                                    {options.map((option, i) => <div style={{display:'flex',minWidth:'120px'}}><Typography>{option}</Typography><Icon className={clsx(classes.icon, 'fa fa-minus-circle')} style={{ color: 'red' }} name={option} id={option} onClick={this.handleRemoveOption} /></div>)}
                                </div>
                            </FormControl>
                                : null}
                            <br />
                            <FormControl fullWidth className={classes.formControl} error={hasError} >
                                <InputLabel htmlFor="category">Question Category : </InputLabel>
                                <Select
                                    name="category"
                                    value={category}
                                    onChange={this.handleChange}
                                    input={<Input id="category" />}
                                >
                                    {categories.map(category => <MenuItem value={category} key={category}>{category}</MenuItem>)}
                                </Select>
                                {hasError && <FormHelperText>This is required!</FormHelperText>}
                            </FormControl>
                            <br />
                            <FormControl component="fieldset" className={classes.formControl} error={hasError} fullWidth>
                                <FormLabel>Question Level : </FormLabel>
                                <RadioGroup name="level" value={level} onChange={this.handleRadios('level')} style={{ display: 'inline-block' }}>
                                    {levels.map(level => <FormControlLabel
                                        value={level}
                                        key={level}
                                        id={level}
                                        name={level}
                                        control={<Radio color="primary" />}
                                        label={level}
                                    />
                                    )}
                                </RadioGroup>
                                {hasError && <FormHelperText>This is required!</FormHelperText>}
                            </FormControl>
                            <br />

                            {(() => {
                                if (type === 'MCQ') {
                                    return <FormControl fullWidth className={classes.formControl} error={hasError} >
                                        <InputLabel htmlFor="answer">Answer : </InputLabel>
                                        <Select
                                            name="answer"
                                            value={answer}
                                            onChange={this.handleChange}
                                            input={<Input id="answer" />}
                                        >
                                            {options.map(option => <MenuItem value={option} key={option}>{option}</MenuItem>)}
                                        </Select>
                                        {hasError && <FormHelperText>This is required!</FormHelperText>}
                                    </FormControl>
                                } else if (type === 'True/False') {
                                    return <FormControl fullWidth className={classes.formControl} error={hasError} >
                                        <InputLabel htmlFor="answer">Answer : </InputLabel>
                                        <Select
                                            name="answer"
                                            value={answer}
                                            onChange={this.handleChange}
                                            input={<Input id="answer" />}
                                        >
                                            {['true', 'false'].map(option => <MenuItem value={option} key={option}>{option}</MenuItem>)}
                                        </Select>
                                        {hasError && <FormHelperText>This is required!</FormHelperText>}
                                    </FormControl>
                                } else {
                                    return <FormControl className={classes.formControl} error={hasError} fullWidth>
                                        <InputLabel htmlFor="answer">Answer : </InputLabel>
                                        <Input id="answer" name="answer" value={answer} onChange={this.handleChange} />
                                        {hasError && <FormHelperText>This is required!</FormHelperText>}
                                    </FormControl>
                                }
                            })()}

                            <br />
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" color="primary" onClick={this.handleSubmit} disabled={!statement || !type || !category || !level || !answer}>
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
        bank: state.rootReducer.bank
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createQuestion: (client, question, query) => dispatch(createQuestion(client, question, query)),
        snackBarMsg: (msg) => dispatch(snackBarMsg(msg))
    }
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
    withApollo
)(CreateQuestion)