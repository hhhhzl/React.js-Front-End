import React from 'react';
import ManagerProjectTable from "./managerProjectTable";

export default class ManagerProgressInterface extends React.Component {


    state = {
        projectData: [
            {
                id: 1,
                name: "2020年信息化评估",
                created_at: "2020-02-19",
                send_with: "登录系统",
                will_mark: "计分",
                start_date: "2019-01-03",
                end_date: "2020-10-29",
                is_active: "启用",
                admin: "张三"
            },
            {
                id: 2,
                name: "2019年信息化评估",
                created_at: "2029-01-19",
                send_with: "匿名邮件",
                will_mark: "计分",
                start_date: "2019-01-14",
                end_date: "2020-09-21",
                is_active: "停用",
                admin: "李四"
            },
            {
                id: 3,
                name: "2018年信息化评估",
                created_at: "2020-02-19",
                send_with: "匿名邮件",
                will_mark: "计分",
                start_date: "2018-03-29",
                end_date: "2019-11-13",
                is_active: "停用",
                admin: "王五"
            },
            {
                id: 4,
                name: "2020年信息化评估",
                created_at: "2020-02-19",
                send_with: "登录系统",
                will_mark: "计分",
                start_date: "2019-01-03",
                end_date: "2020-10-29",
                is_active: "启用",
                admin: "张三"
            },
            {
                id: 5,
                name: "2019年信息化评估",
                created_at: "2029-01-19",
                send_with: "匿名邮件",
                will_mark: "计分",
                start_date: "2019-01-14",
                end_date: "2020-09-21",
                is_active: "停用",
                admin: "李四"
            },
            {
                id: 6,
                name: "2018年信息化评估",
                created_at: "2020-02-19",
                send_with: "匿名邮件",
                will_mark: "计分",
                start_date: "2018-03-29",
                end_date: "2019-11-13",
                is_active: "停用",
                admin: "王五"
            },
            {
                id: 7,
                name: "2020年信息化评估",
                created_at: "2020-02-19",
                send_with: "登录系统",
                will_mark: "计分",
                start_date: "2019-01-03",
                end_date: "2020-10-29",
                is_active: "启用",
                admin: "张三"
            },
            {
                id: 8,
                name: "2019年信息化评估",
                created_at: "2029-01-19",
                send_with: "匿名邮件",
                will_mark: "计分",
                start_date: "2019-01-14",
                end_date: "2020-09-21",
                is_active: "停用",
                admin: "李四"
            },
            {
                id: 9,
                name: "2018年信息化评估",
                created_at: "2020-02-19",
                send_with: "匿名邮件",
                will_mark: "计分",
                start_date: "2018-03-29",
                end_date: "2019-11-13",
                is_active: "停用",
                admin: "王五"
            },
        ]
    }

    render() {
        return (


            <div className="supervisor-interface">
                <h3>欢迎</h3>
                <br />
                <ManagerProjectTable
                    value={this.state.projectData}
                />
            </div>

        );
    }
}