import React, { useState, useEffect, useRef } from "react";
import { Button, Form, Table } from "react-bootstrap";
import XLSX from "xlsx";
import moment from "moment";
import { useFieldArray, useForm } from "react-hook-form";

const QuestionTableAnswerForm = ({
  qid,
  detail,
  columnLabels,
  readOnly = false,
  onQuestionSubmit,
  answer,
  submissionID,
}) => {
  const { register, handleSubmit, control, setValue, getValues } = useForm({
    defaultValues: answer || {
      answers: [
        {
          /* one empty row */ ...columnLabels.map((_) => ""),
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "answers",
  });

  const onFormSubmit = (data) => {
    if (!readOnly && onQuestionSubmit) {
      onQuestionSubmit(data, qid, submissionID);
    }
  };

  /* xlsx template handlers */
  const handleTemplateDownload = () => {
    let wb = XLSX.utils.book_new();
    let wsInfo = XLSX.utils.aoa_to_sheet([
      /* row 1 */ ["【模板信息】"],
      /* row 2 */ [
        "问题编号",
        qid,
        null,
        "列标签数",
        columnLabels.length,
        null,
        "生成时间",
        moment().format("YYYY-MM-DD HH:mm:ss"),
        null,
        null,
      ],
      /* row 3 */ [],
      /* row 4 */ ["【注意事项】"],
      /* row 5 */ ["请勿修改模板中由系统生成的内容。"],
      /* row 6 */ [
        '请在"填报内容"工作表中从第2行（列标签下第1行）开始填写表格。',
      ],
      /* row 7 */ ["此模板中填报的内容将在上传后覆盖原有内容。"],
    ]);
    // merge cells
    wsInfo["!merges"] = [
      // text
      ...[1, 3, 4, 5, 6, 7].map((row) => ({
        s: { r: row - 1, c: 0 },
        e: { r: row - 1, c: 9 },
      })),
      // template info
      ...[
        [1, 2], // qid
        [4, 5], // count of column labels
        [7, 9], // time generated
      ].map((range) => ({
        s: { r: 1, c: range[0] },
        e: { r: 1, c: range[1] },
      })),
    ];
    XLSX.utils.book_append_sheet(wb, wsInfo, "模板信息");

    let wsData = XLSX.utils.aoa_to_sheet([
      columnLabels,
      ...getValues("answers"),
    ]);
    XLSX.utils.book_append_sheet(wb, wsData, "填报内容");

    XLSX.writeFile(wb, `template_question_${qid}.xlsx`);
  };

  const refTemplateUpload = useRef(null);
  const handleTemplateUploadButtonClick = () =>
    void refTemplateUpload.current?.click();

  const handleTemplateUpload = (e) => {
    try {
      const file = e.target.files[0];
      if (!file.name.endsWith(".xlsx")) {
        throw Error("上传的文件非XLSX格式");
      }

      let reader = new FileReader();
      reader.onload = (e) => {
        let wb = XLSX.read(e.target.result, { type: "binary" });
        let ws = wb.Sheets["填报内容"];
        let ans = XLSX.utils.sheet_to_json(ws, { header: 1 });
        setValue(
          "answers",
          ans.slice(1, ans.length).map((row) => ({ ...row }))
        );
      };
      reader.readAsBinaryString(file);
    } catch (err) {
      console.error(err); /* TODO: Display with UI */
    }
  };

  /* content */

  const renderTable = () => {
    return (
      <div className="question-display-table-answers-container">
        <Table>
          <thead>
            <tr>
              <th></th>
              {columnLabels.map((label, c) => (
                <th key={c}>{label}</th>
              ))}
              <th>功能</th>
            </tr>
          </thead>
          <tbody>
            {fields.map(({ id }, r) => (
              <tr key={id}>
                <th>{r + 1}</th>
                {columnLabels.map((_, c) => (
                  <td key={c}>
                    <Form.Control
                      as="textarea"
                      key={`${r}--${c}`}
                      id={`qid--${qid}--table--${r}--${c}`}
                      {...register(`answers[${r}].${c}`)}
                      defaultValue={""}
                    />
                  </td>
                ))}
                <td>
                  <Button variant="outline-danger" onClick={() => remove(r)}>
                    删除
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  };

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)}>
      <div className="question-display-content">
        <p className="question-display-detail">{detail}</p>
        <Form.Group className="mb-3" controlId="edit--table--buttons">
          <Button variant="outline-primary" onClick={handleTemplateDownload}>
            下载模板
          </Button>
          <Button
            variant="outline-primary"
            onClick={handleTemplateUploadButtonClick}
            disabled={readOnly}
          >
            上传文件
          </Button>
          <Form.Control
            type="file"
            ref={refTemplateUpload}
            onChange={handleTemplateUpload}
            className="d-none"
          />
          <Button
            variant="outline-success"
            onClick={() => append({})}
          >
            添加空行
          </Button>
        </Form.Group>

        <Form.Control type="file" className="d-none"></Form.Control>
        {renderTable()}

        <Button type="submit" variant="outline-success" disabled={readOnly}>
          保存
        </Button>
      </div>
    </Form>
  );
};

export default function QuestionTableDisplay(props) {
  /* data */

  const [qid, setQid] = useState(props.qid || 0);
  const [title, setTitle] = useState(props.title || "");
  const [detail, setDetail] = useState(props.detail || "");
  const [columnLabels, setColumnLabels] = useState(props.columnLabels || []);

  useEffect(() => {
    setQid(props.qid || 0);
    setTitle(props.title || "");
    setDetail(props.detail || "");
    setColumnLabels(props.columnLabels || []);
    // setAnswers(
    //   props.answers || [Array(props.columnLabels.length || 0).fill("")]
    // );
  }, [props]);

  /* title */

  const renderTitle = () => {
    return (
      <div className="question-display-header">
        <Button variant="outline-dark" disabled>
          表格题
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
      <QuestionTableAnswerForm
        {...{
          qid,
          detail,
          columnLabels,
          readOnly: props.readOnly,
          onQuestionSubmit: props.onQuestionSubmit,
          answer: props.answer,
          submissionID: props.submissionID,
        }}
      />
    </div>
  );
}
