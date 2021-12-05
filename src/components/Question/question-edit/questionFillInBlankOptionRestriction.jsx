import React, { useEffect } from "react";
import { Form } from "react-bootstrap";

const TextOptionRestriction = ({ restrictions, setRestrictions }) => {
  return <></>;
};

const IntegerOptionRestriction = ({ restrictions, setRestrictions }) => {
  return (
    <>
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
    </>
  );
};

const DecimalOptionRestriction = ({ restrictions, setRestrictions }) => {
  return (
    <>
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
