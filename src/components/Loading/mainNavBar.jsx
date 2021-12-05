import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import { Container } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default function MainNavBar(props) {
    return (
        <Navbar variant="light" className="app-header" style={{ maxWidth: "100vw", height: "10vh" }}>
            <Container className="nav-bar-main">
                <Navbar.Brand>
                    <img
                        src="/logo3.png"
                        className="d-inline-block align-top"
                        height="50px"
                        alt="中国科学院"
                    />
                </Navbar.Brand>
                <Nav className="justify-content-end" fill variant="pills">
                <Nav.Item>
                        <Link className='nav-link' style={{ color: "purple"}} to='/register'>账号注册</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link className='nav-link' to='/login'>登录系统</Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Link className='nav-link' style={{ color: "purple"}} to=''>关于我们</Link>
                    </Nav.Item>
                </Nav>
            </Container>
        </Navbar>
    );
}