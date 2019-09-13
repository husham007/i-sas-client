import React from 'react'
import { Link } from 'react-router-dom'
import { Toolbar, IconButton, Divider, Drawer, Hidden, List, ListItem, CssBaseline } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
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
    controllers: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '180px'
    },
    drawer: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    Btns: {
        display: 'inline-flex',
        justifyContent: 'space-between',
        width: '250px',
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        background: '#000',
    },
    menuButton: {
        color: 'white',
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },

}))

const drawerWidth = 200;

const SignedOutLinks = (props) => {
    const { container } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    function handleDrawerToggle() {
        setMobileOpen(!mobileOpen);
    }

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                <ListItem>
                    <SignUp />
                </ListItem>
                <ListItem>
                    <LogIn />
                </ListItem>
            </List>
        </div>
    );

    return (
        <Toolbar className={classes.root}>
            <CssBaseline />
            <div className={classes.controllers}>
                <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} className={classes.menuButton}>
                    <MenuIcon />
                </IconButton>
                <div>
                    <Link to="/">
                        <img alt="logo" src={logo} className={classes.logo} />
                    </Link>
                </div>
            </div>
            <div className={classes.Btns}>
                <SignUp />
                <LogIn />
            </div>

            <nav className={classes.drawer}>
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>

                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
        </Toolbar>
    )
}

export default SignedOutLinks
