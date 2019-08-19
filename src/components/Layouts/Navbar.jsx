import React from 'react'
import { AppBar} from '@material-ui/core'
// import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles'
// import SignUp from '../Auth/SignUp'
// import logo from '../../assets/images/integrifyLogo.png'
// import LogIn from '../Auth/LogIn';
import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'
import SignedInLinks from '../Appbar/SignedInLinks';
import SignedOutLinks from '../Appbar/SignedOutLinks';

const useStyles = makeStyles(theme => ({
    root: {
       flexGrow: 1,
        padding: 10,
        backgroundColor: '#001',
        width:'auto'
    }
}));


const Navbar = (props) => {
    const classes = useStyles()
    // const {auth,profile} = props
   
     let token = props.auth.token;
   
    //console.log("token", token);
    const links = token ? <SignedInLinks profile={props.auth} /> : <SignedOutLinks />
    
    return (
        <div >
            <AppBar position="sticky" className={classes.root}>
            {links}
            </AppBar>
        </div>
    )
}

const mapStateToProps = state =>{
    //console.log(state);
    return{
        auth: state.rootReducer.auth,
        
    }
}

export default connect(mapStateToProps)(Navbar)
