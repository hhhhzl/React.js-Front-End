import React from "react";
import ReactECharts from 'echarts-for-react';
import { height } from "@material-ui/system";

const EChartsMainPage = () => {
    const a = 1500;
    const data = [{
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


    const options = {
        
        //系列列表
        series: [{
            type: 'sunburst', //图表类型为旭日图
            radius:[0,'90%'], //内半径和外半径
            center: ['50%', '52%'],//中心点
            data: data, //读取列表data中的数据
            roam:true,
            nodeClick:false,
            //文本签的样式
            label: {
                rotate: 'radial', //旋转角为”径向旋转“
                //fontWeight: 545, //文字字体粗细
                lineHeight:15,
            },
            //旭日图扇形块的样式
            itemStyle: {
                borderColor: 'white',//边框颜色
                borderWidth: 2,//边框粗细
            },
            //多层配置
            levels: [{/*留给数据下钻的空白配置*/}, 
            {   // 最靠内测的第一层
                r0: '0%', //内半径
                r: '25%', //外半径
                //文本签样式
                label: {
                    rotate: 'radial',
                    color:'white' //字体颜色
                }
            }, {//第二层
                r0: '25%',
                r: '50.5%',
                label: {
                    rotate: 'radial',
                    color:'white'
                }
            }, {//第三层
                r0: '55%',
                r: '65%',
                itemStyle: {
                    shadowBlur: 0, //图形阴影的模糊大小
                    
                    color: 'transparent', //设置颜色为透明
                },
                label: {
                    rotate: 'tangential', //文字”切向旋转“
                    //fontSize: 10, //字号
                }
            }, {//第四层
                r0: '66.5%',
                r: '70%',
                itemStyle: {
                    shadowBlur: 0,//图形阴影的模糊大小
                    shadowColor: '#FFAE57'//阴影颜色
                },
                label: {
                    position: 'outside', //标签的位置
                    textShadowBlur: 0, //文字本身的阴影长度
                    textShadowColor: '#333', //文字本身的阴影颜色
                },
                //鼠标悬停后不相关扇形块的配置项
                downplay: {
                    label: {
                        opacity: 0.5 //透明度（值越大透明度越小）
                    }
                }
            }]
        }]
    };
    return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: '90vh' }}>
        <ReactECharts option={options} style={{ height: '80vh', width: '80vw' }} />
    </div>
}


export default EChartsMainPage;