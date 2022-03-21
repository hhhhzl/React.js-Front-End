import React, { useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import '../../style/table.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import { Button } from 'react-bootstrap';
const { SearchBar } = Search;
const { ExportCSVButton } = CSVExport;


function ActionsFormatter(props) {

    return (
        <div>
            <Button>查看此项目</Button>
        </div>
    );
}


export default function ManagerProjectTable(props) {


    const products = props.value;


    const actionsFormatter = (cell, row) => {

        return <ActionsFormatter
            value={row}
        />
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
        dataField: 'name',
        text: '项目名称',
        sort: true
    },
    {
        dataField: 'is_active',
        text: "状态",
        sort: true
    },
    {
        dataField: 'end_date',
        text: '截止日期',
        sort: true
    },
    {
        dataField: 'admin',
        text: "管理员",
        sort: true
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

