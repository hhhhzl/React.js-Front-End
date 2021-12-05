import React, { useState, useEffect } from "react";
import QuestionFillInBlankDisplay from "../question-display/questionFillInBlankDisplay";
import QuestionFillInBlankOptionRestriction from "./questionFillInBlankOptionRestriction";
import { Button, Card, Col, Collapse, Form, Row, Table } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

import { useDispatch } from "react-redux";
import {
  updateDraftItemQE,
  deleteDraftItemQE,
  swapDraftItemIndicesQE,
} from "../../../state/slices/question-edit";

function QuestionFillInBlankOptionsEditorRow(props) {
  const [blanktype, setBlanktype] = useState(props.option?.blanktype || "text");
  const [restrictions, setRestrictions] = useState(props.option?.restrictions || {});
  const [width, setWidth] = useState(props.option?.width || 3);
  


  useEffect(() => {
    props.handleChange({
      blanktype,
      restrictions,
      width,
    });
  }, [blanktype, restrictions, width]);

  return (
    <tr>
      <td>{props.rowIdx + 1}</td>
      <td>
        <Form.Select
          value={blanktype}
          onChange={(e) => {
            setBlanktype(e.target.value);
            setRestrictions({});
          }}
        >
          <option value="text">文本</option>
          <option value="integer">整数</option>
          <option value="decimal">小数</option>
        </Form.Select>
      </td>
      <td>
        <QuestionFillInBlankOptionRestriction
          blanktype={blanktype}
          {...{ restrictions, setRestrictions }}
        />
      </td>
      <td>
        <Form.Control
          type="number"
          min={0}
          value={width}
          onChange={(e) => setWidth(parseInt(e.target.value || 3))}
        ></Form.Control>
      </td>
    </tr>
  );
}

export default function QuestionFillInBlankEdit(props) {
  /* data */
  const dispatch = useDispatch();
  const blankPattern = /\|_{3,}\|/g; // |___|, |____|, ...

  const [qid, setQid] = useState(props.qid || 0);
  const [title, setTitle] = useState(props.title || "");
  const [detail, setDetail] = useState(props.detail || "");
  const [minScore, setMinScore] = useState(props.minScore || 0);
  const [maxScore, setMaxScore] = useState(props.maxScore || 0);
  const [scoringType, setscoringType] = useState("");
  const [optionInfo, setOptionInfo] = useState(
    props.options
      ? props.options.map((option) => ({
          hiddenKey: uuidv4(),
          // use (and only use) uuid as the key in the returned HTML elements in map()
          // it's a hack to ensure key's uniqueness since all {i, option, score} might change
          option: option,
        }))
      : []
  );

  /* display */
  const [displayVisible, setDisplayVisible] = useState(true);
  const [editorVisible, setEditorVisible] = useState(false);
  const [optionsEditorVisible, setOptionsEditorVisible] = useState(false);

  const handleChangeOption = (idx, newData) => {
    setOptionInfo(
      optionInfo.map((data, i) =>
        i === idx ? { hiddenKey: data.hiddenKey, option: newData } : data
      )
    );
  };

  const renderOptionsEditor = () => {
    return (
      <div className="fib-options-editor">
        <Table
          id={`${qid}--fib-options-editor`}
          aria-describedby={`${qid}--fib-options-editor--helptext`}
        >
          <thead>
            <tr>
              <th>序号</th>
              <th>类别</th>
              <th>限制</th>
              <th>宽度</th>
            </tr>
          </thead>
          <tbody>
            {optionInfo.map((info, i) => (
              <QuestionFillInBlankOptionsEditorRow
                key={info.hiddenKey}
                rowIdx={i}
                handleChange={(data) => handleChangeOption(i, data)}
                option={info.option}
              />
            ))}
          </tbody>
        </Table>
        <Form.Text id={`${qid}--fib-options-editor--helptext`} muted>
          注： 填空设置中的序号仅对应当前题干中填空符的顺序。
          因此，添加或删除填空符可能会导致填空符与设置的对应关系出现变化。
          建议您在完成题干设计后再进行填空设置。
          若您需要在完成部分设置后添加或删除填空符，请在添加或删除完成后刷新填空设置。
        </Form.Text>
      </div>
    );
  };

  const buildOptionInfo = () => {
    let blankCount = ((detail || "").match(blankPattern) || []).length;
    if (blankCount < optionInfo.length) {
      setOptionInfo(optionInfo.slice(0, blankCount));
    } else if (blankCount > optionInfo.length) {
      let padLength = blankCount - optionInfo.length;
      let pad = Array(padLength);
      for (let i = 0; i < padLength; i++) {
        pad[i] = {
          hiddenKey: uuidv4(),
          option: { width: 2 },
        };
      }
      setOptionInfo([...optionInfo, ...pad]);
    }
  };

  const packQuestionData = () => {
    const data = {
      id: qid,
      question_type: 2,
      title: title,
      min_score: minScore,
      max_score: maxScore,
      stem: JSON.stringify({
        detail,
        options: optionInfo.map((o) => o.option),
      }),
      rubric: scoringType[0],
      rubric_detail: scoringType.slice(2,)
    };
    return data;
  };

  const renderEditor = () => {
    
    return (
      <Form className="question-edit-form">
        <Form.Group as={Row} className="mb-3" controlId="edit--fib--title">
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

        <Form.Group as={Row} className="mb-3" controlId="edit--fib--detail">
          <Form.Label column sm={2}>
            题干
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              defaultValue={detail}
              onChange={(e) => setDetail(e.target.value)}
              aria-describedby={`${qid}--edit--fib--detail--helptext`}
            />
            <Form.Text id={`${qid}--edit--fib--detail--helptext`} muted>
              {"请在需要填空的位置插入填空符 "}
              <b>|___|</b>
              {" (由至少三个半角下划线分隔开的半角双竖线)。"}
            </Form.Text>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="edit--fib--scorerange">
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

        <Form.Group as={Row} className="mb-3" controlId="edit--sa--scorerange">
        <Form.Label>计分方式</Form.Label>
            <Form.Select
              
              onChange={(e) => setscoringType(e.target.value)}
            > 
              
              <option value={"A,extreme_model"}>自动打分-去极值平均值模型</option>
              <option value={"A,reduce_diff"}>自动打分-差异缩小模型模型</option>
              <option value={"A,increase_diff"}>自动打分-差异扩大模型模型</option>
              <option value={"A,fill_full"}>自动打分（填写及满分）</option>
              <option value={"E, "}>专家打分</option>
              
            
            </Form.Select>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="edit--fib--setting">
          <Form.Label column sm={2}>
            填空设置
          </Form.Label>

          <Col sm={10}>
            <Button
              variant="outline-primary"
              onClick={() => {
                if (!optionsEditorVisible) {
                  buildOptionInfo();
                }
                setOptionsEditorVisible(!optionsEditorVisible);
              }}
              aria-controls={`${qid}--fib-options-editor-collapse`}
              aria-expanded={optionsEditorVisible}
            >
              {optionsEditorVisible ? "隐藏" : "显示"}
            </Button>

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
            <QuestionFillInBlankDisplay
              {...{
                qid,
                title,
                detail,
                options: optionInfo.map((info) => info.option),
                readOnly: true,
              }}
            />
          </Card.Body>
        </Collapse>
        <Card.Header className="card-border-top card-question-contents-header ">
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
