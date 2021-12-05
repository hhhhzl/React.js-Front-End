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

export default function SideMenuManager() {
  return (
    <div className='side-menu'>
      <Nav>
        <Navbar className='img-center'>
          <Link className='nav-link'>
            <img
              src="/logo2.png"
              height="70"
              alt="中国科学院院徽"
            />
          </Link>

        </Navbar>
        <br />

        <Switch>
          <Route path='/main'>
            <Navbar className='side-text'>
              <Link className='nav-link' style={{ color: "hsl(209, 76%, 67%)" }} to="/main"><AssignmentIcon /> 项目进度</Link>
            </Navbar>
            <Navbar className='side-text'>
              <Link className='nav-link' style={{ color: "white" }} to="/"><AssistantIcon /> 单位报告</Link>
            </Navbar>
            <Navbar className='side-text'>
              <Link className='nav-link' style={{ color: "white" }} to="/"><DataUsageIcon /> 整体报告</Link>
            </Navbar>
            <Navbar className='side-text'>
              <Link className='nav-link' style={{ color: "white" }} to="/data-analysis"><AssessmentIcon /> 数据分析</Link>
            </Navbar>
          </Route>
          <Route path=''>
            <Navbar className='side-text'>
              <Link className='nav-link' style={{ color: "white" }} to="/main"><HomeIcon /> 返回主页</Link>
            </Navbar>
          </Route>
        </Switch>
      </Nav>
    </div>
  )
}

/*
<Navbar className = 'side-text' expand="lg">
                  <NavDropdown style={{color: "white"}} title = "Dropdown">
                      <NavDropdown.Item  href="#action/3.1">Action</NavDropdown.Item>
                      <NavDropdown.Item  href="#action/3.2">Another action</NavDropdown.Item>
                      <NavDropdown.Item  href="#action/3.3">Something</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item  href="#action/3.4">Separated link</NavDropdown.Item>
                  </NavDropdown>
          </Navbar>
*/