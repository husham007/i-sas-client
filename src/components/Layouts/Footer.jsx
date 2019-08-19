import React from 'react'
import { Grid, Typography, Link } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import FacebookIcon from '../../icons/FacebookIcon'
import LinkedInIcon from '../../icons/LinkedInIcon'
import TwitterIcon from '../../icons/TwitterIcon'
import InstagramIcon from '../../icons/InstagramIcon'
import GithubIcon from '../../icons/GithubIcon'

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#ffb503',
        display: 'flex',
        flexWrap: 'no-wrap',
        padding: theme.spacing(3),
    },
    link: {
        padding: theme.spacing(1),
        marginTop: 0,
        transform: 'scale(1)',
        transition: '.5s ease-in-out',
        '&:hover': {
            marginTop: -10,
            transform: 'scale(1.3)',
            transition: '.2s ease-in-out',
        }
    },
}))

const Footer = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="center"
            >
                <Grid item xs={2} md={6}>
                    <Typography style={{ fontSize: 'calc(0.6vw + 10px)' }}>
                        Student Assessment System. &copy; 2019
                    </Typography>
                </Grid>
                <Grid item xs={1} md={3} >
                    <Link href="#" color="inherit" className={classes.link} >
                        <LinkedInIcon />
                    </Link>
                    <Link href="#" color="inherit" className={classes.link} >
                        <FacebookIcon />
                    </Link>
                    <Link href="#" color="inherit" className={classes.link}>
                        <TwitterIcon />
                    </Link>
                    <Link href="#" color="inherit" className={classes.link}>
                        <InstagramIcon />
                    </Link>
                    <Link href="#" color="inherit" className={classes.link}>
                        <GithubIcon />
                    </Link>
                </Grid>
            </Grid>
        </div>
    )
}

export default Footer
