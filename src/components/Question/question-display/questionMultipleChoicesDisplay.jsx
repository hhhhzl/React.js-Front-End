import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";

const QuestionMultipleChoicesAnswerForm = ({
  qid,
  detail,
  options,
  optionsHaveBlank,
  canMultiSelect,
  readOnly = false,
  onQuestionSubmit,
  answer,
  submissionID,
}) => {
  const { register, handleSubmit, setValue, getValues } = useForm({
    defaultValues: answer || {
      option: Array(options.length).fill(false),
      blank: Array(options.length).fill(null),
    },
  });

  const onFormSubmit = (data) => {
    if (!readOnly && onQuestionSubmit) {
      onQuestionSubmit(data, qid, submissionID);
    }
  };

  let renderedOptions = options.map((option, i) => {
    const optionRegister = register(`option.${i}`);
    if (!canMultiSelect) {
      // overwrite with custom single select handler
      // not using radios since they conflict with our form
      const handleSingleSelect = (_) =>
        setValue(
          "option",
          getValues("option").map((_, idx) => idx === i)
        );
      optionRegister.onChange = handleSingleSelect;
      optionRegister.onBlur = handleSingleSelect;
    }

    return (
      <Form.Group key={uuidv4()}>
        <Form.Check
          id={`qid--${qid}--mc--${i}`}
          type="checkbox"
          label={
            <div>
              {option}
              {optionsHaveBlank[i] ? (
                <Form.Control
                  className="mc-options-blank"
                  {...register(`blank.${i}`)}
                ></Form.Control>
              ) : null}
            </div>
          }
          {...optionRegister}
        />
      </Form.Group>
    );
  });

  return (
    <div className="question-display-content">
      <Form onSubmit={handleSubmit(onFormSubmit)}>
        <p className="question-display-detail">{detail}</p>
        <fieldset>
          <Form.Group>{renderedOptions}</Form.Group>
        </fieldset>
        <Button type="submit" variant="outline-success" disabled={readOnly}>
          保存
        </Button>
      </Form>
    </div>
  );
};

export default function QuestionMultipleChoicesDisplay(props) {
  /* data */

  const [qid, setQid] = useState(props.qid || 0);
  const [title, setTitle] = useState(props.title || "");
  const [detail, setDetail] = useState(props.detail || "");
  const [options, setOptions] = useState(props.options || []);
  const [optionsHaveBlank, setOptionsHaveBlank] = useState(
    props.optionsHaveBlank || []
  );
  const [canMultiSelect, setCanMultiSelect] = useState(
    props.canMultiSelect || false
  );

  useEffect(() => {
    setQid(props.qid);
    setTitle(props.title);
    setDetail(props.detail);
    setOptions(props.options);
    setOptionsHaveBlank(props.optionsHaveBlank);
    setCanMultiSelect(props.canMultiSelect);
  }, [props]);

  /* title */

  const renderTitle = () => {
    return (
      <div className="question-display-header">
        <Button variant="outline-dark" disabled>
          {canMultiSelect ? "多选" : "单选"}题
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
      <QuestionMultipleChoicesAnswerForm
        {...{
          qid,
          detail,
          options,
          optionsHaveBlank,
          canMultiSelect,
          readOnly: props.readOnly,
          onQuestionSubmit: props.onQuestionSubmit,
          answer: props.answer,
          submissionID: props.submissionID,
        }}
      />
    </div>
  );
}
