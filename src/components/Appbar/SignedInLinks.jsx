import React from 'react'
import { Tabs, Tab, Toolbar, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authAction'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/integrifyLogo.png'

const useStyles = makeStyles(theme => ({
    logo: {
        margin: 10,
        width: 100,
        height: 47
    },
    tabs: {
        flexGrow: 1,
        margin: 25,
        maxWidth: '60%'
    },
    menuItems: {
        textTransform: 'capitalize',
        fontSize: 16,
        color: '#fff'
    },
    shortIndicator: {
        maxWidth: 60,
        marginLeft: theme.spacing(6),
    }
}));


const SignedInLinks = (props) => {
    const classes = useStyles()
    console.log(props)
    const [value, setValue] = React.useState(0);

    function handleChange(event, newValue) {
        setValue(newValue);
    }
    return (
        <Toolbar>
            <Link to="/">
                <img alt="logo" src={logo} className={classes.logo} />
            </Link>
            <Tabs value={value} onChange={handleChange} classes={{ indicator: classes.shortIndicator }} indicatorColor="primary">
                <Tab label="home" component={Link} to="/" className={classes.menuItems} />
                <Tab label="Question Bank" component={Link} to="/questionBank" className={classes.menuItems} />
                <Tab label="about us" component={Link} to="/aboutUs" className={classes.menuItems} />
                <Tab label="contacts" component={Link} to="/contacts" className={classes.menuItems} />
            </Tabs>
            <Button onClick={props.signOut} variant="outlined" color="primary" component={Link} to="/">
                log out
            </Button>
            {" "}
            <Typography className={classes.menuItems}>{props.profile.firstName} {props.profile.lastName}</Typography>
        </Toolbar>
    )
}

const mapStateToProps = state => {
    console.log(state)
    return state;
}
const mapDispatchToProps = dispatch => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks)
