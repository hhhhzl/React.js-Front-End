import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form'
import { Button, Col, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { CreateProject } from '../../../state/slices/projs';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers, selectLastUpdatedAtUsers } from '../../../state/slices/users';
import { shouldRefetchList } from '../../../state/store';



export default function SupervisorEditProjectInterface(props) {
    const dispatch = useDispatch();

    // refresh admins
    const lastUpdatedAt = useSelector(selectLastUpdatedAtUsers);
    useEffect(() => {
        if (shouldRefetchList(lastUpdatedAt)) {
            dispatch(fetchAllUsers());
        }
    }, [dispatch, lastUpdatedAt])

    //dispatch(fetchAllUsers);
    const admins = useSelector((state) => state.users.items.filter(u => u.user_type === "A"));

    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);

    const [name, setName] = useState("");
    const [admin, setAdmin] = useState("");
    const [start_date_year, setStartDateYear] = useState("");
    const [start_date_month, setStartDateMonth] = useState("");
    const [start_date_day, setStartDateDay] = useState("");
    const [end_date_year, setEndDateYear] = useState("");
    const [end_date_month, setEndDateMonth] = useState("");
    const [end_date_day, setEndDateDay] = useState("");
    const [send_with, setSendWith] = useState("");
    const [will_mark, setWillMark] = useState("");
    const [is_active, setIsActive] = useState("");


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // put '0' in front if 1-9 month or day
    const startMonth = String(start_date_month).padStart(2, '0');
    const startDay = String(start_date_day).padStart(2, '0');
    const endMonth = String(end_date_month).padStart(2, '0');
    const endDay = String(end_date_day).padStart(2, '0');


    const testData = {
        name: name,
        admin: parseInt(admin),
        send_with: send_with,
        will_mark: will_mark,
        start_time: start_date_year + "-" + startMonth + "-" + startDay + "T00:00:00",
        end_time: end_date_year + "-" + endMonth + "-" + endDay + "T23:59:59",
        is_active: is_active,
    };


    const handleSubmit = (event) => {
        const form = document.getElementById("addProject");
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            console.log(testData);
            dispatch(CreateProject({ data: testData }));
            setShow(false);
            setName("");
            setAdmin("");
            setStartDateYear("");
            setStartDateMonth("");
            setStartDateDay("");
            setEndDateYear("");
            setEndDateMonth("");
            setEndDateDay("");
            setSendWith("");
            setWillMark("");
            setIsActive("");
        }

        setValidated(true);
    };


    return (
        <>
            <Button className="supevisorButton"  variant="primary" onClick={handleShow}>
                添加
            </Button>

            <Modal
                dialogClassName="supervisor-edit-modal"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <div className={"modal-title2"}>
                        添加评估项目
                        </div>
                        </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Form noValidate validated={validated} id="addProject">
                        <Form.Group className="mb-3" controlId="nomeaning">
                            <Form.Label>项目名称*</Form.Label>
                            <Form.Control
                                required
                                size="lg"
                                type="text"
                                placeholder="请输入项目名称"
                                value={name}
                                onChange={e => {
                                    const name = e.target.value;
                                    setName(name)
                                }}
                            />
                            <Form.Text className="text-muted">
                                例：2020年信息化评估
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>绑定机构</Form.Label>
                            <Form.Control type="text" placeholder="待升级功能" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>管理员*</Form.Label>
                            <Form.Select
                                required
                                aria-label="选择管理员"
                                value={admin}
                                onChange={e => {
                                    const admin = e.target.value;
                                    setAdmin(admin);
                                }}
                            >
                                <option value="">请选择管理员</option>
                                {admins.map((elem) => (
                                    <option key={elem.id} value={elem.id}>
                                        {elem.last_name + elem.first_name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>发放方式</Form.Label>
                            <Form.Select aria-label="选择发放方式"
                                required
                                value={send_with}
                                onChange={e => {
                                    const send_with = e.target.value;
                                    setSendWith(send_with);
                                }}
                            >
                                <option value="">请选择发放方式</option>
                                <option value="L">登录系统</option>
                                <option value="A">匿名邮件</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>是否记分</Form.Label>
                            <Form.Select aria-label="选择是否计分"
                                required
                                value={will_mark}
                                onChange={e => {
                                    const will_mark = e.target.value;
                                    setWillMark(will_mark);
                                }}
                            >
                                <option value="">请选择是否计分</option>
                                <option value="true">计分</option>
                                <option value="false">不计分</option>
                            </Form.Select>
                        </Form.Group>



                        <Form.Group as={Row} className="mb-4">
                            <Form.Label>开始时间*</Form.Label>
                            <Row>
                                <Col>
                                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                        <Col sm={8}>
                                            <Form.Control
                                                required
                                                type="number"
                                                placeholder="YYYY"
                                                value={start_date_year}
                                                min={1950}
                                                max={2050}
                                                onChange={e => {
                                                    const start_date_year = e.target.value;
                                                    setStartDateYear(start_date_year);
                                                }}
                                            />
                                        </Col>
                                        <Form.Label column sm={2}>
                                            年
                                        </Form.Label>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                        <Col sm={7}>
                                            <Form.Control
                                                required
                                                type="number"
                                                placeholder="MM"
                                                value={start_date_month}
                                                min={1}
                                                max={12}
                                                onChange={e => {
                                                    const start_date_month = e.target.value;
                                                    setStartDateMonth(start_date_month);
                                                }}
                                            />
                                        </Col>
                                        <Form.Label column sm={2}>
                                            月
                                        </Form.Label>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                        <Col sm={7}>
                                            <Form.Control
                                                required
                                                type="number"
                                                placeholder="DD"
                                                value={start_date_day}
                                                min={1}
                                                max={31}
                                                onChange={e => {
                                                    const start_date_day = e.target.value;

                                                    setStartDateDay(start_date_day);
                                                }}
                                            />
                                        </Col>
                                        <Form.Label column sm={2}>
                                            日
                                        </Form.Label>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Form.Label>结束时间*</Form.Label>
                                <Col>
                                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                        <Col sm={8}>
                                            <Form.Control
                                                required
                                                type="number"
                                                placeholder="YYYY"
                                                value={end_date_year}
                                                min={1950}
                                                max={2050}
                                                onChange={e => {
                                                    const end_date_year = e.target.value;
                                                    setEndDateYear(end_date_year);
                                                }}
                                            />
                                        </Col>
                                        <Form.Label column sm={2}>
                                            年
                                        </Form.Label>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                        <Col sm={7}>
                                            <Form.Control
                                                required
                                                type="number"
                                                placeholder="MM"
                                                value={end_date_month}
                                                min={1}
                                                max={12}
                                                onChange={e => {
                                                    const end_date_month = e.target.value;
                                                    setEndDateMonth(end_date_month);
                                                }}
                                            />
                                        </Col>
                                        <Form.Label column sm={2}>
                                            月
                                        </Form.Label>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                        <Col sm={7}>
                                            <Form.Control
                                                required
                                                type="number"
                                                placeholder="DD"
                                                value={end_date_day}
                                                min={1}
                                                max={31}
                                                onChange={e => {
                                                    const end_date_day = e.target.value;
                                                    setEndDateDay(end_date_day);
                                                }}
                                            />
                                        </Col>
                                        <Form.Label column sm={2}>
                                            日
                                        </Form.Label>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form.Group>


                        <Form.Group className="mb-5">
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
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                  
                    <Button  variant="secondary" onClick={handleClose}>
                        关闭
                    </Button>
                    <Button  variant="primary" type="submit" onClick={handleSubmit}>
                        保存
                    </Button>
                    
                </Modal.Footer>
            </Modal>
        </>
    );
}