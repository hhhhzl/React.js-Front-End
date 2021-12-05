import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { useForm } from "react-hook-form";

const QuestionMatrixAnswerForm = ({
  qid,
  detail,
  rowLabels,
  columnLabels,
  canMultiSelect,
  readOnly = false,
  onQuestionSubmit,
  answer,
  submissionID,
  annotation,
}) => {
  const { register, handleSubmit, setValue, getValues } = useForm({
    defaultValues: answer || {
      answers: rowLabels.map((_) => Array(columnLabels.length).fill(false)),
    },
  });

  const onFormSubmit = (data) => {
    if (!readOnly && onQuestionSubmit) {
      onQuestionSubmit(data, qid, submissionID);
    }
  };

  const renderMatrix = () => {
    return (
      <Table>
        <thead>
          <tr>
            <th></th>
            {columnLabels.map((label, c) => (
              <th key={c}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowLabels.map((label, r) => (
            <tr key={r}>
              <th>{label}</th>
              {columnLabels.map((_, c) => {
                const optionRegister = register(`answers.${r}.${c}`);
                if (!canMultiSelect) {
                  // overwrite with custom single select handler
                  // not using radios since they conflict with our form
                  const handleSingleSelect = (_) =>
                    setValue(
                      `answers.${r}`,
                      getValues(`answers.${r}`).map((_, idx) => idx === c)
                    );
                  optionRegister.onChange = handleSingleSelect;
                  optionRegister.onBlur = handleSingleSelect;
                    }
    return (
            <td key={c}>
              <Form.Check
                id={`qid--${qid}--matrix--${r}--${c}`}
                type="checkbox"
                {...optionRegister}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)}>
      <div className="question-display-content">
        <p className="question-display-detail">{detail}</p>
        {renderMatrix()}
        <Button type="submit" variant="outline-success" disabled={readOnly}>
          保存
        </Button>
      </div>
    </Form>
  );
};

export default function QuestionMatrixDisplay(props) {
  /* data */

  const [qid, setQid] = useState(props.qid || 0);
  const [title, setTitle] = useState(props.title || "");
  const [detail, setDetail] = useState(props.detail || "");
  const [rowLabels, setRowLabels] = useState(props.rowLabels || []);
  const [columnLabels, setColumnLabels] = useState(props.columnLabels || []);
  const [canMultiSelect, setCanMultiSelect] = useState(props.canMultiSelect || false);
  

  useEffect(() => {
    setQid(props.qid || 0);
    setTitle(props.title || "");
    setDetail(props.detail || "");
    setRowLabels(props.rowLabels || []);
    setColumnLabels(props.columnLabels || []);
    setCanMultiSelect(props.canMultiSelect || false);
    
  }, [props]);

  /* title */

  const renderTitle = () => {
    return (
      <div className="question-display-header">
        <Button variant="outline-dark" disabled>
          矩阵{canMultiSelect ? "多选" : "单选"}题
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
      <QuestionMatrixAnswerForm
        {...{
          qid,
          detail,
          rowLabels,
          columnLabels,
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
