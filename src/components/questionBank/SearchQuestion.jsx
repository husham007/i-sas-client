import React, { Component } from 'react';
import { InputBase, FormControlLabel, Switch } from '@material-ui/core'
import { fade, withStyles } from "@material-ui/core/styles";
import SearchIcon from '@material-ui/icons/Search';
import FilterQuestion from './FilterQuestion';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { searchQuestion } from '../../store/actions/bankAction'
import {searchExamQuestion} from '../../store/actions/examAction';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';

const Styles = theme => ({
    root: {
        padding: theme.spacing(4),
        height: '150px'
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

const SEARCH_QUESTION = gql`
query searchQuestion($searchInput: SearchInput!) {
    searchQuestion(searchInput: $searchInput) {
        statement
        type
        category
        level
        answer
        author{
            username
        }
    }
  }`;

class SearchQuestion extends Component {
    state = {
        filter: false,
        statement: null,

    }
    handleChange = name => e => {
        this.setState({
            [name]: e.target.checked
        })
    }
    handleOnChange = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
        // this.props.searchANYQuestion(this.state.search)
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let search = {};
        search.statement = this.state.statement
        search.type = this.props.bank.type
        search.level = this.props.bank.level
        search.category = this.props.bank.category;
        console.log(this.props)
        this.props.cas ? this.props.searchQuestion(this.props.client, search, SEARCH_QUESTION) : this.props.searchExamQuestion(this.props.client, search, SEARCH_QUESTION)
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className={classes.search}>
                        <div className={classes.searchIcon} onClick={this.handleSubmit}>
                            <SearchIcon />
                        </div>
                        <div >
                            <InputBase
                                name="statement"
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

const mapStateToProps = state => {
    return {
        bank: state.rootReducer.bank
    }
}
const mapDispatchToProps = dispatch => {
    return {
        searchQuestion: (client, search, query) => dispatch(searchQuestion(client, search, query)),
        searchExamQuestion: (client, search, query) => dispatch(searchExamQuestion(client, search, query))
    }
}

export default compose(
    withStyles(Styles),
    connect(mapStateToProps, mapDispatchToProps),
    withApollo
)(SearchQuestion);