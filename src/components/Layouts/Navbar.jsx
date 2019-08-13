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
    }
}));


const Navbar = ({ auth, profile }) => {
    const classes = useStyles()
    // const {auth,profile} = props
    const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />
    
    return (
        <div >
            <AppBar position="sticky" className={classes.root}>
            {links}
            </AppBar>
        </div>
    )
}

const mapStateToProps = state =>{
    // console.log(state);
    return{
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(Navbar)
