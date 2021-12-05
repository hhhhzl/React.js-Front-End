import React, { useState } from "react";
import QuestionMultipleChoicesDisplay from "../question-display/questionMultipleChoicesDisplay";
import { Button, Card, Col, Form, Table, Row, Collapse } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

import { useDispatch } from "react-redux";
import {
  updateDraftItemQE,
  deleteDraftItemQE,
  swapDraftItemIndicesQE,
} from "../../../state/slices/question-edit";

export default function QuestionMultipleChoicesEdit(props) {
  /* data */
  const dispatch = useDispatch();
  const [qid, setQid] = useState(props.qid || 0);
  const [title, setTitle] = useState(props.title || "");
  const [detail, setDetail] = useState(props.detail || "");
  const [minScore, setMinScore] = useState(props.minScore || 0);
  const [maxScore, setMaxScore] = useState(props.maxScore || 0);
  const [optionInfo, setOptionInfo] = useState(
    props.options
      ? props.options.map((option, i) => ({
          hiddenKey: uuidv4(),
          // use (and only use) uuid as the key in the returned HTML elements in map()
          // it's a hack to ensure key's uniqueness since all {i, option, score} might change
          option: option,
          score: props.scores[i],
          hasBlank: props.optionsHaveBlank[i],
        }))
      : []
  );
  const [canMultiSelect, setCanMultiSelect] = useState(
    props.canMultiSelect || false
  );

  /* display */
  const [displayVisible, setDisplayVisible] = useState(true);
  const [editorVisible, setEditorVisible] = useState(false);
  const [optionsEditorVisible, setOptionsEditorVisible] = useState(false);

  /* option editor handlers */

  const handleOptionAdd = (idx) => {
    setOptionInfo([
      ...optionInfo.slice(0, idx),
      {
        hiddenKey: uuidv4(),
        option: "",
        score: 0,
        hasBlank: false,
      },
      ...optionInfo.slice(idx, optionInfo.length),
    ]);
  };

  const handleOptionTextChange = (idx, newValue) => {
    setOptionInfo([
      ...optionInfo.slice(0, idx),
      { ...optionInfo[idx], option: newValue },
      ...optionInfo.slice(idx + 1, optionInfo.length),
    ]);
  };

  const handleOptionScoreChange = (idx, newValue) => {
    setOptionInfo([
      ...optionInfo.slice(0, idx),
      { ...optionInfo[idx], score: newValue },
      ...optionInfo.slice(idx + 1, optionInfo.length),
    ]);
  };

  const handleOptionHasBlankChange = (idx) => {
    setOptionInfo([
      ...optionInfo.slice(0, idx),
      { ...optionInfo[idx], hasBlank: !optionInfo[idx].hasBlank },
      ...optionInfo.slice(idx + 1, optionInfo.length),
    ]);
  };

  const handleOptionMoveUp = (idx) => {
    if (idx > 0) {
      let newOptionInfo = optionInfo.slice();
      [newOptionInfo[idx - 1], newOptionInfo[idx]] = [
        newOptionInfo[idx],
        newOptionInfo[idx - 1],
      ];
      setOptionInfo(newOptionInfo);
    }
  };

  const handleOptionMoveDown = (idx) => {
    if (idx < optionInfo.length - 1) {
      let newOptionInfo = optionInfo.slice();
      [newOptionInfo[idx + 1], newOptionInfo[idx]] = [
        newOptionInfo[idx],
        newOptionInfo[idx + 1],
      ];
      setOptionInfo(newOptionInfo);
    }
  };

  const handleOptionDelete = (idx) => {
    setOptionInfo([
      ...optionInfo.slice(0, idx),
      ...optionInfo.slice(idx + 1, optionInfo.length),
    ]);
  };

  /* option editor */

  const renderOptionsEditor = () => {
    return (
      <div className="mc-options-editor">
        <Table id={`${qid}--mc-options-editor`}>
          <thead>
            <tr>
              <th>选项描述</th>
              <th>分值</th>
              <th>填空符</th>
              <th>功能</th>
            </tr>
          </thead>
          <tbody>
            {optionInfo.map((info, i) => (
              <tr key={info.hiddenKey}>
                <td>
                  <Form.Control
                    as="textarea"
                    type="text"
                    defaultValue={info.option}
                    onChange={(e) => handleOptionTextChange(i, e.target.value)}
                  />
                </td>
                <td>
                  <Form.Control
                    type="number"
                    defaultValue={info.score}
                    onChange={(e) => handleOptionScoreChange(i, e.target.value)}
                  />
                </td>
                <td>
                  <Form.Switch
                    checked={info.hasBlank}
                    onChange={(e) => handleOptionHasBlankChange(i)}
                  />
                </td>
                <td>
                  <div className="mc-options-buttons-container">
                    <Button
                      variant="outline-primary"
                      disabled={i === 0}
                      onClick={() => handleOptionMoveUp(i)}
                    >
                      上移
                    </Button>

                    <Button
                      variant="outline-primary"
                      disabled={i === optionInfo.length - 1}
                      onClick={() => handleOptionMoveDown(i)}
                    >
                      下移
                    </Button>

                    <Button
                      variant="outline-success"
                      onClick={() => handleOptionAdd(i + 1)}
                    >
                      {/* insert after optionInfo[i] */}
                      添加
                    </Button>

                    <Button
                      variant="outline-danger"
                      onClick={() => handleOptionDelete(i)}
                    >
                      删除
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  };

  const packQuestionData = () => {
    const options = optionInfo.map((o) => o.option);
    const optionsHaveBlank = optionInfo.map((o) => o.hasBlank);
    const scores = optionInfo.map((o) => parseInt(o.score));

    const data = {
      id: qid,
      question_type: 1,
      title: title,
      min_score: minScore,
      max_score: maxScore,
      stem: JSON.stringify({
        detail,
        options,
        optionsHaveBlank,
        scores,
        canMultiSelect,
      }),
      rubric:"A",
      rubric_detail: JSON.stringify(scores),
    };
    return data;
  };

  const renderEditor = () => {
    return (
      <Form className="question-edit-form">
        <Form.Group as={Row} className="mb-3" controlId="edit--mc--title">
          <Form.Label column sm={2}>
            标题
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              defaultValue={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="edit--mc--detail">
          <Form.Label column sm={2}>
            题干
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              defaultValue={detail}
              onChange={(e) => setDetail(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="edit--mc--scorerange">
          <Form.Label column sm={2}>
            最低分值
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              defaultValue={minScore}
              onChange={(e) => setMinScore(e.target.value)}
            />
          </Col>
          <Form.Label column sm={2}>
            最高分值
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              defaultValue={maxScore}
              onChange={(e) => setMaxScore(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group
          as={Row}
          className="mb-3"
          controlId="edit--mc--canmultiselect"
        >
          <Form.Label column sm={2}>
            允许多选
          </Form.Label>
          <Col sm={10}>
            <Form.Switch
              checked={canMultiSelect}
              onChange={(e) => setCanMultiSelect(e.target.checked)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="edit--mc--options">
          <Form.Label column sm={2}>
            选项设置
          </Form.Label>
          <Col sm={10}>
            <Button
              variant="outline-primary"
              onClick={() => setOptionsEditorVisible(!optionsEditorVisible)}
              aria-controls={`${qid}--mc-options-editor-collapse`}
              aria-expanded={optionsEditorVisible}
            >
              {optionsEditorVisible ? "隐藏" : "显示"}
            </Button>
            <Button
              variant="outline-success"
              onClick={() => handleOptionAdd(optionInfo.length)}
              style={{
                display: optionsEditorVisible ? "inline-block" : "none",
              }}
            >
              添加
            </Button>
          </Col>
          <Collapse in={optionsEditorVisible}>
            <div id={`${qid}--mc-options-editor-collapse`}>
              {renderOptionsEditor()}
            </div>
          </Collapse>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="edit--mc--save-abort">
          <Col sm={12}>
            <Button
              variant="outline-success"
              onClick={() => props.handleQuestionUpdate(packQuestionData())}
            >
              保存
            </Button>

            <Button
              variant="outline-success"
              onClick={() => dispatch(deleteDraftItemQE({ id: props.qid }))}
            >
              删除
          </Button>

          </Col>
        </Form.Group>
      </Form>
    );
  };

  /* render */

  return (
    <div className="question-edit-card-container">
      <Card>
        <Card.Header className="card-question-contents-header">
          预览
          <Button
            variant="outline-dark"
            onClick={() => setDisplayVisible(!displayVisible)}
            aria-controls={`${qid}--display-collapse`}
            aria-expanded={displayVisible}
          >
            {displayVisible ? "隐藏" : "展开"}
          </Button>
        </Card.Header>
        <Collapse in={displayVisible}>
          <Card.Body id={`${qid}--display-collapse`}>
            <QuestionMultipleChoicesDisplay
              {...{
                qid,
                title,
                detail,
                options: optionInfo.map((info) => info.option),
                optionsHaveBlank: optionInfo.map((info) => info.hasBlank),
                canMultiSelect,
                readOnly: true,
              }}
            />
          </Card.Body>
        </Collapse>
        <Card.Header className="card-border-top card-question-contents-header">
          编辑
          <Button
            variant="outline-dark"
            onClick={() => setEditorVisible(!editorVisible)}
            aria-controls={`${qid}--editor-collapse`}
            aria-expanded={editorVisible}
          >
            {editorVisible ? "隐藏" : "展开"}
          </Button>

          <Button
              variant="outline-primary"
              onClick={() => dispatch(swapDraftItemIndicesQE({ id: props.qid }))}
            >
              上移
            </Button>

            <Button
              variant="outline-primary"
              onClick={() => dispatch(updateDraftItemQE({ id: props.qid }))}
            >
              下移
            </Button>

          <Button
              variant="outline-success"
              onClick={() => dispatch(deleteDraftItemQE({ id: props.qid }))}
            >
              删除
          </Button>
          
        </Card.Header>
        <Collapse in={editorVisible}>
          <Card.Body id={`${qid}--editor-collapse`}>{renderEditor()}</Card.Body>
        </Collapse>
      </Card>
    </div>
  );
}
