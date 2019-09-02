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
        padding: theme.spacing(3),
        position:'sticky'
    },
    main: {
        display: 'flex',
        justifyContent: 'space-between',
        maxWidth: '88%',
        margin: 'auto'
    },
    link: {
        padding: theme.spacing(0.5)
    },
}))

const Footer = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Grid
                container
                direction="row"
                // justify="flex-end"
                alignItems="center"
                className={classes.main}
            >
                <Grid item>
                    <Typography variant="body1" style={{ fontSize: 'calc(0.6vw + 10px)', color: 'black' }}>
                        Student Assessment System. &copy; 2019
                    </Typography>
                </Grid>
                <Grid item>
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
