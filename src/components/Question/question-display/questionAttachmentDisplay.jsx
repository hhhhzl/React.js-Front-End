import React, { useState, useEffect, useRef } from "react";
import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm, useWatch } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

const QuestionAttachmentAnswerForm = ({
  qid,
  detail,
  readOnly = false,
  onQuestionSubmit,
  answer,
  submissionID,
}) => {
  /* setup */
  const { handleSubmit, setValue, control } = useForm({
    defaultValues: answer || {
      files: [],
    },
  });

  const onFormSubmit = (data) => {
    if (!readOnly && onQuestionSubmit) {
      onQuestionSubmit(data, qid, submissionID);
    }
  };

  const files = useWatch({ control, name: "files" });

  /* file upload */
  const refFileUpload = useRef(null);
  const handleFileUploadButtonClick = () => void refFileUpload.current?.click();
  const handleFileUpload = (e) =>
    void setValue("files", [...files, ...e.target.files]);

  /* render */
  const uploadedFilesDisplay = () => {
    return (
      <Table>
        <thead>
          <tr>
            <th>编号</th>
            <th>文件名</th>
            <th>文件大小 (字节)</th>
            <th>文件类型</th>
            <th>功能</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, idx) => {
            // const { name, size } = file;
            // const type = name
            //   .slice(name.lastIndexOf(".") + 1, name.length)
            //   .toUpperCase();
            // 为了显示user问卷填写页面
            return (
              <tr key={uuidv4()}>
                {/* <th>{idx + 1}</th>
                <td>{name}</td>
                <td>{size}</td>
                <td>{type}</td> */}
                <td>
                  <Button variant="outline-primary" onClick={() => 1}>
                    下载
                  </Button>
                  <Button variant="outline-danger" onClick={() => 1}>
                    删除
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  };

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)}>
      <div className="question-display-content">
        <p className="question-display-detail">{detail}</p>
        <Button
          variant="outline-primary"
          onClick={handleFileUploadButtonClick}
          disabled={readOnly}
        >
          上传文件
        </Button>
        <Form.Control
          type="file"
          ref={refFileUpload}
          onChange={handleFileUpload}
          className="d-none"
          multiple
        />
        {uploadedFilesDisplay()}
        <Button type="submit" variant="outline-success" disabled={readOnly}>
          保存
        </Button>
      </div>
    </Form>
  );
};

export default function QuestionAttachmentDisplay(props) {
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
          附件题
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
      <QuestionAttachmentAnswerForm
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
