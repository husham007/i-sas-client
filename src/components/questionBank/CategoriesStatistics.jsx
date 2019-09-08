import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
// const data = [
//     { name: 'MCQ', value: 15 },
//     { name: 'SHORT', value: 25 },
//     { name: 'Programming', value: 10 },
//     { name: 'Long', value: 30 },
// ];
const COLORS = ['#20639b', '#3caea3', '#f6d55c', '#ed553b', '#607d8b'];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};


export default class CategoriesStatistics extends PureComponent {
    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/c9pL8k61/';
    render() {
        let statistics = this.props.bank.filter(stat =>
            stat.statistic === this.props.statistic
        )
        let data = statistics.map(statistic => {
            return {
                name: statistic.key,
                value: parseInt(statistic.value)
            }
        })
        console.log(data)
        return (
            <div style={{ height: "40vh", width: "30vw", }}>
                <div style={{ marginBottom: 20, fontSize: '1.6rem', fontFamily: 'Times New Roman' }}>Question Categories:</div>
                <ResponsiveContainer>
                    {/* <div>Categories</div> */}
                    <PieChart width={200} height={400}>
                        <Pie
                            data={data}
                            cx={100}
                            cy={80}
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => <Cell key={`cell - ${index}`} fill={COLORS[index % COLORS.length]} />)}
                        </Pie>
                        <Legend verticalAlign="top" layout="vertical" align="left" height={36} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        );
    }
}






































