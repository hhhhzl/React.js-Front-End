import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form'
import { Button, Row, Col } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import {
    mapUserType,
    mapUserSex,
    mapUserDegree,
} from "../../../constants/maps";
import { updateUser } from '../../../state/slices/users';



// Edit Button for Supervisor projects
export default function SupervisorEditUserInterface(props) {

    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const mapOrgIDName = {};

    // Set the default variables in table
    const [last_name, setLastName] = useState(props.value.last_name);
    const [first_name, setFirstName] = useState(props.value.first_name);
    const [username, setUsername] = useState(props.value.username);
    const [password, setPassword] = useState(props.value.password);
    const [sex, setSex] = useState(props.value.sex);	//	性别
    const [org, setOrg] = useState(props.value.org);
    const [position, setPosition] = useState(props.value.position);
    const [mobile_number, setMobileNumber] = useState(props.value.mobile_number);
    const [tel_number, setTelNumber] = useState();	//	座机号
    const [email, setEmail] = useState(props.value.email);
    const [user_type, setUserType] = useState(props.value.user_type);
    const [degree, setDegree] = useState();	//	学历
    const [field, setField] = useState(props.value.field);
    const [is_active, setIsActive] = useState(props.value.is_active);

    // functions to control Modal
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // life-cycle function
    useEffect(() => {
        setLastName(props.value.last_name);
        setFirstName(props.value.first_name);
        setUsername(props.value.username);
        setSex(props.value.sex);
        setOrg(props.value.org);
        setPosition(props.value.position);
        setMobileNumber(props.value.mobile_number);
        setTelNumber(props.value.tel_number);
        setEmail(props.value.email);
        setUserType(props.value.user_type);
        setDegree(props.value.degree);
        setField(props.value.field);
        setIsActive(props.value.is_active);
    }, [props.value])


    // group the data into one object
    const testData = {
        last_name: last_name,
        first_name: first_name,
        username: username,
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

    // Send to data to parents component (ProjectTableRow) when click submit


    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = document.getElementById("addForm");
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            dispatch(updateUser({ userID: props.value.id, data: testData }))
            setShow(false);
        }

        setValidated(true);
    };



    return (
        <> {/* Button appear at the right-end of each row of the table */}
            <Button variant="primary" onClick={handleShow}>
                编辑
            </Button>


            {/* Modal will apear after click the above Button */}
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                      <div className="modifyinformation">
                        修改信息
                      </div>
                      </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="addForm" noValidate validated={validated} >
                        <Form.Group className="usernameinfo-">
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
                        <Form.Group className="namedetailsinfo-">
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
                                        required
                                        aria-label="Default select example"
                                        value={sex}

                                        onChange={e => {
                                            const sex = e.target.value;
                                            setSex(sex);
                                        }}
                                    >
                                        <option value="">请选择性别</option>
                                        <option value="M">男</option>
                                        <option value="F">女</option>
                                    </Form.Select>
                                </Col>
                            </Row>
                        </Form.Group>


                        <Form.Group className="positioninfo-">
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

                        <Form.Group className="workareainfo-">
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

                        <Form.Group className="emailinformation-" controlId="formBasicEmail">
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

                        <Form.Group className="phonenumberinfo-">
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

                        <Form.Group className="usertypeinfo-">
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
                        关闭
                    </Button>
                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                        提交修改
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}





// Delete Button for supervisor project
export function SupervisorDeleteUser() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // note its parent copoment (ProjectTableRow) to delete this row
    const handleDelete = () => {
        setShow(false);
    }

    return (
        <>
            <Button variant="danger" onClick={handleShow}>
                删除
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>提示</Modal.Title>
                </Modal.Header>
                <Modal.Body>该用户暂时无法删除</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        返回
                    </Button>
                    {/*<Button variant="danger" onClick={handleDelete}>
                        删除
    </Button>*/}
                </Modal.Footer>
            </Modal>
        </>
    );
}