import React, { Component } from 'react';
import { InputBase, FormControlLabel, Switch } from '@material-ui/core'
import { fade, withStyles } from "@material-ui/core/styles";
import SearchIcon from '@material-ui/icons/Search';
import FilterQuestion from './FilterQuestion';



const Styles = theme => ({
    root: {
        padding: theme.spacing(4),
        height:'150px'
    },
    search: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(1),
        borderRadius: '28px',
        backgroundColor: fade(theme.palette.common.black, 0.50),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.black, 0.75),
        },
        width: '50%',
        [theme.breakpoints.down('sm')]: {
            width: '80%',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': {
            color: '#ffb503'
        }
    },
    inputRoot: {
        color: 'inherit',
        // minWidth: '90%'
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 220,
            '&:focus': {
                width: 350,
            },
        },
    },

})

class SearchQuestion extends Component {
    state = {
        filter: false,
        search: '',

    }
    handleChange = name => e => {
        this.setState({
            [name]: e.target.checked
        })
    }
    handleOnChange = e => {
        const { value } = e.target;
        this.setState({
            search: value
        })
    }
    render() {
        const { classes } = this.props;
       
        return (
            <div className={classes.root}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <div >
                            <InputBase
                                onChange={this.handleOnChange}
                                placeholder="Search for Questions  …"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                    </div>
                    <FormControlLabel
                        style={{ marginLeft: 20 }}
                        control={<Switch name="filter" value="filter" checked={this.state.filter} onChange={this.handleChange('filter')} color="primary" />}
                        label="Filter"
                    />
                </div>
                {this.state.filter === true ? <FilterQuestion filter={this.state.filter} search={this.state.search} /> : null}
            </div>
        );
    }
}

export default withStyles(Styles)(SearchQuestion);