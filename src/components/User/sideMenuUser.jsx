import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import HomeIcon from '@material-ui/icons/Home';
import AssignmentIcon from '@material-ui/icons/AssignmentOutlined';
import AssessmentIcon from '@material-ui/icons/AssessmentOutlined';
import BallotIcon from '@material-ui/icons/BallotOutlined';
import { Nav } from 'react-bootstrap';
import { Switch, Route, Link } from "react-router-dom";


export default function SideMenuAdmin() {
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
          <Route path='/main'>
            <Navbar className='side-text'>
              <Link className='nav-link' style={{ color: "hsl(209, 76%, 67%)" }} to="/main"><AssignmentIcon /> 问卷填写</Link>
            </Navbar>
            <Navbar className='side-text'>
              <Link className='nav-link' style={{ color: "white" }} to="/main"><AssessmentIcon /> 数据分析</Link>
            </Navbar>
            <Navbar className='side-text'>
              <Link className='nav-link' style={{ color: "white" }} to="/main"><BallotIcon/> 数据报告</Link>
            </Navbar>
          </Route>
          <Route path=''>
          <Navbar className='side-text'>
              <Link className='nav-link' style={{ color: "white" }} to="/main"><HomeIcon /> 返回列表</Link>
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