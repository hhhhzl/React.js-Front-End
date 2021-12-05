import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import '../../../style/table.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import SupervisorEditUserInterface from './edit&DeleteUser';
import { SupervisorDeleteUser } from './edit&DeleteUser'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers, selectAllUsers, selectLastUpdatedAtUsers } from '../../../state/slices/users';
import { shouldRefetchList } from '../../../state/store';
import { mapUserType } from '../../../constants/maps';
import { fetchAllOrgs, selectLastUpdatedAtOrgs } from '../../../state/slices/orgs';
const { SearchBar } = Search;
const { ExportCSVButton } = CSVExport;


function ActionsFormatter(props) {


    return (
        <div>
            <SupervisorEditUserInterface
                value={props.value}
            />
            &#160;
            <SupervisorDeleteUser/>
        </div>
    );
}


export default function SupervisorUserTable(props) {
    const dispatch = useDispatch();

    const lastUpdatedAt = useSelector(selectLastUpdatedAtUsers);
    const lastUpdateAtOrg = useSelector(selectLastUpdatedAtOrgs);
    useEffect(() => {
        if (shouldRefetchList(lastUpdatedAt)){
            dispatch(fetchAllUsers());
        }
        if (shouldRefetchList(lastUpdateAtOrg)){
            dispatch(fetchAllOrgs());
        }
    }, [dispatch, lastUpdatedAt, lastUpdateAtOrg])

    const product = useSelector((state) => state.users.items);
    const org = useSelector((state) => state.orgs.items);

    const mapOrg = org.reduce(
        (map, item) => ({...map, [item.id]: item.name
        }), {});


    const actionsFormatter = (cell, row) => {

        return <ActionsFormatter
            value={row}
        />
    }

    const nameFormatter = (cell, row) => {
        return row.last_name + row.first_name
    }

    const orgFormatter = (cell, row) => {
        const orgs = mapOrg[row.org];
        return orgs;
    }

    const userTypeFormatter = (cell, row) => {
        return mapUserType[row.user_type]
        
    }
    const pagination = paginationFactory({
        sizePerPageList: [{
            text: '5', value: 5
        }, {
            text: '10', value: 10
        }]
    });

    const columns = [{
        dataField: 'name',
        text: '姓名',
        sort: true,
        formatter: nameFormatter
    },
    {
        dataField: 'username',
        text: '用户名',
        sort: true
    },
    {
        dataField: 'org',
        text: "所属机构",
        sort: true,
        formatter: orgFormatter
    },
    {
        dataField: 'user_type',
        text: "用户类型",
        sort: true,
        formatter: userTypeFormatter
    },
    /*
    {
        dataField: 'field',
        text: "工作领域",
        sort: true
    },
    */
    {
        dataField: 'mobile_number',
        text: "手机",
        sort: true
    },
    {
        dataField: 'email',
        text: '邮箱',
        sort: true,
        searchable: false,
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

