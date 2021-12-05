import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";

const QuestionFillInBlankAnswerForm = ({
  qid,
  detail,
  options,
  readOnly = false,
  onQuestionSubmit,
  answer,
  submissionID,
 
}) => {
  const { register, handleSubmit } = useForm({
    defaultValues: answer || {
      blank: Array(options.length).fill(""),
    },
  });

  const onFormSubmit = (data) => {
    if (!readOnly && onQuestionSubmit) {
      onQuestionSubmit(data, qid, submissionID);
    }
  };

  const blankPattern = /\|_{3,}\|/g; // |___|, |____|, ...

  const parseDetail = () => {
    let detailLines = detail.split(blankPattern).map((str, i) => {
      let blankElem =
        i === 0 ? null : options[i - 1] ? (
          <Form.Control
            id={`qid--${qid}--fib-blank-${i - 1}`}
            style={{ width: `${options[i - 1].width + 1.5}em` }}
            {...register(`blank.${i - 1}`)}
          ></Form.Control>
        ) : (
          <Form.Control style={{ width: "3.5em" }}></Form.Control>
        );
      let strBr = str.split("\n").map((substr, j) => (
        <React.Fragment key={j}>
          {j === 0 ? null : <br />}
          {substr}
        </React.Fragment>
      ));

      return (
        <React.Fragment key={i}>
          {blankElem}
          {strBr}
        </React.Fragment>
      );
    });

    return detailLines;
  };

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)}>
      <div className="question-display-content">
        <p className="question-display-detail">{parseDetail()}</p>
        <br />
        <Button type="submit" variant="outline-success" disabled={readOnly}>
          保存
        </Button>
      </div>
    </Form>
  );
};

export default function QuestionFillInBlankDisplay(props) {
  /* data */

  const [qid, setQid] = useState(props.qid || 0);
  const [title, setTitle] = useState(props.title || "");
  const [detail, setDetail] = useState(props.detail || "");
  const [options, setOptions] = useState(props.options || []);
 

  useEffect(() => {
    setQid(props.qid || 0);
    setTitle(props.title || "");
    setDetail(props.detail || "");
    setOptions(props.options || []);
    
  }, [props]);

  /* title */

  const renderTitle = () => {
    return (
      <div className="question-display-header">
        <Button variant="outline-dark" disabled>
          填空题
        </Button>
        <h5 className="question-display-title">{title}</h5>
      </div>
    );
  };

/*annotation*/


  /* render */

  return (
    <div className="question-display-container">
      {renderTitle()}
      <hr />
      <QuestionFillInBlankAnswerForm
        {...{
          qid,
          detail,
          options,
          readOnly: props.readOnly,
          onQuestionSubmit: props.onQuestionSubmit,
          answer: props.answer,
          submissionID: props.submissionID,
         
        }}
      />
     
    </div>
  );
}
