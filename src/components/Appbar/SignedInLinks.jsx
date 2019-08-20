import React from 'react'
import { CssBaseline, Divider, Drawer, Tabs, Tab, Toolbar, Button, Typography, IconButton, Hidden, List, ListItem } from '@material-ui/core'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import { Menu, Home, Archive, Contacts, PersonPin } from '@material-ui/icons'
// import HomeIcon from '@material-ui/icons/Home';
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authAction'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/integrifyLogo.png'


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    logo: {
        margin: 10,
        width: 100,
        height: 47
    },
    tabs: {
        flexGrow: 1,
        margin: 25,
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    menuItems: {
        textTransform: 'capitalize',
        fontSize: 16,
        color: '#fee',
        width: 'auto',

    },
    menuBtns: {
        textTransform: 'capitalize',
        fontSize: 14,
        color: '#fee',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between'
    },
    menuIcons: {
        color: '#ffb503',
        marginRight: '10px'
    },
    nav: {
        margin: 'auto',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        }
    },
    shortIndicator: {
        maxWidth: 60,
        marginLeft: theme.spacing(6),
    },
    controllers: {
        display: 'inline-flex',
        justifyContent: 'space-between',
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        }
    },
    drawer: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: '#001',
    },
    menuButton: {
        color: 'white',
        '&:hover': {
            color: '#ffb503',
        },
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

const drawerWidth = 200;

const SignedInLinks = (props) => {
    const classes = useStyles()
    const { container } = props;
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [value, setValue] = React.useState(0);

    function handleChange(event, newValue) {
        setValue(newValue);
    }
    function handleToggle() {
        setMobileOpen(!mobileOpen);
    }

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                <ListItem>
                    <Button onClick={handleToggle} component={Link} to="/" className={classes.menuBtns}><Home className={classes.menuIcons} />home</Button>
                </ListItem>
                <ListItem>
                    <Button onClick={handleToggle} component={Link} to="/questionBank" className={classes.menuBtns}><Archive className={classes.menuIcons} />question bank</Button>
                </ListItem>
                <ListItem>
                    <Button onClick={handleToggle} component={Link} to="/aboutUs" className={classes.menuBtns}><PersonPin className={classes.menuIcons} />about us</Button>
                </ListItem>
                <ListItem>
                    <Button onClick={handleToggle} component={Link} to="/contacts" className={classes.menuBtns}><Contacts className={classes.menuIcons} />contacts</Button>
                </ListItem>
                <div className={classes.toolbar} />
                <Divider />
                <ListItem>
                    <Typography variant="caption" style={{ margin: 'auto' }} gutterBottom>{props.profile.username} </Typography>
                </ListItem>
                <ListItem>
                    <Button style={{ width: '160px' }} variant="outlined" onClick={props.signOut} color="primary" component={Link} to="/">
                        <PersonOutlineIcon style={{ marginRight: '10px' }} /> log out
                    </Button>
                </ListItem>
            </List>
        </div>
    );
        console.log(props);
    return (
        <Toolbar className={classes.root}>
            <CssBaseline />
            <div style={{ display: 'flex' }}>
                <IconButton color="inherit" edge="start" onClick={handleToggle} className={classes.menuButton}>
                    <Menu />
                </IconButton>

                <Link to="/">
                    <img alt="logo" src={logo} className={classes.logo} />
                </Link>

                <Tabs value={value} onChange={handleChange} className={classes.nav} classes={{ indicator: classes.shortIndicator }} indicatorColor="primary">
                    <Tab label="home" component={Link} to="/" className={classes.menuItems} />
                    <Tab label="Question Bank" component={Link} to="/questionBank" className={classes.menuItems} />
                    <Tab label="about us" component={Link} to="/aboutUs" className={classes.menuItems} />
                    <Tab label="contacts" component={Link} to="/contacts" className={classes.menuItems} />
                </Tabs>
            </div>
            <div className={classes.controllers}>
                <Typography variant="h3" className={classes.menuItems} style={{ margin: 'auto 10px' }} gutterBottom>{props.profile.username}</Typography>
                <Button size="small" onClick={props.signOut} variant="outlined" color="primary" component={Link} to="/">
                    log out<PersonOutlineIcon style={{ marginLeft: '10px' }} />
                </Button>
            </div>
            <nav className={classes.drawer}>
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleToggle}
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
        </Toolbar >
    )
}

const mapStateToProps = state => {
    // console.log(state)
    return state;
}
const mapDispatchToProps = dispatch => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks)
