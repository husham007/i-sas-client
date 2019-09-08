import React, { PureComponent } from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
const data = [
    {
        name: 'Types', mcq: 1, tf: 2, short: 10,
    },
    {
        name: 'Categories', arr: 4, loo: 5, fun: 6,
    },
    {
        name: 'Levels', easy: 7, diff: 8, hard: 9,
    },
];

export default class Example extends PureComponent {
    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/vxq4ep63/';
    render() {
        
        return (
            <div style={{ height: "70vh", width: "80vw",margin:'auto' }}>
            <ResponsiveContainer>
                <BarChart
                    width={1200}
                    height={500}
                    data={data}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="mcq" barSize={20} fill="#0088FE" />
                    <Bar dataKey="tf" barSize={20} fill="#00C49F" />
                    <Bar dataKey="short" barSize={20} fill="#FFBB28" />
                    <Bar dataKey="arr" barSize={20} fill="#FF8042" />
                    <Bar dataKey="loo" barSize={20} fill="#43A19E" />
                    <Bar dataKey="fun" barSize={20} fill="#ffb5ee" />
                    <Bar dataKey="easy" barSize={20} fill="#7884d7" />
                    <Bar dataKey="diff" barSize={20} fill="#8ee" />
                    <Bar dataKey="hard" barSize={20} fill="#bdbd11" />
                </BarChart>
                </ResponsiveContainer>
            </div>
        );
    }
}