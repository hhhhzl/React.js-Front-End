import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import '../../style/table.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProjects, selectLastUpdatedAtProjects } from '../../state/slices/projs';
import { shouldRefetchList } from '../../state/store';
import { Link } from 'react-router-dom';

const { SearchBar } = Search;
const { ExportCSVButton } = CSVExport;


function ActionsFormatter(props) {
    return (
        <div>
            <Link to={`/qnaire/${props.value.id}/qedit`}>
                <Button title={props.value.name}>编辑问题</Button>
            </Link>
            {/*<Link to={`/qnaire/${props.value.id}/iedit`}>
                <Button title={props.value.name}>编辑指标</Button>
    </Link>*/}
        </div>
    );
}


export default function AdminProjectTable() {

    const dispatch = useDispatch();

    const products = useSelector((state) => state.projs.items);
    const lastUpdatedAt = useSelector(selectLastUpdatedAtProjects);
    useEffect(() => {
        if (shouldRefetchList(lastUpdatedAt)) {
            dispatch(fetchAllProjects());
        }
    }, [dispatch, lastUpdatedAt])


    const actionsFormatter = (cell, row) => {

        return <ActionsFormatter
            value={row}
        />
    }

    const endTimeFormatter = (cell, row) => {
        return row.end_time.slice(0, 10);
    }

    const isActiveFormatter = (cell, row) => {
        if (row.is_active) {
            return "启用";
        }
        return "停用";
    }

    const pagination = paginationFactory({
        sizePerPageList: [{
            text: '5', value: 5
        }, {
            text: '10', value: 10
        }]
    });

    const columns = [
        {
            dataField: 'id',
            text: "序号",
            sort: true
        },
        {
            dataField: 'name',
            text: '项目名称',
            sort: true
        },
        {
            dataField: 'is_active',
            text: "状态",
            sort: true,
            formatter: isActiveFormatter
        },
        {
            dataField: 'end_time',
            text: '截止日期',
            sort: true,
            formatter: endTimeFormatter
        },
        {
            text: '选择',
            isDummyField: true,
            CSVExport: false,
            formatter: actionsFormatter
        }
    ];



    return (
        <div>
            <ToolkitProvider
                bootstrap4
                keyField='id'
                data={products}
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
                            
                            <div className="search-div">
                                <ExportCSVButton {...props.csvProps}>
                                    <Button>导出CSV</Button>
                                </ExportCSVButton>
                            </div>
                            
                        </div>
                    )
                }
            </ToolkitProvider>
        </div>

    );
}

