import React, { Component } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, FormControl, TextField, InputAdornment, MenuItem, FormHelperText } from '@material-ui/core'
import { withStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Edit, Close } from '@material-ui/icons'
// import { Redirect } from 'react-router-dom'
import Slide from '@material-ui/core/Slide';
import { withApollo } from 'react-apollo';
import clsx from 'clsx';


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
    textField: {
        margin: theme.spacing(0,1),
    },
    dense: {
        marginTop: 19,
    },
});

class EditExam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            selected: null,
            hasError: false,
            name: this.props.exam.name,
            type: this.props.exam.type,
            instructions: this.props.exam.instructions,
            startTime: this.props.exam.startTime,
            duration: this.props.exam.duration,
            book: 'javascript',
            options: []
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
    handleRadios = name => ({ target: { value } }) => {
        this.setState({
            [name]: value
        })
    }
    handleSubmit = e => {
        e.preventDefault()
        const { name, type, startTime, duration, instructions } = this.state
        // this.props.editQuestion(this.props.client, this.state);

        this.setState({ hasError: false });
        if (!name || !type || !instructions || !duration || !startTime) {
            this.setState({ hasError: true });
        } else {
            this.handleToggle()
        }
    }
    render() {
        const { open, hasError } = this.state;
        const { classes } = this.props;
        const { name, type, startTime, duration, instructions } = this.state
        const types = ['Exam', 'Quiz', 'Assignment'];
        console.log(startTime)
        // const { levels, types, categories } = this.props.bank;
        return (
            <form className={classes.root}>
                <Button size="small" onClick={this.handleToggle} variant="outlined" color="primary" style={{paddingLeft: 20,width:110 }}>
                    <div className={classes.edit}>Edit</div>
                    <Edit className={classes.editBtn} />
                </Button>
                <Dialog open={open} onClose={this.handleToggle} TransitionComponent={Transition} keepMounted fullWidth>
                    <div className={classes.title}>
                        <DialogTitle id="form-dialog-title" style={{ paddingBottom: 0 }} >Edit Exam</DialogTitle>
                        <div onClick={this.handleToggle} style={{ padding: '15px', cursor: 'pointer' }}><Close /></div>
                    </div>
                    <DialogContent>
                        <DialogContentText>
                            To edit this Exam.
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
                                    defaultValue={startTime}
                                    // value={startTime}
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
                            Edit
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
        // exam: state.rootReducer.exam,
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         editQuestion: (client, question) => dispatch(editQuestion(client, question))
//     }
// }

export default compose(
    withStyles(styles),
    connect(mapStateToProps, null),
    withApollo
)(EditExam)