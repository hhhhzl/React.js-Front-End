import React from 'react';
import SideMenu from './sideMenu';
import SupervisorUserTable from "./userTable";
import SupervisorAddUserInterface from './addUser';
import NavBarTest from '../../../navBar';


export default class SupervisorUserInterface extends React.Component {

    // Stroe projects' data in state
    state = {
        projectData: [
            {
                id: 1,
                date_joined: "2020-2-2",
                last_name: "张",
                first_name: "三",
                username: "SanZhang123",
                sex: "男",
                org: "中国科学院",
                position: "教授",
                field: "法律",
                email: "zhangsan@126.com",
                mobile_number: "13520192838",
                tel_number: "62923840",
                degree: "博士",
                user_type: "超级管理员",
                is_active: "启用",
            },
            {
                id: 2,
                date_joined: "2018-2-29",
                last_name: "风",
                first_name: "车车",
                username: "CheCheFeng666",
                sex: "其他",
                org: "中国科学院",
                position: "学生",
                field: "",
                email: "jerryrat666@gmail.com",
                mobile_number: "13920190018",
                tel_number: "",
                degree: "高中一下",
                user_type: "管理员",
                is_active: "启用",
            },
            {
                id: 3,
                date_joined: "2020-2-2",
                last_name: "大",
                first_name: "娃",
                username: "HuluWa777",
                sex: "男",
                org: "中国科学院",
                position: "战士",
                field: "植物研究",
                email: "1234567@qq.com",
                mobile_number: "13888886666",
                tel_number: "62923283",
                degree: "高中以下",
                user_type: "管理员",
                is_active: "启用",
            },
        ]
    }

    // Add new project
    storeAddedData(childData) {
        this.setState({
            projectData: [
                ...this.state.projectData.slice(0, this.state.projectData.length),
                childData,
            ]
        })
    }

    // Edit project
    storeEditedData = (rowID, childData) => {
        const CheckIndex = (x) => {
            if (x.id === rowID) {
                return x
            }
        };
        const index = this.state.projectData.findIndex(CheckIndex);

        this.setState({
            projectData: [
                ...this.state.projectData.slice(0, index),
                childData,
                ...this.state.projectData.slice(1 + index, this.state.projectData.length)
            ]
        })
    }

    // Delete project
    deleteData = (rowID) => {
        const CheckIndex = (x) => {
            if (x.id === rowID) {
                return x
            }
        };
        const index = this.state.projectData.findIndex(CheckIndex);

        this.setState({
            projectData: [
                ...this.state.projectData.slice(0, index),
                ...this.state.projectData.slice(1 + index, this.state.projectData.length),
            ]
        })
    }


    render() {
        return (
                    <div className="supervisor-interface">
                        <h3>欢迎</h3>
                        <SupervisorAddUserInterface
                            value={this.state.projectData}
                            callbackAdd={this.storeAddedData.bind(this)}
                        />

                        <br />
                        <br />

                        <SupervisorUserTable
                            callbackEdit={this.storeEditedData}
                            callbackDelete={this.deleteData}
                            value={this.state.projectData}
                        />

                    </div>
        );
    }
}