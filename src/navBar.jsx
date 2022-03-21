import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import { Container } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import EditIcon from '@material-ui/icons/EditTwoTone';
import ExitToAppIcon from '@material-ui/icons/ExitToAppTwoTone';
import { useDispatch } from 'react-redux';
import { logout } from './state/slices/auth';

export default function NavBarTest(props) {
    const dispatch = useDispatch();
    return (
        
        <Navbar bg="light" variant="info" className="app-header">
            <Container >
                <Navbar.Brand>
                    <img
                        src="/logo.png"
                        width="100%"
                        height="50"
                        alt="中国科学院"
                    />
                </Navbar.Brand>
                <Nav className="me-auto">
                </Nav>
                欢迎你，{props.usertype} {props.username}
                <Nav className="ml-auto">

                    <NavDropdown className="head"
                      
                        title={
                            <div >
                                <Image
                                    src="/head.jpeg"
                                    width="100%"
                                    height="40"
                                    alt="无法显示图片"
                                    roundedCircle
                                />
                            </div>
                        }
                        id="collasible-nav-dropdown"
                    >
                        <div className="dropdownleft;" >
                        <NavDropdown.Item href="#action/3.1"><EditIcon style={{color: "rgba(0, 0, 0, 0.54)"}}/> 修改密码</NavDropdown.Item>
                        <NavDropdown.Item href="/" onClick={() => dispatch(logout())}><ExitToAppIcon  style={{color: "rgba(0, 0, 0, 0.54)"}}/> 退出</NavDropdown.Item>
                        </div>
                    </NavDropdown>
                </Nav>
            </Container>
        </Navbar>
       
    );
}