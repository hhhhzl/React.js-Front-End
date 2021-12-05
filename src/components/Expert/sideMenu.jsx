import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import HomeIcon from '@material-ui/icons/Home';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import { Nav } from 'react-bootstrap';

export default function SideMenu() {
  return (
    <div className='side-menu'>
      <Nav>
        <Navbar>
          <Nav.Link href="#home">
            <img
              src="logo2.png"
              height="70"
              alt="中国科学院院徽"
            />
          </Nav.Link>

        </Navbar>
        <br />
        <Navbar className='side-text'>
          <Nav.Link style={{ color: "hsl(209, 76%, 67%)" }} href="/expert-interface"><HomeIcon />我的任务</Nav.Link>
        </Navbar>
        <Navbar className='side-text'>
          <Nav.Link style={{ color: "white" }} href=""><HomeIcon />问卷打分</Nav.Link>
        </Navbar>
        <Navbar className='side-text'>
          <Nav.Link style={{ color: "white" }} href="/data-analysis"><HomeIcon />数据分析</Nav.Link>
        </Navbar>
        <Navbar className='side-text'>
          <Nav.Link style={{ color: "white" }} href=""><HomeIcon />单位报告</Nav.Link>
        </Navbar>
        <Navbar className='side-text'>
          <Nav.Link style={{ color: "white" }} href=""><HomeIcon />相关文档</Nav.Link>
        </Navbar>
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