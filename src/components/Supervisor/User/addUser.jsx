import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button, Row, Col } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { register } from '../../../state/slices/auth';
import { useDispatch } from 'react-redux';
import {
    mapUserType,
    mapUserSex,
    mapUserDegree,
  } from "../../../constants/maps";


export default function SupervisorAddUserInterface(props) {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const mapOrgIDName = {};
    //const [value, setValue] = useState;
    const [last_name, setLastName] = useState("");            	//	姓
    const [first_name, setFirstName] = useState("");	//	名
    const [username, setUsername] = useState("");	//	用户名
    const [password, setPassword] = useState("");   // 密码
    const [confirmPassword, setConfirmPassword] = useState("");
    const [sex, setSex] = useState("");	//	性别
    const [org, setOrg] = useState("1");	//	所属机构
    const [position, setPosition] = useState("");	//	职位
    const [field, setField] = useState("");	//	工作领域
    const [email, setEmail] = useState("");	//	邮箱
    const [mobile_number, setMobileNumber] = useState("");	//	手机号
    const [tel_number, setTelNumber] = useState("");	//	座机号
    const [degree, setDegree] = useState("");	//	学历
    const [user_type, setUserType] = useState("");	//	用户类型
    const [is_active, setIsActive] = useState("");	//	有效


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const testData = {
        last_name: last_name,
        first_name: first_name,
        username: username,
        password: password,
        sex: sex,
        org: org,
        position: position,
        field: field,
        email: email,
        mobile_number: mobile_number,
        tel_number: tel_number,
        degree: degree,
        user_type: user_type,
        is_active: is_active,
    };



    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = document.getElementById("addForm");
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else if (testData.mobile_number.length !== 11) {
            event.preventDefault();
            event.stopPropagation();
            alert("请输入正确的手机号码")
        }
        else {
            dispatch(register( {data: testData} ))
            props.callbackAdd(testData);
            setShow(false);
            setLastName("");
            setFirstName("");
            setUsername("");
            setSex("");
            setOrg("1");
            setPosition("");
            setField("");
            setEmail("");
            setMobileNumber("");
            setTelNumber("");
            setDegree("");
            setUserType("");
            setIsActive("");
        }

        setValidated(true);
    };

    return (
        <>
            <Button className="S-adduser"  variant="primary" onClick={handleShow}>
                用户注册
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <div className="addpeople">
                            添加人员
                        </div>
                        </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="addForm" noValidate validated={validated} >
                        <Form.Group className="username-">
                            <Form.Label>用户名*</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="请输入用户名"
                                value={username}
                                onChange={e => {
                                    const username = e.target.value;
                                    setUsername(username)
                                }}
                            />
                        </Form.Group>
                        <Form.Group className="userpassword-">
                            <Form.Label>密码*</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                placeholder="请输入密码"
                                value={password}
                                onChange={e => {
                                    const password = e.target.value;
                                    setPassword(password)
                                }}
                            />
                        </Form.Group>
                        <Form.Group className="userdetails-">
                            <Row>
                                <Col>
                                    <Form.Label>姓*</Form.Label>
                                    <Form.Control
                                        required
                                        placeholder="Last name"
                                        value={last_name}
                                        onChange={e => {
                                            const last_name = e.target.value;
                                            setLastName(last_name);
                                        }}
                                    />
                                </Col>
                                <Col>
                                    <Form.Label>名*</Form.Label>
                                    <Form.Control
                                        required
                                        placeholder="First name"
                                        value={first_name}
                                        onChange={e => {
                                            const first_name = e.target.value;
                                            setFirstName(first_name);
                                        }}
                                    />
                                </Col>
                                <Col>
                                    <Form.Label>用户性别</Form.Label>
                                    <Form.Select
                                        aria-label="Default select example"
                                        value={sex}

                                        onChange={e => {
                                            const sex = e.target.value;
                                            setSex(sex);
                                        }}
                                    >
                                        <option value="">请选择用户性别</option>
                                        <option value="M">男</option>
                                        <option value="F">女</option>
                                    </Form.Select>
                                </Col>
                            </Row>
                        </Form.Group>


                        <Form.Group className="userposition-">
                            <Row>
                                <Col>
                                    <Form.Label>部门职位</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="请输入部门职位"
                                        value={position}
                                        onChange={e => {
                                            const position = e.target.value;
                                            setPosition(position);
                                        }} />
                                </Col>
                                <Col>
                                    <Form.Label>所属机构*</Form.Label>
                                    <Form.Select
                                        
                                        aria-label="Default select example"
                                        value={org}

                                        onChange={e => {
                                            const org = e.target.value;
                                            setOrg(org);
                                        }}
                                    >
                                        {Object.entries(mapOrgIDName).map(([icode, iname]) => (
                                            <option key={icode} value={icode}>
                                                {`${iname} (${icode})`}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group className="work-area">
                            <Row>
                                <Col>
                                    <Form.Label>工作领域</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="请输入工作领域"
                                        value={field}
                                        onChange={e => {
                                            const field = e.target.value;
                                            setField(field);
                                        }} />
                                </Col>
                                <Col>
                                    <Form.Label>学历</Form.Label>
                                    <Form.Select
                                        required
                                        aria-label="Default select example"
                                        value={degree}

                                        onChange={e => {
                                            const degree = e.target.value;
                                            setDegree(degree);
                                        }}
                                    >
                                        <option value="">请选择用户学历</option>
                                        {Object.entries(mapUserDegree).map(([icode, iname]) => (
                                            <option key={icode} value={icode}>
                                                {iname}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>
                            </Row>

                        </Form.Group>


                        <Form.Group className="mb-3" controlId="formBasicPassword">

                        </Form.Group>

                        <Form.Group className="emailaddress" controlId="formBasicEmail">
                            <Form.Label>邮箱*</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="请输入用户名"
                                value={email}
                                onChange={e => {
                                    const email = e.target.value;
                                    setEmail(email);
                                }}
                            />
                        </Form.Group>

                        <Form.Group className="phonenumber">
                            <Row>
                                <Col>
                                    <Form.Label>手机号码*</Form.Label>
                                    <Form.Control
                                        required
                                        pattern="^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$"
                                        type="tel"
                                        value={mobile_number}
                                        maxLength="11"
                                        onChange={e => {
                                            const mobile_number = e.target.value;

                                            setMobileNumber(mobile_number);

                                        }}
                                    />
                                </Col>
                                <Col>
                                    <Form.Label>座机号码</Form.Label>
                                    <Form.Control
                                        pattern="^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$"
                                        type="tel"
                                        value={tel_number}
                                        maxLength="11"
                                        onChange={e => {
                                            const tel_number = e.target.value;

                                            setTelNumber(tel_number);

                                        }}
                                    />
                                </Col>
                            </Row>
                        </Form.Group>


                        <Form.Group className="mb-3">

                        </Form.Group>

                        <Form.Group className="usertype-">
                            <Row>
                                <Col>
                                    <Form.Label>用户类型*</Form.Label>
                                    <Form.Select aria-label="Default select example"
                                        required
                                        value={user_type}
                                        onChange={e => {
                                            const user_type = e.target.value;
                                            setUserType(user_type);
                                        }}
                                    >
                                        <option value="">请选择用户类型</option>
                                        {Object.entries(mapUserType).map(([icode, iname]) => (
                                            <option key={icode} value={icode}>
                                                {iname}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>
                                <Col>
                                    <Form.Label>状态*</Form.Label>
                                    <Form.Select
                                        required
                                        aria-label="Default select example"
                                        value={is_active}
                                        onChange={e => {
                                            const is_active = e.target.value;
                                            setIsActive(is_active);
                                        }}
                                    >
                                        <option value="">请选择状态</option>
                                        <option value="true">启用</option>
                                        <option value="false">停用</option>
                                    </Form.Select>
                                </Col>
                            </Row>
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        返回
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        注册
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}