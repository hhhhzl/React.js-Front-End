import { React, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import '../../../style/table.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import SupervisorEditProjectInterface from './edit&DeleteProject';
import { SupervisorDeleteProject } from './edit&DeleteProject'
import { shouldRefetchList } from '../../../state/store';
import { fetchAllProjects, selectLastUpdatedAtProjects } from '../../../state/slices/projs';
import { fetchAllUsers, selectAllAdmins, selectLastUpdatedAtUsers } from '../../../state/slices/users';
const { SearchBar } = Search;
const { ExportCSVButton } = CSVExport;


function ActionsFormatter(props) {


    return (
        <div>

            <SupervisorEditProjectInterface value={props.value} />
            &#160;
            <SupervisorDeleteProject />
        </div>
    );
}


export default function SupervisorProjectTable() {
    const dispatch = useDispatch();

    // refresh list items
    const lastUpdatedAtProject = useSelector(selectLastUpdatedAtProjects);
    const lastUpdatedAtUser = useSelector(selectLastUpdatedAtUsers);
    useEffect(() => {
        if (shouldRefetchList(lastUpdatedAtProject)) {
            dispatch(fetchAllProjects());
        }
        if (shouldRefetchList(lastUpdatedAtUser)){
            dispatch(fetchAllUsers());
        }
    }, [dispatch, lastUpdatedAtProject, lastUpdatedAtUser])

    const product = useSelector((state) => state.projs.items);
    const admins  = useSelector((state) => state.users.items.filter(u => u.user_type === "A"));

    const mapAdmin = admins.reduce(
        (map, item) => ({...map, [item.id]: item.last_name + item.first_name
    }), {});
    const actionsFormatter = (cell, row) => {

        return <ActionsFormatter value={row}/>
    }

    const adminFormatter = (cell, row) => {
        const admin = mapAdmin[parseInt(row.admin)]
        return admin;
    }

    const isActiveFormatter = (cell, row) => {
        if (row.is_active) {
            return "启用";
        }
        return "停用";
    }

    const willMarkFormatter = (cell, row) => {
        if (row.will_mark) {
            return "计分";
        }
        return "不计分";
    }

    const sendWithFormatter = (cell, row) => {
        let sendWithMap = {
            L: "登录系统",
            A: "匿名邮件",
        }
        return sendWithMap[row.send_with];
    }

    const startTimeFormatter = (cell, row) => {
        return row.start_time.slice(0,10);
    }

    const endTimeFormatter = (cell, row) => {
        return row.end_time.slice(0, 10);
    }

    const pagination = paginationFactory({
        sizePerPageList: [{
            text: '5', value: 5
        }, {
            text: '10', value: 10
        }]
    });

    const columns = [{
        dataField: 'id',
        text: '序号',
        sort: true
    },
    {
        dataField: 'name',
        text: '项目名称',
        sort: true
    },
    {
        dataField: 'admin',
        text: "管理员",
        sort: true,
        formatter: adminFormatter
    },
    {
        dataField: 'willMark',
        text: "计分",
        sort: true,
        formatter: willMarkFormatter
    },
    {
        dataField: 'sendWith',
        text: "发放方式",
        sort: true,
        formatter: sendWithFormatter
    },
    {
        dataField: 'isactive',
        text: "状态",
        sort: true,
        formatter: isActiveFormatter
    },
    {
        dataField: 'start_time',
        text: '开始时间',
        sort: true,
        formatter: startTimeFormatter
    },
    {
        dataField: 'end_time',
        text: '结束时间',
        sort: true,
        formatter: endTimeFormatter
    },
    {
        dataField: 'active',
        text: "选择",
        isDummyField: true,
        CSVExport: false,
        searchable: false,
        formatter: actionsFormatter
    }
    ];



    return (
        <div>

            <ToolkitProvider
                bootstrap4
                keyField='id'
                data={product}
                columns={columns}
                search
            >
                {
                    props => (
                        <div>
                            <div className="search-div">
                                <SearchBar
                                    {...props.searchProps}
                                    srText={false}
                                />

                            </div>
                            <hr />
                            <BootstrapTable
                                {...props.baseProps}
                                striped
                                hover
                                condensed
                                pagination={pagination}
                            />
                            {/* 
                            <div className="search-div">
                                <ExportCSVButton {...props.csvProps}>导出CSV</ExportCSVButton>
                            </div>
                            */}
                        </div>
                    )
                }
            </ToolkitProvider>
        </div>

    );
}

