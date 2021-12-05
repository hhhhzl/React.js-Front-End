import React from "react";
import Navbar from "react-bootstrap/Navbar";
import HomeIcon from "@material-ui/icons/Home";
import AssignmentIcon from "@material-ui/icons/AssignmentOutlined";
import AssignmentIndIcon from "@material-ui/icons/AssignmentIndOutlined";
import AssessmentIcon from "@material-ui/icons/AssessmentOutlined";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedInOutlined";
import AssistantIcon from "@material-ui/icons/AssistantOutlined";
import DataUsageIcon from "@material-ui/icons/DataUsageOutlined";
import { Nav } from "react-bootstrap";
import { Switch, Route, Link, useParams } from "react-router-dom";

const SideMenuQnaireAdmin = () => {

  const { qnaire } = useParams();

  return (
    <>
      <Navbar className="side-text">
        <Link
          className="nav-link"
          style={{ color: "white" }}
          to={`/qnaire/${qnaire}/qedit`}
        >
          <AssignmentIcon /> 问卷编辑
        </Link>
      </Navbar>
      <Navbar className="side-text">
        <Link
          className="nav-link"
          style={{ color: "white" }}
          to={`/qnaire/${qnaire}/iedit`}
        >
          <AssistantIcon /> 指标编辑
        </Link>
      </Navbar>
      <Navbar className="side-text">
        <Link className="nav-link" style={{ color: "white" }} 
        to={`/qnaire/${qnaire}/`}>
          <DataUsageIcon /> 填报进度
        </Link>
      </Navbar>
      <Navbar className="side-text">
        <Link className="nav-link" style={{ color: "white" }} to={`/qnaire/${qnaire}/`}>
          <AssignmentIndIcon /> 手动打分
        </Link>
      </Navbar>
      <Navbar className="side-text">
        <Link className="nav-link" style={{ color: "white" }} to={`/qnaire/${qnaire}/`}>
          <AssignmentTurnedInIcon /> 分数编辑
        </Link>
      </Navbar>
      <Navbar className="side-text">
        <Link className="nav-link" style={{ color: "white" }} to={`/qnaire/${qnaire}/`}>
          <AssessmentIcon /> 分数统计
        </Link>
      </Navbar>
      <Navbar className="side-text">
        <Link className="nav-link" style={{ color: "white" }} to={`/qnaire/${qnaire}/`}>
          <AssessmentIcon /> 内容查看
        </Link>
      </Navbar>
      <Navbar className="side-text">
        <Link className="nav-link" style={{ color: "white" }} to="/main">
          <HomeIcon /> 返回列表
        </Link>
      </Navbar>
    </>
  );
};

export default function SideMenuAdmin() {
  return (
    <div className="side-menu">
      <Nav>
        <Navbar className="img-center">
          <Link className="nav-link" to="/main">
            <img src="/logo2.png" height="70" alt="中国科学院院徽" />
          </Link>
        </Navbar>
        <br />

        <Switch>
          <Route path="/main">
            <Navbar className="side-text">
              <Link
                className="nav-link"
                style={{ color: "hsl(209, 76%, 67%)" }}
                to="/main"
              >
                <AssignmentIcon /> 项目管理
              </Link>
            </Navbar>
            {/*
            <Navbar className='side-text'>
              <Link className='nav-link' style={{ color: "white" }} to="/"><DataUsageIcon /> 数据采集</Link>
            </Navbar>
            <Navbar className='side-text'>
              <Link className='nav-link' style={{ color: "white" }} to="/"><AssignmentIndIcon /> 专家分配</Link>
            </Navbar>
            <Navbar className='side-text'>
              <Link className='nav-link' style={{ color: "white" }} to="/"><AssignmentTurnedInIcon /> 问卷审核</Link>
            </Navbar>*/}
            <Navbar className="side-text">
              <Link className="nav-link" style={{ color: "white" }} to="/data-analysis">
                <AssessmentIcon /> 数据分析
              </Link>
            </Navbar>
          </Route>
          <Route path="/qnaire/:qnaire">
            <SideMenuQnaireAdmin />
          </Route>
          <Route path=''>
            <Navbar className='side-text'>
              <Link className='nav-link' style={{ color: "white" }} to="/main"><HomeIcon /> 返回主页</Link>
            </Navbar>
          </Route>

        </Switch>
      </Nav>
    </div>
  );
}
