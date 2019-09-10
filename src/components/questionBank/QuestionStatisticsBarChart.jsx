import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default class Example extends PureComponent {
    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/vxq4ep63/';
    render() {
        let typesArray = []
        this.props.bank.filter(stat =>
            stat.statistic === 'types'
        ).map(type => {
            typesArray.push({ [type.key]: parseInt(type.value) })
        })

        let categoriesArray = []
        this.props.bank.filter(stat =>
            stat.statistic === 'categories'
        ).map(category => {
            categoriesArray.push({ [category.key]: parseInt(category.value) })
        })

        let levelsArray = []
        this.props.bank.filter(stat =>
            stat.statistic === 'levels'
        ).map(level => {
            levelsArray.push({ [level.key]: parseInt(level.value) })
        })

        let typesObject = { name: 'Types' }
        typesArray.forEach(type => {
            typesObject[Object.keys(type)[0]] = Object.values(type)[0]
        });
        let categoriesObject = { name: 'Categories' }
        categoriesArray.forEach(category => {
            categoriesObject[Object.keys(category)[0]] = Object.values(category)[0]
        });
        let levelsObject = { name: 'Levels' }
        levelsArray.forEach(level => {
            levelsObject[Object.keys(level)[0]] = Object.values(level)[0]
        });
        // console.log(typesArray)
        console.log(typesObject)
        console.log(categoriesObject)
        console.log(levelsObject)
        let data=[typesObject,categoriesObject,levelsObject]
        
        console.log(data)
        return (
            <div style={{ height: "70vh", width: "80vw", margin: 'auto' }}>
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
                        <XAxis dataKey="name" tick={{ fill: 'white' }}/>
                        <YAxis />
                        <Tooltip cursor={false}/>
                        <Legend />
                        <Bar dataKey="True/False" barSize={20} fill="#0088FE" />
                        <Bar dataKey="Long" barSize={20} fill="#00C49F" />
                        <Bar dataKey="Short" barSize={20} fill="#FFBB28" />
                        <Bar dataKey="Programming" barSize={20} fill="#FF8042" />
                        <Bar dataKey="MCQ" barSize={20} fill="#43A19E" />
                        <Bar dataKey="Find Bug(s)" barSize={20} fill="#ffb5ee" />
                        <Bar dataKey="Arrays" barSize={20} fill="#7884d7" />
                        <Bar dataKey="Functions" barSize={20} fill="#8ee" />
                        <Bar dataKey="General" barSize={20} fill="#bdbd11" />
                        <Bar dataKey="Loops" barSize={20} fill="#00884E" />
                        <Bar dataKey="Promises" barSize={20} fill="#005f9F" />
                        <Bar dataKey="Easy" barSize={20} fill="#214" />
                        <Bar dataKey="Intermediate" barSize={20} fill="#aa8042" />
                        <Bar dataKey="Hard" barSize={20} fill="#43A1dd" />
                        <Bar dataKey="Advance" barSize={20} fill="#d21" />
                        
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    }
}