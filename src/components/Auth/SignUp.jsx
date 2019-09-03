
import React, { Component } from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Link } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { PersonAdd, Close } from '@material-ui/icons';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { NavLink } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { signUp, signInErr } from '../../store/actions/authAction';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';

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
    }
})

const SIGN_UP = gql`
mutation signUp($email: String! $password: String! $username: String! $key: String!){
    signUp (username: $username key: $key email: $email password: $password) {
        token
    }
}    
`;

class SignUp extends Component {
    state = {
        open: false,
        username: null,
        email: null,
        key: null,
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
    handleSubmit = async e => {
        e.preventDefault(); 
          
        this.props.signUp(this.props.client, this.state, SIGN_UP);
              
      


      //  this.props.signUp(this.state)
    }
    render() {
        const { open, username, email, key, password, confirmPassword } = this.state
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
                        <div onClick={this.handleToggle} style={{ padding: '15px',cursor:'pointer' }}><Close /></div>
                    </div>
                    <DialogContent>
                        <DialogContentText>
                            Get started straight away
                        </DialogContentText>
                        <TextField
                            autoFocus
                            autoComplete='off'
                            margin="dense"
                            name="username"
                            label="Username"
                            variant="filled"
                            value={username}
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
                    <DialogActions >
                        <Button variant="contained" color="secondary" onClick={this.handleSubmit} fullWidth>
                            <NavLink to="/logedin" style={{ color: 'white', textDecoration: 'none' }}>GET REGISTERED</NavLink>
                        </Button>
                        <div className="red-text center">
                            {authError ? <p> {authError} </p> : null}
                        </div>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state)
    return{
       
    };
}

const mapDispatchToProps = dispatch => {
    return {
        signUp: (client, user, SIGN_UP) => dispatch(signUp(client, user, SIGN_UP)),
       
    };
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withApollo,
    withStyles(styles)
)(SignUp)
