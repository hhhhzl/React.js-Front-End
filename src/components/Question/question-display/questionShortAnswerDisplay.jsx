import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";

const QuestionShortAnswerAnswerForm = ({
  qid,
  detail,
  readOnly = false,
  onQuestionSubmit,
  answer,
  submissionID,
}) => {
  const { register, handleSubmit } = useForm({
    defaultValues: answer || {
      blank: "",
    },
  });

  const onFormSubmit = (data) => {
    if (!readOnly && onQuestionSubmit) {
      onQuestionSubmit(data, qid, submissionID);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)}>
      <div className="question-display-content">
        <p className="question-display-detail">{detail}</p>
        <Form.Control
          as="textarea"
          id={`qid--${qid}--sa-answer`}
          {...register("blank")}
        ></Form.Control>
        <br />
        <Button type="submit" variant="outline-success" disabled={readOnly}>
          保存
        </Button>
      </div>
    </Form>
  );
};

export default function QuestionShortAnswerDisplay(props) {
  /* data */

  const [qid, setQid] = useState(props.qid || 0);
  const [title, setTitle] = useState(props.title || "");
  const [detail, setDetail] = useState(props.detail || "");

  useEffect(() => {
    setQid(props.qid || 0);
    setTitle(props.title || "");
    setDetail(props.detail || "");
  }, [props]);

  /* title */

  const renderTitle = () => {
    return (
      <div className="question-display-header">
        <Button variant="outline-dark" disabled>
          简答题
        </Button>
        <h5 className="question-display-title">{title}</h5>
      </div>
    );
  };

  /* render */

  return (
    <div className="question-display-container">
      {renderTitle()}
      <hr />
      <QuestionShortAnswerAnswerForm
        {...{
          qid,
          detail,
          readOnly: props.readOnly,
          onQuestionSubmit: props.onQuestionSubmit,
          answer: props.answer,
          submissionID: props.submissionID,
        }}
      />
    </div>
  );
}
