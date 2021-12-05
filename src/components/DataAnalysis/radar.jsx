

import React from "react";
import ReactECharts from 'echarts-for-react';

export default function Radar() {
    const options = {
        backgroundColor: 'rgba(128, 128, 128, 0)',  // saveAsImage背景透明
        tooltip: {},
        legend: {
            data: ['平均成绩']
        },
        toolbox: {
            feature: {
                saveAsImage: {
                  name:'3',
                  pixelRatio: 4
                }
            }
        },
        radar: {
            // shape: 'circle',
            name: {
                textStyle: {
                    color: 'black',
                    backgroundColor: 'transparent',
                    borderRadius: 3,
                    padding: [3, 5]  //设置上下的那边距为3， 左右那边距为5
                }
            },
            indicator: [
                { name: '信息化管理与运行', max: 10},
                { name: '信息化基础设施', max: 10},
                { name: '信息化资源', max: 10},
                { name: '科研信息化应用', max: 10},
                { name: '管理信息化应用', max: 10},
                { name: '教育信息化应用', max: 10},
                { name: '科学传播应用', max: 10},
                { name: '网络安全管理', max: 10},
                { name: '网络安全技术保障', max:10}
    
            ]
        },
        series: [{
            type: 'radar',
            lineStyle: {
                normal: {
                    color:'#37A2DA'
                }
            },
            itemStyle: {
                normal: {
                    color:'#37A2DA',
                    borderColor: '#37A2DA'
                }
            },
            // areaStyle: {normal: {}},
            data: [
                {
                    value: [7.02, 	6.30 ,	6.51 ,	5.19 ,	6.53, 	7.70 ,	5.66 	,7.35 ,	8.17],
                    name: '2020年度研究单位9项指标平均成绩',
                    //显示数字
                    label: {
                        normal: {
                            show: true,
                            color: 'black',
                            position: 'left',
                            formatter: function(params) {
                                return params.value;
                            }
                        }
                    }
                }
            ]
        }]
    };

    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: '100%' }}>
            <ReactECharts option={options} style={{ height:'100%', width: "100%"}}/>
        </div>
    )
}