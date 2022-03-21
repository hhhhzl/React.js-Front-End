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
import data from "./expertInfo.json";
import Table from 'react-bootstrap/Table';
import ProgressBar from 'react-bootstrap/ProgressBar';

const { SearchBar } = Search;
const { ExportCSVButton } = CSVExport;


export default function ExpertProcessViewTable(){

    const [expertdata, setExpertdata] = useState(data);
    const columns = [
      {
          dataField: 'id',
          text: "序号",
          sort: true
      },
      {
          dataField: 'expert_name',
          text: '专家姓名',
          sort: true
      },
      {
          dataField: 'institute',
          text: "所在单位",
          sort: true,
      },
      {
        dataField: 'field',
        text: "领域",
        sort: true,
      },
      {
          dataField: 'process',
          text: '打分填报进度',
          sort: true,
          formatter: (value) => {
            return <>
              <ProgressBar animated striped variant="success" now={value} label={`${value}%`} key={value}/>
            
          </>
          },
          sortFunc: (a, b, order) => {
            let fA = parseFloat(a);
            let fB = parseFloat(b);
            if (order === 'asc') {
              return fB - fA;
            }
            return fA - fB; // desc
          },
      },
  ];

  const pagination = paginationFactory({
    sizePerPageList: [{
        text: '5', value: 5
    }, {
        text: '10', value: 10
    }]
});

  return (
    <ToolkitProvider
    bootstrap4
    keyField="id"
    data={ data }
    columns={ columns }
    search
    exportCSV={ {
      fileName: '专家打分填报进度表.csv',
      separator: '|',
      ignoreHeader: true,
      noAutoBOM: false
    }}
    >
    {
      props =>(
        <div>
          <div className="search-div">
            <SearchBar
                {...props.searchProps}
                      srText={false}
            />

            </div>
          <hr />
          <BootstrapTable
           { ...props.baseProps}
           striped
            hover
            condensed 
            pagination={pagination}
            />

          <div className="search-div">
                <ExportCSVButton 
                    {...props.csvProps}>
                      <Button>导出CSV</Button>
                </ExportCSVButton>
          </div>
        </div>

        
                          
      )
         
         
    }
</ToolkitProvider>
  )



       /*
        <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>专家姓名</th>
            <th>所在机构</th>
            <th>打分填报进度</th>
          </tr>
        </thead>
        
        <tbody>
          {expertdata.map((contact)=> (
            <tr>
              <td>{contact.id}</td>
              <td>{contact.expert_name}</td>
              <td>{contact.institute}</td>  
              <td>
                 <ProgressBar striped variant="success" now={contact.process} label={`${contact.process}%`} key={contact.id}/>
              </td>
              </tr>
          ))}
        </tbody>


        <tfoot>
          <tr>
            <th>ID</th>
            <th>专家姓名</th>
            <th>所在机构</th>
            <th>打分填报进度</th>    
          </tr>
        </tfoot>
      </Table>
          */ 

    
  }

