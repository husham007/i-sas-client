import React, { Component } from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { Person, Close } from '@material-ui/icons';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { signIn } from '../../store/actions/authAction'
import { Redirect } from 'react-router-dom'

const styles = theme => ({
    button: {
        borderStyle: 'solid',
        borderBottomRightRadius: '5',
        borderTopRightRadius: '5',
        width: '120px',
    },
    title: {
        display: 'flex',
        justifyContent: 'space-between'
    },

})

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            email: '',
            password: ''
        }
    }

    handleToggle = () => {
        this.setState({
            open: !this.state.open
        })
    }
    handleChange = e => {
        const { id, value } = e.target
        this.setState({
            [id]: value
        })
    }
    handleSubmit = e => {
        e.preventDefault()
        this.props.signIn(this.state)
    }
    render() {

        const { open, email, password } = this.state,
            { authError, auth, classes } = this.props;
        // const { authError, auth } = this.props;
        if (auth.uid) return <Redirect to="/" />
        return (
            <div>
                <Button size="small" variant="contained" color="primary" onClick={this.handleToggle} className={classes.button}>
                    <Person style={{ marginRight: '10px' }} /> Log In
                </Button>
                <Dialog open={open} onClose={this.handleToggle} fullWidth maxWidth="xs">
                    <div className={classes.title}>
                        <DialogTitle id="form-dialog-title">Log In</DialogTitle>
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
                            id="email"
                            label="Email"
                            variant="filled"
                            type="email"
                            value={email}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="password"
                            label="Password"
                            variant="filled"
                            type="password"
                            value={password}
                            onChange={this.handleChange}
                            fullWidth
                        />

                    </DialogContent>
                    <DialogActions >
                        <Button variant="contained" color="primary" onClick={this.handleSubmit} disabled={!email || !password} fullWidth>
                            GET STARTED
                        </Button>
                        <div>
                            {authError ? <p>{authError}</p> : null}
                        </div>
                    </DialogActions>
                </Dialog>

            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}
const mapDispatchToProps = dispatch => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
}
export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(LogIn)
