import React from 'react';
import ReactEcharts from "echarts-for-react";

export default class SunGraph extends React.Component {

    getChartOption = (a) => {

        let data = [{
            name: "信息化\n基础环境",
            value: 30,
            itemStyle: {
                color: '#334455'
            },
            children: [{
                name: '信息化管\n理与运行',
                value: 9,
                itemStyle: {
                    color: '#334455'
                },
                children: [{
                    name: ' ',
                    children: [{
                        name: 'None'
                    }]
    
                }]
            }, {
                name: '信息化\n基础设施',
                value: 12,
                itemStyle: {
                    color: '#334455'
                },
                children: [{
                    name: '40%',
                    itemStyle: {
                        shadowColor: '#334455',
                    },
                    label: {
                        color: '#334455',
                    },
                    children: [{
                        name: '网络环境',
                        value: 4.8,
                        itemStyle: {
                            color: '#334455'
                        },
                        label: {
                            color: '#334455',
    
                        },
                    }]
                }, {
                    name: '40%',
                    itemStyle: {
                        shadowColor: '#334455',
                    },
                    label: {
                        color: '#334455',
                    },
                    children: [{
                        name: '计算环境',
                        value: 4.8,
                        itemStyle: {
                            color: '#334455'
                        },
                        label: {
                            color: '#334455',
    
                        },
                    }]
                }, {
                    name: '20%',
                    itemStyle: {
                        shadowColor: '#334455',
                    },
                    label: {
                        color: '#334455',
                        fontSize: a * 0.008,
                    },
                    children: [{
                        name: '存储环境',
                        value: 2.4,
                        itemStyle: {
                            color: '#334455'
                        },
                        label: {
                            color: '#334455',
    
                        },
                    }]
                }]
            }, {
                name: '信息化资源',
                value: 9,
                itemStyle: {
                    color: '#334455'
                },
                children: [{
                    name: '40%',
                    itemStyle: {
                        shadowColor: '#334455',
                    },
                    label: {
                        color: '#334455',
                        fontSize: a * 0.01,
                    },
                    children: [{
                        name: '科学数据资源',
                        value: 3.6,
                        itemStyle: {
                            color: '#334455'
                        },
                        label: {
                            color: '#334455',
    
                        },
                    }]
                }, {
                    name: '20%',
                    itemStyle: {
                        shadowColor: '#334455',
                    },
                    label: {
                        color: '#334455',
                        fontSize: a * 0.006,
                    },
                    children: [{
                        name: '数字教育资源',
                        value: 1.8,
                        itemStyle: {
                            color: '#334455'
                        },
                        label: {
                            color: '#334455',
    
                        },
                    }]
                }, {
                    name: '20%',
                    itemStyle: {
                        shadowColor: '#334455',
                    },
                    label: {
                        color: '#334455',
                        fontSize: a * 0.006,
                    },
                    children: [{
                        name: '科学传播资源',
                        value: 1.8,
                        itemStyle: {
                            color: '#334455'
                        },
                        label: {
                            color: '#334455',
    
                        },
                    }]
                }, {
                    name: '20%',
                    itemStyle: {
                        shadowColor: '#334455',
                    },
                    label: {
                        color: '#334455',
                        fontSize: a * 0.006,
                    },
                    children: [{
                        name: '数字文献资源',
                        value: 1.8,
                        itemStyle: {
                            color: '#334455'
                        },
                        label: {
                            color: '#334455',
    
                        },
                    }]
                }]
            }]
        }, {
            name: '信息化\n应用',
            value: 50,
            itemStyle: {
                color: '#A9A9A9'
            },
    
            children: [{
                name: '科研信息\n化应用',
                value: 20,
                itemStyle: {
                    color: '#A9A9A9'
                },
                children: [{
                    name: '30%',
                    itemStyle: {
                        shadowColor: '#A9A9A9',
                    },
                    label: {
                        color: '#A9A9A9',
                        fontSize: a * 0.011,
                    },
                    children: [{
                        name: '科学数据应用',
                        value: 6,
                        itemStyle: {
                            color: '#A9A9A9'
                        },
                        label: {
                            color: '#A9A9A9',
    
                        },
                    }]
                }, {
                    name: '30%',
                    label: {
                        color: '#A9A9A9',
                        fontSize: a * 0.011,
                    },
                    itemStyle: {
                        shadowColor: '#A9A9A9',
                    },
                    children: [{
                        name: '科学计算应用',
                        value: 6,
                        itemStyle: {
                            color: '#A9A9A9'
                        },
                        label: {
                            color: '#A9A9A9',
    
                        },
                    }]
                }, {
                    name: '20%',
                    label: {
                        color: '#A9A9A9',
                        fontSize: a * 0.011,
                    },
                    itemStyle: {
                        shadowColor: '#A9A9A9',
                    },
                    children: [{
                        name: '云计算应用',
                        value: 4,
                        itemStyle: {
                            color: '#A9A9A9'
                        },
                        label: {
                            color: '#A9A9A9',
    
                        },
                    }]
                }, {
                    name: '20%',
                    label: {
                        color: '#A9A9A9',
                        fontSize: a * 0.01,
                    },
                    itemStyle: {
                        shadowColor: '#A9A9A9',
                    },
                    children: [{
                        name: '开放共享应用',
                        value: 4,
                        itemStyle: {
                            color: '#A9A9A9'
                        },
                        label: {
                            color: '#A9A9A9',
    
                        },
                    }]
                }]
            }, {
                name: '管理信息\n化应用',
                value: 15,
                itemStyle: {
                    color: '#A9A9A9'
                },
                children: [{
                    name: '60%',
                    label: {
                        color: '#A9A9A9',
                        fontSize: a * 0.011,
                    },
                    itemStyle: {
                        shadowColor: '#A9A9A9',
                    },
                    children: [{
                        name: 'ARP应用',
                        label: {
                            color: '#A9A9A9',
    
                        },
                        value: 9,
                        itemStyle: {
                            color: '#A9A9A9'
                        },
                    }]
                }, {
                    name: '40%',
                    label: {
                        color: '#A9A9A9',
                        fontSize: a * 0.01,
                    },
                    itemStyle: {
                        shadowColor: '#A9A9A9',
                    },
                    children: [{
                        name: '非ARP应用',
                        label: {
                            color: '#A9A9A9',
    
                        },
                        value: 6,
                        itemStyle: {
                            color: '#A9A9A9'
                        },
                    }]
                }]
            }, {
                name: '教育信息\n化应用',
                value: 7.5,
                itemStyle: {
                    color: '#A9A9A9'
                },
                children: [{
                    name: '70%',
                    label: {
                        color: '#A9A9A9',
                        fontSize: a * 0.01,
                    },
                    itemStyle: {
                        shadowColor: '#A9A9A9',
                    },
                    children: [{
                        name: '学历教育',
                        value: 5.25,
                        itemStyle: {
                            color: '#A9A9A9'
                        },
                        label: {
                            color: '#A9A9A9',
    
                        },
                    }]
                }, {
                    name: '30%',
                    label: {
                        color: '#A9A9A9',
                        fontSize: a * 0.008,
                    },
                    itemStyle: {
                        shadowColor: '#A9A9A9',
                    },
                    children: [{
                        name: '继续教育',
                        value: 2.25,
                        itemStyle: {
                            color: '#A9A9A9'
                        },
                        label: {
                            color: '#A9A9A9',
    
                        },
                    }]
                }]
            }, {
                name: '科学传\n播应用',
                value: 7.5,
                itemStyle: {
                    color: '#A9A9A9'
                },
                children: [{
                    name: '60%',
                    label: {
                        color: '#A9A9A9',
                        fontSize: a * 0.008,
                    },
                    itemStyle: {
                        shadowColor: '#A9A9A9',
                    },
                    children: [{
                        name: '网络传播',
                        value: 4.5,
                        itemStyle: {
                            color: '#A9A9A9'
                        },
                        label: {
                            color: '#A9A9A9',
    
                        },
                    }]
                }, {
                    name: '40%',
                    label: {
                        color: '#A9A9A9',
                        fontSize: a * 0.008,
                    },
                    itemStyle: {
                        shadowColor: '#A9A9A9',
                    },
                    children: [{
                        name: '网络科普',
                        value: 3,
                        itemStyle: {
                            color: '#A9A9A9'
                        },
                        label: {
                            color: '#A9A9A9',
    
                        },
                    }]
                }]
            }]
        }, {
            name: '网络安全',
            value: 20,
            itemStyle: {
                color: '#505050'
            },
            children: [{
                name: '网络安全\n管理',
                value: 10,
                itemStyle: {
                    color: '#505050'
                },
                children: [{
                    name: '20%',
                    itemStyle: {
                        shadowColor: '#505050',
                    },
                    label: {
                        color: '#505050',
                        fontSize: a * 0.007,
                    },
                    children: [{
                        name: '安全责任',
                        value: 2,
                        itemStyle: {
                            color: '#505050'
                        },
                        label: {
                            color: '#505050',
                        },
                    }]
                }, {
                    name: '30%',
                    itemStyle: {
                        shadowColor: '#505050',
                    },
                    label: {
                        color: '#505050',
                        fontSize: a * 0.008,
                    },
                    children: [{
                        name: '安全规范与制度',
                        value: 3,
                        itemStyle: {
                            color: '#505050'
                        },
                        label: {
                            color: '#505050',
                        },
                    }]
                }, {
                    name: '20%',
                    itemStyle: {
                        shadowColor: '#505050',
                    },
                    label: {
                        color: '#505050',
                        fontSize: a * 0.007,
                    },
                    children: [{
                        name: '安全自查',
                        value: 2,
                        itemStyle: {
                            color: '#505050'
                        },
                        label: {
                            color: '#505050',
                        },
                    }]
                }, {
                    name: '30%',
                    itemStyle: {
                        shadowColor: '#505050',
                    },
                    label: {
                        color: '#505050',
                        fontSize: a * 0.008,
    
                    },
                    children: [{
                        name: '安全培训与教育',
                        value: 3,
                        itemStyle: {
                            color: '#505050'
                        },
                        label: {
                            color: '#505050',
                        },
                    }]
                }]
            }, {
                name: '网络安全\n技术保障',
                value: 10,
                itemStyle: {
                    color: '#505050'
                },
                children: [{
                    name: '70%',
                    itemStyle: {
                        shadowColor: '#505050',
                    },
                    label: {
                        color: '#505050',
    
    
                    },
                    children: [{
                        name: '信息系统安全',
                        value: 7,
                        itemStyle: {
                            color: '#505050'
                        },
                        label: {
                            color: '#505050',
                        },
                    }]
                }, {
                    name: '30%',
                    itemStyle: {
                        shadowColor: '#505050',
                    },
                    label: {
                        color: '#505050',
                        fontSize: a * 0.008,
                    },
                    children: [{
                        name: '主机安全',
                        value: 3,
                        itemStyle: {
                            color: '#505050'
                        },
                        label: {
                            color: '#505050',
                        },
                    }]
                }]
            }]
        }];


        let option = {
            backgroundColor: '#333333',
    
    
            series: [{
                type: 'sunburst',
                radius: [0, '90%'],
                center: ['50%', '50%'],
                data: data,
                roam: true,
                nodeClick: false,
    
                label: {
                    rotate: 'radial',
    
                    fontSize: a * 0.009,
                    lineHeight: 15,
                },
    
                itemStyle: {
                    borderColor: '#333333',
                    borderWidth: 2,
                },
    
                levels: [{/*留给数据下钻的空白配置*/ },
                {
                    r0: '0%',
                    r: '25%',
    
                    label: {
                        rotate: 'radial',
                        color: '#333333'
                    }
                }, {
                    r0: '25%',
                    r: '50.5%',
                    label: {
                        rotate: 'radial',
                        color: '#333333'
                    }
                }, {
                    r0: '55%',
                    r: '65%',
                    itemStyle: {
                        shadowBlur: 2,
    
                        color: 'transparent',
                    },
                    label: {
                        rotate: 'tangential',
    
                    }
                }, {
                    r0: '66.5%',
                    r: '70%',
                    itemStyle: {
                        shadowBlur: 60,
                        shadowColor: '#334455'
                    },
                    label: {
                        position: 'outside',
                        textShadowBlur: 5,
                        textShadowColor: '#333',
                    },
    
                    downplay: {
                        label: {
                            opacity: 0.5
                        }
                    }
                }]
            }]
        };

        return option;
    }

    


    render() {
        return (
            <ReactEcharts
                option={this.getChartOption(1000)}
            />
        );
    }
}
