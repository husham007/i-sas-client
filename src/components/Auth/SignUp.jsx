
import React, { Component } from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Link, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { PersonAdd, Close } from '@material-ui/icons';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { NavLink } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { signUp } from '../../store/actions/authAction'

const styles = theme => ({
    button: {
        borderStyle: 'solid',
        borderBottomRightRadius: '5',
        borderTopRightRadius: '5',
        width: '120px'
    },
    title: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    actions: {
        display: 'flex',
        flexDirection: 'column',
    }
})

class SignUp extends Component {
    state = {
        open: false,
        firstName: '',
        lastName: '',
        email: '',
        key: '',
        password: '',
        confirmPassword: ''
    }
    handleToggle = () => {
        this.setState({
            open: !this.state.open
        })
    }
    handleChange = e => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }
    handleSubmit = e => {
        e.preventDefault()
        this.props.signUp(this.state)
    }
    render() {
        const { open, firstName, lastName, email, key, password, confirmPassword } = this.state
        // { classes } = this.props
        const { auth, authError, classes } = this.props
        // if (auth.uid) return <Redirect to="/" />
        return (
            <div>
                <Button size="small" variant="contained" color="secondary" onClick={this.handleToggle} className={classes.button}>
                    <PersonAdd style={{ marginRight: '10px' }} />    Sign Up
                </Button>
                <Dialog open={open} onClose={this.handleToggle} fullWidth maxWidth="xs">
                    <div className={classes.title}>
                        <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
                        <div onClick={this.handleToggle} style={{ padding: '15px', cursor: 'pointer' }}><Close /></div>
                    </div>
                    <DialogContent>
                        <DialogContentText>
                            Get started straight away
                        </DialogContentText>
                        <TextField
                            autoFocus
                            autoComplete='off'
                            margin="dense"
                            name="firstName"
                            label="First Name"
                            variant="filled"
                            value={firstName}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            autoComplete='off'
                            margin="dense"
                            name="lastName"
                            label="Last Name"
                            variant="filled"
                            value={lastName}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            autoComplete='off'
                            margin="dense"
                            name="email"
                            label="Email Address"
                            variant="filled"
                            type="email"
                            value={email}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            autoComplete='off'
                            margin="dense"
                            name="key"
                            label="Key"
                            variant="filled"
                            value={key}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            name="password"
                            label="Password"
                            variant="filled"
                            type="password"
                            value={password}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            name="confirmPassword"
                            label="Confirm Password"
                            variant="filled"
                            type="password"
                            value={confirmPassword}
                            onChange={this.handleChange}
                            fullWidth
                        />
                    </DialogContent>
                    <Link
                        component="button"
                        variant="body2"
                        color="primary"
                        onClick={this.handleToggle}
                    >
                        I'm already registered
                    </Link>
                    <DialogActions className={classes.actions}>
                        <Button variant="contained" color="secondary" onClick={this.handleSubmit} fullWidth>
                            <NavLink to="/logedin" style={{ color: 'white', textDecoration: 'none' }}>GET REGISTERED</NavLink>
                        </Button>
                        <Typography color="error" variant="subtitle1">
                            {authError ? <p> {authError} </p> : null}
                        </Typography>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state)
    return {

    };
}

const mapDispatchToProps = dispatch => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    };
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(SignUp)
