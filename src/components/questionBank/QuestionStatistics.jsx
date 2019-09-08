import React from 'react'
import TypesStatistics from './TypesStatistic';
import CategoriesStatistics from './CategoriesStatistics';
import LevelsStatistics from './LevelsStatistics';

const QuestionStatistics = (props) => {
    console.log(props)
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 60 }}>
            <TypesStatistics bank={props.bank.statistics} statistic={"types"} />
            <CategoriesStatistics bank={props.bank.statistics} statistic={"categories"} />
            <LevelsStatistics bank={props.bank.statistics} statistic={"levels"} />
        </div>
    )
}

export default QuestionStatistics
