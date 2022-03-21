import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import HomeIcon from '@material-ui/icons/Home';
import AssignmentIcon from '@material-ui/icons/AssignmentOutlined';
import AssignmentIndIcon from '@material-ui/icons/AssignmentIndOutlined';
import AssessmentIcon from '@material-ui/icons/AssessmentOutlined';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import AssistantIcon from '@material-ui/icons/AssistantOutlined';
import DataUsageIcon from '@material-ui/icons/DataUsageOutlined';
import { Nav } from 'react-bootstrap';
import { Switch, Route, Link } from "react-router-dom";

export default function SideMenuExpert() {
  return (
    <div className='side-menu'>
      <Nav>
        <Navbar className='img-center'>
          <Link className='nav-link' to="/main">
            <img
              src="/logo2.png"
              height="70"
              alt="中国科学院院徽"
            />
          </Link>
        </Navbar>
        <br />
        <Switch>
          <Route path=''>
            <Navbar className='side-text'>
              <Link className='nav-link' style={{ color: "hsl(209, 76%, 67%)" }} to="/main"><AssignmentIcon /> 任务进度</Link>
            </Navbar>
            <Navbar className='side-text'>
              <Link className='nav-link' style={{ color: "white" }} to="/expert/QuestionnaireScoring"><AssistantIcon /> 问卷打分</Link>
            </Navbar>
            <Navbar className='side-text'>
              <Link className='nav-link' style={{ color: "white" }} to="/data-analysis"><DataUsageIcon /> 数据分析</Link>
            </Navbar>
            <Navbar className='side-text'>
              <Link className='nav-link' style={{ color: "white" }} to="/"><AssignmentIndIcon /> 单位报告</Link>
            </Navbar>
            <Navbar className='side-text'>
              <Link className='nav-link' style={{ color: "white" }} to="/"><AssignmentTurnedInIcon /> 相关文档</Link>
            </Navbar>
            <Navbar className='side-text'>
              <Link className='nav-link' style={{ color: "white" }} to="/"><AssignmentTurnedInIcon /> 整体报告</Link>
            </Navbar>
          </Route>
        </Switch>
      </Nav>
    </div>
  )
}
