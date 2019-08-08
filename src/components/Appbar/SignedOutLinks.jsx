import React from 'react'
import { Link } from 'react-router-dom'
import { Toolbar, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import logo from '../../assets/images/integrifyLogo.png'
import SignUp from '../Auth/SignUp'
import LogIn from '../Auth/LogIn'


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    logo: {
        margin: 10,
        width: 100,
        height: 47
    },
}))

const SignedOutLinks = () => {
    const classes = useStyles()
    return (
        <Toolbar className={classes.root}>
            <div style={{flex:5}}>
                <Link to="/">
                    <img alt="logo" src={logo} className={classes.logo} />
                </Link>
            </div>
            <div style={{display:'flex',justifyContent:'space-around', flex:1 }}>
                <Button variant="contained" color="secondary" component={SignUp} to="/signin">
                sign up
            </Button>
            <Button variant="contained" color="primary" component={LogIn} to="/signup">
                log in
            </Button>
            </div>
        </Toolbar>
    )
}

export default SignedOutLinks
