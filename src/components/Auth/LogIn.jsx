import React, { Component } from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { signIn, signInErr } from '../../store/actions/authAction'
import {Redirect} from 'react-router-dom'
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';


const styles = theme => ({
    button: {
        // backgroundColor: '#2b679b',
        // color:'white'
    }
})


const SIGN_IN = gql`
mutation signIn($email: String! $password: String!){
    signIn (email: $email password: $password) {
        token
    }
}    
`;

const USERS = gql`
query {
users {
    id
    }  
}
`;


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
    handleSubmit = async e => {
        e.preventDefault();
       

       await this.props.client
      .mutate({ mutation: SIGN_IN,  variables: {email: this.state.email, password: this.state.password}})
      .then( (result) => {        
          
            this.props.signIn(result);
              
      })
      .catch(err =>{console.log(err);this.props.signInErr( JSON.parse(JSON.stringify(err)))});
        
       
    }
    render() {
        // let { open, email, password } = this.state;
        // let { isLoginPending, isLoginSuccess, loginError } = this.props;
        const { open, email, password } = this.state,
            { authError,token } = this.props.rootReducer.auth;
            //console.log(this.props)
            //console.log(authError);
            //console.log(token);
        // const { authError, auth } = this.props;
       // if (auth.uid) return <Redirect to="/" />
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleToggle} style={{ borderStyle: 'solid', borderBottomRightRadius: '5', borderTopRightRadius: '5' }}>
                    Log In
                </Button>
                <Dialog open={open} onClose={this.handleToggle} fullWidth maxWidth="xs">
                    <DialogTitle id="form-dialog-title">Log In</DialogTitle>
                    <DialogContent style={{ margin: '10px 60px' }}>
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
    return {...state};
}
const mapDispatchToProps = dispatch => {
    return {
        signIn: (data) => dispatch(signIn(data)),
        signInErr: (err) =>  dispatch(signInErr(err))
    }
}



export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
    withApollo
)(LogIn)
