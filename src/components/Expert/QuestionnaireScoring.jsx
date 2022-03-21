import "./expert.css";
import React, { useState, useEffect } from 'react';
import Tabs from 'react-bootstrap/Tabs'
import { Tab } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import '../../style/table.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import { Button,Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProjects, selectLastUpdatedAtProjects } from '../../state/slices/projs';
import { shouldRefetchList } from '../../state/store';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { Form,Row,Col } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import  QuestionDisplayCard from "../Question/questionDisplayCard";
import  QuestionMultipleChoicesEdit from "../Question/question-edit/questionMultipleChoicesEdit";
import  QnaireQuestionAnswering from "../Questionnaire/qnaireQuestionAnswering";
import QnaireQuestionAnsweringTable from "../Questionnaire/qnaireQuestionAnsweringTable";
import ActionsFormatter from "../User/Project/userProjectTable"
import QnaireQuestionAnsweringSwitch from "../Questionnaire/qnaireQuestionAnsweringSwitch";
import QnaireQuestionAnsweringSwitchExpertScoring from "../Questionnaire/qnaireQuestionAnsweringSwitchExpertScoring(1)";
/*const { SearchBar } = Search;
function ActionsFormatter(props) {
    return (
        <div>
            <Link to={`/qnaire/${props.value.id}/qedit`}>
                <Button title={props.value.name}>编辑问题</Button>
            </Link>
            {/*<Link to={`/qnaire/${props.value.id}/iedit`}>
                <Button title={props.value.name}>编辑指标</Button>
    </Link>*/
/*        </div>
    );
}*/

const questionIndex = () => {
  return (
    <div className = "questionIndex">
      
    </div>    
  )
}
const questioncontent = () => {
    return (
      <div className="cardOne">
        <Card className="cardOne" hover="true">
          <Card.Header className="questionheader" >
          <div className="questiontitle">
            题目
          </div>
          </Card.Header>
          <Card.Body className="questionbody">
            <div className="questioncontentcard">
              <QnaireQuestionAnsweringSwitchExpertScoring />
            {/* <QnaireQuestionAnsweringTable questionType={1}/> */}
            <Button  className="lastquestion" type="submit" variant="outline-success">
             上一题
            </Button>
            <Button  className="nextquestion" type="submit" variant="outline-success">
             下一题
            </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  };
  
const QuestionnaireScoring = () => {
    return (
      <div className="cardtwo">
        <Card className="cardtwo">
          <Card.Header className="scoreheader" >
            <div className="scoretitle">
            分数
            </div>
          </Card.Header>
          <Card.Body className="scorebody">
            <div className="annotation">
            注释：此题分数为多少时即代表xx程度，请谨慎填写分数，请把分数写在下面，分数区间为：0到100.
            请仔细填写请仔细填写请仔细填写请仔细填写请仔细填写请仔细填写请仔细填写请仔细填
            </div>
            <div className="scorecontentcard">
              <h2>90</h2>
            </div>
            <Button  className="submitbutton" type="submit" variant="outline-success">
            提交
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  };
export default function AdminProjectTable() {
    return(
        <div className="aaaa">
        {questioncontent()}
        {QuestionnaireScoring()}
      </div>
    );
}
