import React, { Component } from 'react';
import clsx from 'clsx';
import { Icon, Typography, Fab, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, FormControl, FormLabel, RadioGroup, FormControlLabel, InputLabel, Input, Select, Radio, MenuItem, FormHelperText } from '@material-ui/core'
import { withStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux'
import { compose } from 'redux'
import { editQuestion } from '../../store/actions/bankAction'
import { Edit, Close, Add } from '@material-ui/icons'
// import { Redirect } from 'react-router-dom'
import Slide from '@material-ui/core/Slide';
import { withApollo } from 'react-apollo';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});



const styles = theme => ({
    root: {
        display: "flex",
        flexDirection: 'column',
    },
    formControl: {
        margin: theme.spacing(2),
        minWidth: 120
    },
    editBtn: {
        marginLeft: 10,
        [theme.breakpoints.down('xs')]: {
            marginLeft: 0,
        }
    },
    edit: {
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
    },
    title: {
        display: 'flex',
        justifyContent: 'space-between'
    },
});

class EditQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            selected: null,
            hasError: false,
            id: this.props.question.id,
            statement: this.props.question.statement,
            type: this.props.question.type,
            category: this.props.question.category,
            level: this.props.question.level,
            answer: this.props.question.answer,
            book: 'javascript',
            options: this.props.question.options,
            currentOption: ''
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
    handleChangeOption = e => {
        // console.log(this.state)
        const { value } = e.target
        this.setState({
            currentOption: value,

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
    handleRadios = name => ({ target: { value } }) => {
        this.setState({
            [name]: value
        })
    }
    handleSubmit = e => {
        e.preventDefault()
        const { statement, type, category, level, answer, options } = this.state
        this.props.editQuestion(this.props.client, this.state);

        this.setState({ hasError: false });
        if (!statement || !type || !category || !level || !answer || !options) {
            this.setState({ hasError: true });
        } else {
            this.handleToggle()
        }
    }
    render() {
        const { open, hasError } = this.state;
        const { classes } = this.props;
        const { statement, type, category, level, answer, currentOption, options } = this.state;
        const { levels, types, categories } = this.props.bank;
        return (
            <form className={classes.root}>
                <Button size="small" onClick={this.handleToggle} color="primary" >
                    <div className={classes.edit}>Edit</div>
                    <Edit className={classes.editBtn} />
                </Button>
                <Dialog open={open} onClose={this.handleToggle} TransitionComponent={Transition} keepMounted fullWidth>
                    <div className={classes.title}>
                        <DialogTitle id="form-dialog-title" style={{ paddingBottom: 0 }} >Edit Question</DialogTitle>
                        <div onClick={this.handleToggle} style={{ padding: '15px', cursor: 'pointer' }}><Close /></div>
                    </div>
                    <DialogContent>
                        <DialogContentText>
                            To edit this question.
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
                        {type === 'MCQ' ? <FormControl style={{ display: 'flex' }} className={classes.formControl}>
                            <div >
                                <InputLabel htmlFor="option">Option : </InputLabel>
                                <Input name="option" value={this.state.currentOption} onChange={this.handleChangeOption} />
                                <Fab size="small" color="primary" onClick={this.handleOption} disabled={!currentOption}><Add /></Fab>
                            </div>
                            <div>
                                {options.map((option, i) => <div key={i}><Typography>{option}</Typography><Icon className={clsx(classes.icon, 'fa fa-minus-circle')} style={{ color: 'red' }} name={option} id={option} onClick={this.handleRemoveOption} /></div>)}
                            </div>
                        </FormControl>
                            : null}
                        <br />
                        <FormControl className={classes.formControl} error={hasError} fullWidth>
                            <InputLabel htmlFor="statement">Question : </InputLabel>
                            <Input id="statement" name="statement" value={statement} onChange={this.handleChange} />
                            {hasError && <FormHelperText>This is required!</FormHelperText>}
                        </FormControl>
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
                            EDIT
                        </Button>
                        <Button variant="contained" onClick={this.handleToggle} color="secondary">
                            CANCEL
                        </Button>
                    </DialogActions>
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
        editQuestion: (client, question) => dispatch(editQuestion(client, question))
    }
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
    withApollo
)(EditQuestion)