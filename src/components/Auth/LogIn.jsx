import React, { Component } from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { Person, Close } from '@material-ui/icons';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { signIn, signInErr } from '../../store/actions/authAction'
import {Redirect} from 'react-router-dom'
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';


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
      .catch(err =>{this.props.signInErr( JSON.parse(JSON.stringify(err)))});
        
       
    }
    render() {

        const { open, email, password } = this.state,
            { authError,token } = this.props.rootReducer.auth,
            //console.log(this.props)
            //console.log(authError);
            //console.log(token);
            { classes } = this.props;
        // const { authError, auth } = this.props;
       // if (auth.uid) return <Redirect to="/" />
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
