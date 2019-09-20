import React, { Component } from 'react';
import { FormControl, InputLabel, Input, MenuItem, Select } from '@material-ui/core'
import { withStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux'
import { compose } from 'redux'
import { setSearchParameters } from '../../store/actions/bankAction'


const styles = theme => ({
    root: {
        display: "flex",
        justifyContent: 'space-between',
        maxWidth: '60%',
        margin: 'auto',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '80%',
        },
        [theme.breakpoints.down('xs')]: {
            maxWidth: '100%',
        },

    },
    formControl: {
        flex: 1,
        maxWidth: '25%',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '30%'
        }
    },

});


class FilterQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // id: this.props.question.id,
            // question: this.props.question.question,
            // questionType: this.props.question.questionType,
            // questionCategory: this.props.question.questionCategory,
            // questionLevel: this.props.question.questionLevel,
            // answer: this.props.question.answer

            type: null,
            category: null,
            level: null,
            // search: this.props.search
        }
    }
    handleChange = e => {
        // console.log(this.state)
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
        this.props.setSearchParameters(name,value)
    }
    handleClick = () => {

    }
    render() {
        const { classes } = this.props,
            { type, category, level } = this.state,
            { levels, types, categories } = this.props.bank;
        console.log(this.state)
        console.log(this.props)
        return (
            <div className={classes.root}>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="type">Question Type : </InputLabel>
                    <Select
                        name="type"
                        value={type}
                        onChange={this.handleChange}
                        input={<Input id="type" />}
                    >
                        <MenuItem value={null}><em>None</em></MenuItem> && {types.map(type => <MenuItem value={type} key={type}>{type}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="questionType">by Level : </InputLabel>
                    <Select
                        name="level"
                        value={level}
                        onChange={this.handleChange}
                        input={<Input id="level" />}
                    >
                        <MenuItem value={null}><em>None</em></MenuItem> && {levels.map(level => <MenuItem value={level} key={level}>{level}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="category">Question Category : </InputLabel>
                    <Select
                        name="category"
                        value={category}
                        onChange={this.handleChange}
                        input={<Input id="category" />}
                    >
                        <MenuItem value={null}><em>None</em></MenuItem> && {categories.map(category => <MenuItem value={category} key={category}>{category}</MenuItem>)}
                    </Select>
                </FormControl>
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
        setSearchParameters: (name, value) => dispatch(setSearchParameters(name,value))
    }
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(FilterQuestion);