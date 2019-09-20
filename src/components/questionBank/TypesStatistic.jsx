import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
// const data = [
//     { name: 'MCQ', value: 15 },
//     { name: 'SHORT', value: 25 },
//     { name: 'Programming', value: 10 },
//     { name: 'Long', value: 30 },
// ];
const COLORS = ['#20639b', '#3caea3', '#f6d55c', '#ed553b', '#607d8b', 'Purple'];
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


export default class TypesStatestics extends PureComponent {
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
            <div style={{ height: "60vh", width: "30vw",marginLeft:40 }}>
                <div style={{ marginBottom: 20, fontSize: '1.6rem', fontFamily: 'Times New Roman' }}>Question Types:</div>
                <ResponsiveContainer>
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






































// import React, { Component } from 'react';

// class QuestionStatestics extends Component {
//     state = {
//         types: ['MCQ', 'short', 'programming', 'long'],
//         categories: ['general', 'loop', 'array', 'functions'],
//         levels: ['easy', 'intermediate', 'hard', 'advance']
//     }
//     render() {
//         return (
//             <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between',height:'80vh' }}>
//                 <div style={{ marginLeft: 40, border:'none',borderBottom:'2px solid', width:60 }}>Types </div>
//                 <div style={{ display: 'flex',flexDirection:'column', justifyContent: 'space-evenly', marginLeft: 40, flexBasis: '30%' }}>
//                     {this.state.types.map(type => <div style={{ display: 'flex',}}><div style={{ backgroundColor: 'red',color:'#fff', width: 220, height: 30, borderRadius: '0 6px 6px 0', }}>{type} </div> 8</div>)}

//                 </div>

//                 <div style={{ marginLeft: 40, border: 'none', borderBottom: '2px solid', width: 80  }}>Categories </div>
//                 <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', flexBasis: '30%', marginLeft: 40, }}>
//                     {this.state.categories.map(type => <div style={{ display: 'flex', }}><div style={{ backgroundColor: 'yellow', color: '#000', width: 220, height: 30, borderRadius: '0 6px 6px 0', }}>{type} </div> 10</div>)}
//                 </div>

//                 <div style={{ marginLeft: 40, border: 'none', borderBottom: '2px solid', width: 60,marginLeft: 40,  }}>Levels </div>
//                 <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', flexBasis: '30%', marginLeft: 40, }}>
//                     {this.state.levels.map(type => <div style={{ display: 'flex', }}><div style={{ backgroundColor: 'blue', color: '#fff', width: 320, height: 30, borderRadius: '0 6px 6px 0', }}>{type} </div> 14</div>)}
//                 </div>

//             </div>
//         );
//     }
// }

// export default QuestionStatestics;