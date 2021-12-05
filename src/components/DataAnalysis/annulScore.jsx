import React from "react";
import ReactECharts from 'echarts-for-react';

export default function AnnulScore() {
    const options = {
        color: ['#37A2DA', '#F39C12', '#FFD209', '#006EAD',],
        backgroundColor: 'rgba(128, 128, 128, 0)',  // saveAsImage背景透明
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data: ['信息化基础环境', '信息化应用', '网络安全', '标准差']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {
                    name: '2',
                    pixelRatio: 4
                }
            }
        },
        xAxis: [
            {
                name: '年度',
                type: 'category',
                data: ['2016', '2017', '2018', '2019', '2020']
            }
        ],
        yAxis: [
            {
                type: 'value',
                min: 0,
                max: 100
            },
            {
                type: 'value',
                name: '标准差',
                show: false,
                min: 0,
                max: 13,
                interval: 13
            }
        ],
        series: [
            {
                name: '总计',
                type: 'bar',
                barWidth: '30%',
                barGap: '-100%',
                color: 'rgba(128, 128, 128, 0)',
                data: [61.70, 63.12, 64.56, 64.77, 66.08],
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        color: 'black'
                    }
                }
            }, {
                name: '信息化基础环境',
                type: 'bar',
                barWidth: '30%',
                stack: 'group1',
                data: [19.16, 21.45, 20.31, 18.78, 20.37],
                itemStyle: {
                    normal: {
                        barBorderRadius: [0, 0, 10, 10],
                    },
                },
                label: {
                    normal: {
                        show: true,
                        position: 'inside'
                    }
                }
            }, {
                name: '信息化应用',
                type: 'bar',
                barWidth: '30%',
                stack: 'group1',
                data: [28.70, 27.45, 28.71, 30.19, 30.19],
                label: {
                    normal: {
                        show: true,
                        position: 'inside'
                    }
                }
            },
            {
                name: '网络安全',
                type: 'bar',
                barWidth: '30%',
                stack: 'group1',
                data: [13.84, 14.22, 15.54, 15.80, 15.52],
                itemStyle: {
                    normal: {
                        barBorderRadius: [10, 10, 0, 0],
                    },
                },
                label: {
                    normal: {
                        show: true,
                        position: 'inside'
                    }
                }
            },
            {
                name: '标准差',
                type: 'line',
                yAxisIndex: 1,
                data: [10.53, 10.78, 12.13, 11.89, 11.13],
                label: {
                    normal: {
                        show: true,
                        position: 'outside',
                        color: 'black'
                    }
                },
            }
        ]
    };

    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: '100%' }}>
            <ReactECharts option={options} style={{ height:'100%', width: "100%"}}/>
        </div>
    )
}