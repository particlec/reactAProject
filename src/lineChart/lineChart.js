import React,{useEffect} from 'react';
import { Chart, Line, Point, Tooltip, Legend } from 'bizcharts';
import axios from "axios";

function LineChart() {


    // useEffect(() => {
    //     axios({
    //         method: 'post',
    //         url: 'http://localhost:3005/posts',
    //         headers: {
    //             'Content-type': 'application/json; chartset=utf-8'
    //         },
    //         data:values
    //     }).then(res => {
    //         // console.log(res.data)
    //     })
    // }, [params]);

    
    // 数据源
    // const data = [
    //   {
    //     month: 'Jan',
    //     city: 'Tokyo',
    //     temperature: 7,
    //   },
    //   {
    //     month: 'Jan',
    //     city: 'London',
    //     temperature: 3.9,
    //   },
    //   {
    //     month: 'Feb',
    //     city: 'Tokyo',
    //     temperature: 6.9,
    //   },
    //   {
    //     month: 'Feb',
    //     city: 'London',
    //     temperature: 4.2,
    //   },
    //   {
    //     month: 'Mar',
    //     city: 'Tokyo',
    //     temperature: 9.5,
    //   },
    //   {
    //     month: 'Mar',
    //     city: 'London',
    //     temperature: 5.7,
    //   },
    //   {
    //     month: 'Apr',
    //     city: 'Tokyo',
    //     temperature: 14.5,
    //   },
    //   {
    //     month: 'Apr',
    //     city: 'London',
    //     temperature: 8.5,
    //   },
    //   {
    //     month: 'May',
    //     city: 'Tokyo',
    //     temperature: 18.4,
    //   },
    //   {
    //     month: 'May',
    //     city: 'London',
    //     temperature: 11.9,
    //   },
    //   {
    //     month: 'Jun',
    //     city: 'Tokyo',
    //     temperature: 21.5,
    //   },
    //   {
    //     month: 'Jun',
    //     city: 'London',
    //     temperature: 15.2,
    //   },
    //   {
    //     month: 'Jul',
    //     city: 'Tokyo',
    //     temperature: 25.2,
    //   },
    //   {
    //     month: 'Jul',
    //     city: 'London',
    //     temperature: 17,
    //   },
    //   {
    //     month: 'Aug',
    //     city: 'Tokyo',
    //     temperature: 26.5,
    //   },
    //   {
    //     month: 'Aug',
    //     city: 'London',
    //     temperature: 16.6,
    //   },
    //   {
    //     month: 'Sep',
    //     city: 'Tokyo',
    //     temperature: 23.3,
    //   },
    //   {
    //     month: 'Sep',
    //     city: 'London',
    //     temperature: 14.2,
    //   },
    //   {
    //     month: 'Oct',
    //     city: 'Tokyo',
    //     temperature: 18.3,
    //   },
    //   {
    //     month: 'Oct',
    //     city: 'London',
    //     temperature: 10.3,
    //   },
    //   {
    //     month: 'Nov',
    //     city: 'Tokyo',
    //     temperature: 13.9,
    //   },
    //   {
    //     month: 'Nov',
    //     city: 'London',
    //     temperature: 6.6,
    //   },
    //   {
    //     month: 'Dec',
    //     city: 'Tokyo',
    //     temperature: 9.6,
    //   },
    //   {
    //     month: 'Dec',
    //     city: 'London',
    //     temperature: 4.8,
    //   },
    // ];

    const data02 = [
        { year: '1951 年', sales: 30 },
        { year: '1952 年', sales: 52 },
        { year: '1956 年', sales: 61 },
        { year: '1957 年', sales: 45 },
        { year: '1958 年', sales: 48 },
        { year: '1959 年', sales: 38 },
        { year: '1960 年', sales: 38 },
        { year: '1962 年', sales: 38 },
    ];

    const scale = {
        temperature: { min: 0 },
        city: {
            formatter: v => {
                return {
                    London: '伦敦',
                    Tokyo: '东京',
                }[v];
            },
        },
    };
    return (
        <Chart
            scale={scale}
            padding={[30, 20, 60, 40]}
            autoFit
            height={320}
            data={data02}
            interactions={['element-active']}
        >
            <Point
                position="year*sales"
                // color="city"
                shape="circle"
            />
            <Line
                shape="smooth"
                position="year*sales"
                // color="city"
                label="0"
            />
            <Tooltip shared showCrosshairs />
            <Legend
                background={{
                    padding: [5, 100, 5, 36],
                    style: {
                        fill: '#eaeaea',
                        stroke: '#fff',
                    },
                }}
            />
        </Chart>
    );
}
export default LineChart;
