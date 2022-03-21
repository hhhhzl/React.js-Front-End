import React, { useEffect } from "react";
import { Form, Col, Row } from "react-bootstrap";

const TextOptionRestriction = ({ restrictions, setRestrictions }) => {
  return <>
  <Col>
    <Row>
      <div>
      <Form.Label>最小长度</Form.Label>
      <Form.Control
        value={restrictions.min || ""}
        onChange={(e) =>
          setRestrictions({
            min: e.target.value,
            max: restrictions.max,
          })
        }
      />
      </div>
    </Row>
    <Row>
    <div>
      <Form.Label>最大长度</Form.Label>
      <Form.Control
        value={restrictions.max || ""}
        onChange={(e) =>
          setRestrictions({
            min: restrictions.min,
            max: e.target.value,
          })
        }
      />
      </div>
      </Row>
    </Col>
  </>;
};

const IntegerOptionRestriction = ({ restrictions, setRestrictions }) => {
  return (
    <>
    <Col>
    <Row>
      <div>
      <Form.Label>最小值</Form.Label>
      <Form.Control
        size = 'sm'
        value={restrictions.min || ""}
        onChange={(e) =>
          setRestrictions({
            min: e.target.value,
            max: restrictions.max,
          })
        }
      />
      </div>
    </Row>
    <Row>
    <div>
      <Form.Label>最大值</Form.Label>
      <Form.Control
        size = 'sm'
        value={restrictions.max || ""}
        onChange={(e) =>
          setRestrictions({
            min: restrictions.min,
            max: e.target.value,
          })
        }
      />
      </div>
      </Row>
    </Col>
    </>
  );
};

const DecimalOptionRestriction = ({ restrictions, setRestrictions }) => {
  return (
    <>
    <Col>
    <Row>
      <div>
      <Form.Label>最小值</Form.Label>
      <Form.Control
        value={restrictions.min || ""}
        onChange={(e) =>
          setRestrictions({
            min: e.target.value,
            max: restrictions.max,
          })
        }
      />
      </div>
    </Row>
    <Row>
    <div>
      <Form.Label>最大值</Form.Label>
      <Form.Control
        value={restrictions.max || ""}
        onChange={(e) =>
          setRestrictions({
            min: restrictions.min,
            max: e.target.value,
          })
        }
      />
      </div>
      </Row>
    </Col>
    </>
  );
};

export default function QuestionFillInBlankOptionRestriction({
  blanktype = "text",
  restrictions,
  setRestrictions,
}) {

  const mapTypeComponent = {
    text: TextOptionRestriction,
    integer: IntegerOptionRestriction,
    decimal: DecimalOptionRestriction,
  };

  const OptionComponent = mapTypeComponent[blanktype];

  return (
    <div className="fib-option-restriction-container">
      {OptionComponent && (
        <OptionComponent {...{ restrictions, setRestrictions }} />
      )}
    </div>
  );
}
