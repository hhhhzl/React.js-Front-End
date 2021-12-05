import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { login } from "../../state/slices/auth";

export default function LoginForm() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <Form>
        <Form.Group as={Row} className="loadingusername">
          <Form.Label column sm={3}>
            用户名
          </Form.Label>
            <Form.Control
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group as={Row} className="loadinguserpassword">
          <Form.Label column sm={2}>
            密码
          </Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group as={Row} className="loadinglogin">
            <Button
              variant="outline-primary"
              onClick={() => dispatch(login({ username, password }))}
            >
              登录
            </Button>
        </Form.Group>
      </Form>
    </div>
  );
}
