import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { register } from "../../state/slices/auth";
import {
  mapUserType,
  mapUserSex,
  mapUserDegree,
} from "../../constants/maps";
import { propTypes } from "react-bootstrap/esm/Image";
import { SentimentSatisfiedAlt } from "@material-ui/icons";

export default function RegisterForm(props,{ mapOrgIDName = {} }) {
  const [show, setShow]=useState(false);
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [sex, setSex] = useState("M");
  const [mobileNumber, setMobileNumber] = useState("");
  const [degree, setDegree] = useState("1");
  const [org, setOrg] = useState("1");
  const [userType, setUserType] = useState("U");

  const handleClose=()=>setShow(false);
  const handleShow=()=> setShow(true);
  const testData = {
    last_name: lastName,
    first_name: firstName,
    username: username,
    password: password,
    sex: sex,
    org: org,
    email: email,
    mobile_number: mobileNumber,
    degree: degree,
    user_type: userType,
};

const [validated, setValidated] = useState(false);
const handleSubmit = (event) => {
  const form = document.getElementById("addProject");
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
      // props.callbackAdd(testData);
      setShow(false);
      setLastName("");
      setFirstName("");
      setUsername("");
      setSex("");
      setOrg("1");
      setEmail("");
      setMobileNumber("");
      setDegree("");
      setUserType("");
  }

  setValidated(true);
};

  return (
    <div>
      <strong>注册</strong>
      <Form noValidate validated={validated} id="addProject">
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            用户名
          </Form.Label>
          <Col sm={3}>
            <Form.Control
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></Form.Control>
          </Col>
          <Form.Label column sm={2}>
            邮箱
          </Form.Label>
          <Col sm={3}>
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            密码
          </Form.Label>
          <Col sm={3}>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Col>
          <Form.Label column sm={2}>
            手机号码
          </Form.Label>
          <Col sm={3}>
            <Form.Control
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            ></Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            姓
          </Form.Label>
          <Col sm={3}>
            <Form.Control
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></Form.Control>
          </Col>
          <Form.Label column sm={2}>
            名
          </Form.Label>
          <Col sm={3}>
            <Form.Control
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            性别
          </Form.Label>
          <Col sm={3}>
            <Form.Select value={sex} onChange={(e) => setSex(e.target.value)}>
              {Object.entries(mapUserSex).map(([icode, iname]) => (
                <option key={icode} value={icode}>
                  {iname}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Form.Label column sm={2}>
            学历
          </Form.Label>
          <Col sm={3}>
            <Form.Select
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
            >
              {Object.entries(mapUserDegree).map(([icode, iname]) => (
                <option key={icode} value={icode}>
                  {iname}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            所属机构
          </Form.Label>
          <Col sm={3}>
            <Form.Select value={org} onChange={(e) => setOrg(e.target.value)}>
              {Object.entries(mapOrgIDName).map(([icode, iname]) => (
                <option key={icode} value={icode}>
                  {`${iname} (${icode})`}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Form.Label column sm={2}>
            用户类型
          </Form.Label>
          <Col sm={3}>
            <Form.Select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              {Object.entries(mapUserType).map(([icode, iname]) => (
                <option key={icode} value={icode}>
                  {iname}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group>
          <Col sm={2}>
            <Button
              variant="outline-primary"
              onClick={handleSubmit}
              // onClick={() => {
              //   const data = {
              //     username,
              //     password,
              //     email,
              //     last_name: lastName,
              //     first_name: firstName,
              //     sex,
              //     mobile_number: mobileNumber,
              //     degree,
              //     org: org,
              //     user_type: userType,
              //   };
              //   dispatch(register({ data }));
              // }}
            >
              注册
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
}
