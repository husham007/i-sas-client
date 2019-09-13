import React from 'react'
import { Grid } from '@material-ui/core'
import TypesStatistics from './TypesStatistic';
import CategoriesStatistics from './CategoriesStatistics';
import LevelsStatistics from './LevelsStatistics';

const QuestionStatistics = (props) => {
    console.log(props)
    return (
        <Grid container style={{ marginTop: 75, }}>
            <Grid item sm={4} xs={8}>
                <TypesStatistics bank={props.bank.statistics} statistic={"types"} />
            </Grid>
            <Grid item sm={4} xs={8}>
                <CategoriesStatistics bank={props.bank.statistics} statistic={"categories"} />
            </Grid>
            <Grid item sm={4} xs={8}>
                <LevelsStatistics bank={props.bank.statistics} statistic={"levels"} />
            </Grid>
        </Grid>
    )
}

export default QuestionStatistics
