import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import HomeIcon from '@material-ui/icons/Home';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import { Nav } from 'react-bootstrap';
import { Switch, Route, Link } from "react-router-dom";

export default function SideMenuSupervisor() {

  return (
    <div className='side-menu'>
      
      <Nav>
        <Navbar className='img-center'>
          <Nav.Link href="#home">
           
          <img
              src="/logo2.png"
              height="70"
              alt="中国科学院院徽"
            />
          </Nav.Link>

        </Navbar>
        <br />
        
          <Switch>
            <Route path='/institutions'>
            <Navbar className='side-text'>
                <Link className='nav-link' style={{ color: "white" }} to='/main'><HomeIcon />评估系统</Link>
              </Navbar>
              <Navbar className='side-text' expand="lg">
                <Link className='nav-link' style={{ color: "hsl(209, 76%, 67%)" }} to='institutions'><AccountBalanceIcon />机构设置</Link>
              </Navbar>
              <Navbar className='side-text' expand="lg">
                <Link className='nav-link' style={{ color: "white" }} to='/users'><AccountBoxIcon />人员设置</Link>
              </Navbar>

            </Route>
            <Route path='/users'>
            <Navbar className='side-text'>
                <Link className='nav-link' style={{ color: "white" }} to='/main'><HomeIcon />评估系统</Link>
              </Navbar>
              <Navbar className='side-text' expand="lg">
                <Link className='nav-link' style={{ color: "white" }} to='/institutions'><AccountBalanceIcon />机构设置</Link>
              </Navbar>
              <Navbar className='side-text' expand="lg">
                <Link className='nav-link' style={{ color: "hsl(209, 76%, 67%)" }} to='/users'><AccountBoxIcon />人员设置</Link>
              </Navbar>
            </Route>
            <Route path='/main'>
              <Navbar className='side-text'>
                <Link className='nav-link' style={{ color: "hsl(209, 76%, 67%)" }} to='/main'><HomeIcon />评估系统</Link>
              </Navbar> 
              <Navbar className='side-text' expand="lg">
                <Link className='nav-link' style={{ color: "white" }} to='/institutions'><AccountBalanceIcon />机构设置</Link>
              </Navbar>
              <Navbar className='side-text' expand="lg">
                <Link className='nav-link' style={{ color: "white" }} to='/users'><AccountBoxIcon />人员设置</Link>
              </Navbar>
            </Route>



          </Switch>
        

      </Nav>
      
    </div>
  )
}