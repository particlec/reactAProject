import React,{useEffect} from 'react';
import { Chart, Line, Point, Tooltip, Legend } from 'bizcharts';
import axios from "axios";

function LineChart() {
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
