import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import '../../../style/table.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import { Button } from 'react-bootstrap';
import SideMenu from './sideMenu';
import NavBarTest from '../../../navBar';
const { SearchBar } = Search;
const { ExportCSVButton } = CSVExport;


function ActionsFormatter(props) {






    return (
        <div>
            <Button>填写</Button>
        </div>
    );
}


export default function UserQuestionTable(props) {


    const products = [
        {
            id: '1.1.1',
            type: '单选',
            title: "信息化评估测试",
            percentage: "90%",
        },
        {
            id: '1.1.2',
            type: '单选',
            title: "IPv6",
            percentage: "80%",
        },
        {
            id: '1.1.3',
            type: '单选',
            title: "网络安全隐患告知书",
            percentage: "0%",
        },
        {
            id: '1.2.1',
            type: '填空',
            title: "信息化评估测试",
            percentage: "0%",
        },
        {
            id: '1.2.2',
            type: '多选',
            title: "云计算服务",
            percentage: "0%",
        },
        {
            id: '1.3.1',
            type: '其他',
            title: "ARP",
            percentage: "0%",
        },
        {
            id: '2.1.1',
            type: '填表',
            title: "科研应用使用带宽",
            percentage: "0%",
        },
        {
            id: '2.1.2',
            type: '单选',
            title: "信息化评估测试",
            percentage: "90%",
        },
        {
            id: '2.1.3',
            type: '单选',
            title: "IPv6",
            percentage: "80%",
        },
        {
            id: '2.1.4',
            type: '单选',
            title: "网络安全隐患告知书",
            percentage: "0%",
        },
        {
            id: '2.2.1',
            type: '填空',
            title: "信息化评估测试",
            percentage: "0%",
        },
        {
            id: '2.2.2',
            type: '多选',
            title: "云计算服务",
            percentage: "0%",
        },
        {
            id: '2.3.1',
            type: '其他',
            title: "ARP",
            percentage: "0%",
        },
        {
            id: '2.3.2',
            type: '填表',
            title: "科研应用使用带宽",
            percentage: "0%",
        },
    ];


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
            dataField: 'id',
            text: '序号',
            sort: true
        },
        {
            dataField: 'type',
            text: "题型",
            sort: true
        },
        {
            dataField: 'title',
            text: '题目',
            sort: true
        },
        {
            dataField: 'percentage',
            text: "完成度",
            sort: true,
            searchable: false,
        },
        {
            text: ' ',
            isDummyField: true,
            CSVExport: false,
            formatter: actionsFormatter
        }
    ];



    return (
        <div>
            <SideMenu />
            <div className='div-test'>
                <NavBarTest usertype={"用户"} username={"派大星"} />
                <div className="supervisor-interface">
                hi{props.title}

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
            </div>
        </div>

    );
}

