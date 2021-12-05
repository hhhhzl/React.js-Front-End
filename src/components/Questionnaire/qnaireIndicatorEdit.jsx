import "../../style/indicator.css";
import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllQuestionsIE,
  fetchAllIndicatorsIE,
  createIndicatorIE,
  updateIndicatorIE,
  deleteIndicatorIE,
  selectAllQuestionsIE,
  selectAllIndicatorsIE,
  selectIsLoadingIE,
} from "../../state/slices/indicator-edit";
import {selectAllSubmissionsQA,selectAllQuestionsQA} from  "../../state/slices/question-answering";
import { mapQuestionType } from "../../constants/maps";
import { Button, Form, Accordion, Modal, Spinner, Col } from "react-bootstrap";
import QuestionDisplayCard from "../Question/questionDisplayCard";

const IndicatorhandleSubmit = (event) => {
  const form = document.getElementById('1','2');
  if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();}
  };      


const IndicatorEditCreateFormModal = ({ qnaire, curData, questionsUnused }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [question, setQuestion] = useState(0);
  const [validated, setValidated] = useState(false);

  return (
    <>
      <Button className="IndicatorButton" variant="outline-success" onClick={() => setShowModal(true)}>
        添加{curData.id > 0 ? "下级" : null}
      </Button>
      <Modal
        
        // wrapClassName="indicator-edit-modal"
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>
              <div className="indicatoradd">
                添加
                </div>
                {curData.id > 0 ? "下级" : null}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Label>名称</Form.Label>
            <Form.Control
              required
              placeholder = "请输入名称"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {/* <Form id = '1' noValidate validated={validated}>
            <Form.Group className="mb-3" controlId="nomeaning"> */}
            <Form.Label>权重</Form.Label>
            <Form.Control
              required
              placeholder="请输入权重（最小值为0）"
              type="number"
              min={0}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            {/* </Form.Group>
            </Form> */}
            <Form.Label>绑定问题</Form.Label>
            <Form.Select
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            >
              <option value={0}>无</option>
              {questionsUnused.map((item) => (
                <option key={item.id} value={item.id}>
                  ({item.id})【{mapQuestionType[item.questionType]}题】
                  {item.title}
                </option>
              ))}
            </Form.Select>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline-danger"
              onClick={() => setShowModal(false)}
            >
              取消
            </Button>
            <Button
              variant="outline-success"
              type="submit"
              onClick={(IndicatorhandleSubmit,handleClose) => {
                dispatch(
                  createIndicatorIE({
                    qnaireID: qnaire,
                    data: {
                      name,
                      weight,
                      question: question > 0 ? question : null,
                      parent_indicator: curData.id > 0 ? curData.id : null,
                    },
                  })
                );
                setShowModal(true);
              }}
            >
              保存
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

const IndicatorEditUpdateFormModal = ({
  qnaire,
  curData,
  parentData,
  questionsUnused,
}) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState(curData.name || "");
  const [weight, setWeight] = useState(curData.weight || 0);
  const [question, setQuestion] = useState(curData.question || 0);

  return (
    <>
      <Button variant="outline-primary" onClick={() => setShowModal(true)}>
        修改
      </Button>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>修改</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Col>   
            <Form.Label>名称</Form.Label>
            <Form.Control
              required
              placeholder = "请输入名称"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            </Col> 
            <Form id = '2'>
            <Form.Label>权重</Form.Label>
            <Form.Control
              required
              placeholder = "请输入权重（最小值为0）"
              type="number"
              min={0}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            </Form>
            <Form.Label>绑定问题</Form.Label>
            <Form.Select
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            >
              <option value={0}>无</option>
              {curData.children.length === 0 && // only a leaf indicator can bind a question
                questionsUnused.map((item) => (
                  <option key={item.id} value={item.id}>
                    ({item.id})【{mapQuestionType[item.questionType]}题】
                    {item.title}
                  </option>
                ))}
            </Form.Select>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline-danger"
              onClick={() => setShowModal(true)}
            >
              取消
            </Button>
            <Button
              variant="outline-success"
              onClick={() => {
                dispatch(
                  updateIndicatorIE({
                    qnaireID: qnaire,
                    indicatorID: curData.id,
                    data: {
                      name,
                      weight,
                      question: question > 0 ? question : null,
                      parent_indicator:
                        parentData.id > 0 ? parentData.id : null,
                    },
                  })
                );
                setShowModal(true);
              }}
            >
              保存
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

const IndicatorEditDeleteFormModal = ({ qnaire, curData }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button variant="outline-danger" onClick={() => setShowModal(true)}>
        删除
      </Button>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>删除</Modal.Title>
          </Modal.Header>
          <Modal.Body>您确定要删除吗？删除后将无法恢复。</Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline-danger"
              onClick={() => setShowModal(false)}
            >
              取消
            </Button>
            <Button
              variant="outline-success"
              onClick={() => {
                dispatch(
                  deleteIndicatorIE({
                    qnaireID: qnaire,
                    indicatorID: curData.id,
                  })
                );
                setShowModal(false);
              }}
            >
              确认
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};


const IndicatorEditTitleNode = ({
  level=1,
  curData,
  parentData,
  indicatorsMapIDData,
  questionsUnused,
  questionsUsedMapIDData,
  qnaire,
}) => {

  const iid = curData.id;
  const childrenName = curData.name;
  const childrenData = curData.children.map(
    (ccid) => indicatorsMapIDData[ccid],
  );
  return (
    <>
        <span>
          {/* {Array(level).fill("--").join("")} */}
          {"--".repeat(level)}
         
          {/* 【
          {curData.question
            ? "问题"
            : curData.children.length > 0
            ? "指标"
            : "待设置"}
          】
        */}
          {childrenName}</span><br />
        {childrenData.map((child) => (
          
          <IndicatorEditTitleNode

          key={child.id}
            {...{
              level: level + 1,
              curData: child,
              parentData: curData,
              indicatorsMapIDData,
              questionsUnused,
              questionsUsedMapIDData,
              qnaire,
            }}
          
          />
        ))}

    </>
  );
};




const IndicatorEditTreeNode = ({
  curData,
  parentData,
  indicatorsMapIDData,
  questionsUnused,
  questionsUsedMapIDData,
  qnaire,
}) => {
  const iid = curData.id;
  const childrenData = curData.children.map(
    (ccid) => indicatorsMapIDData[ccid]
  );


  const renderChildIndicators = () => {
    return (
      <>
        <h5>
          <strong>下级内容</strong>
        </h5>
        <Accordion >
          {childrenData.map((child) => (
            <IndicatorEditTreeNode
              key={child.id}
              {...{
                curData: child,
                parentData: curData,
                indicatorsMapIDData,
                questionsUnused,
                questionsUsedMapIDData,
                qnaire,
              }}
            />
          ))}
        </Accordion>
      </>
    );
  };

  
  const renderChildQuestion = () => {
    const qData = questionsUsedMapIDData[curData.question];
    return (
      <>
        <h5>
          <strong>问题预览</strong>
        </h5>
        <Accordion>
          <Accordion.Item eventKey={`$ie-question-${qData.id}`}>
            <Accordion.Header>
              【{mapQuestionType[qData.question_type]}题】
              {qData.title}
            </Accordion.Header>
            <Accordion.Body>
              <QuestionDisplayCard
                readOnly={true}
                {...{
                  qid: qData.id,
                  isRequired: qData.is_required,
                  maxScore: parseFloat(qData.max_score),
                  minScore: parseFloat(qData.min_score),
                  questionType: parseInt(qData.question_type),
                  rubric: qData.rubric,
                  title: qData.title,
                  ...JSON.parse(qData.stem),
                }}
              />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </>
    );
  };


  return (
    <Accordion.Item
      key={iid}
      id={`iedit-indicator-${iid}`}
      eventKey={`iedit-indicator-${iid}`}
    >
      <Accordion.Header>
        {/* <span>
          【
          {curData.question
            ? "问题"
            : curData.children.length > 0
            ? "指标"
            : "待设置"}
          】
        </span> */}
        <span>{curData.name}</span>

        <span>
          {curData.weight > 0
            ? `（权重${(
                (curData.weight / parentData.childrenTotalWeight) *
                100
              ).toFixed(2)}%）`
            : "（无权重）"}
        </span>
      </Accordion.Header>
      <Accordion.Body>
        <div className="indicator-tree-node-utils-container">
          {
            // indicators with questions can't have children indicators
            curData.question === null ? (
              <IndicatorEditCreateFormModal
                {...{
                  qnaire,
                  curData,
                  questionsUnused,
                }}
              />
            ) : null
          }
          <IndicatorEditUpdateFormModal
            {...{
              qnaire,
              curData,
              parentData,
              questionsUnused,
            }}
          />
          {
            // indicators with children indicators can't be deleted
            curData.children.length === 0 ? (
              <IndicatorEditDeleteFormModal
                {...{
                  qnaire,
                  curData,
                }}
              />
            ) : null
          }
        </div>

        <div>
          {childrenData.length > 0
            ? renderChildIndicators()
            : curData.question
            ? renderChildQuestion()
            : null}
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
};


export default function QnaireIndicatorEdit() {
  const { qnaire } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllQuestionsIE({ qnaire }));
    dispatch(fetchAllIndicatorsIE(qnaire));
  }, [dispatch, qnaire]);

  const questions = useSelector(selectAllQuestionsIE);
  const indicators = useSelector(selectAllIndicatorsIE);
  const isLoading = useSelector(selectIsLoadingIE);

  const indicatorsMapIDData = useMemo(() => {
    let id2data = {
      // dummy root (id=0 not in db)
      0: { id: 0, children: [], childrenTotalWeight: 0.0 },
      // from db
      ...indicators.reduce(
        (map, item) => ({
          ...map,
          [item.id]: { ...item, children: [], childrenTotalWeight: 0.0 },
        }),
        {}
      ),
    };

    indicators.forEach((item) => {
      id2data[item.parent_indicator || 0].children.push(item.id);
      id2data[item.parent_indicator || 0].childrenTotalWeight += item.weight;
    });

    
    return id2data;
  }, [indicators]);

  const [questionsUnused, questionsUsedMapIDData] = useMemo(() => {
    const questionsUsedID = new Set(
      indicators
        .filter((item) => item.question !== null)
        .map((item) => item.question)
    );

    // qUnused: display {id, title, qtype} as select options
    const qUnused = questions
      .filter((item) => !questionsUsedID.has(item.id))
      .map((item) => ({
        id: item.id,
        title: item.title,
        questionType: item.question_type,
      }))
      .sort((item1, item2) => item1.id - item2.id);

    // qUsed: display question contents in leaf nodes
    const qUsedMapIDData = questions
      .filter((item) => questionsUsedID.has(item.id))
      .reduce((map, item) => ({ ...map, [item.id]: item }), {});

    return [qUnused, qUsedMapIDData];
  }, [questions, indicators]);

 
  // const mapQidSubmission = useMemo(
  //   () => submissions.reduce((map, sm) => ({ ...map, [sm.question]: sm }), {}),
  //   [submissions]
  // );



 
  // const submissions = useSelector(selectAllSubmissionsQA);
  // const parsedQuestions = useMemo(
  //   () =>
  //     questions.map((q) => {
  //       const pq = {

  //         title: q.title,
  //       };
  //       try {
  //         const submission = mapQidSubmission[q.id];
  //         return {
  //           ...pq,
  //           answer: submission ? JSON.parse(submission.answer) : null,
  //           submissionID: submission ? submission.id : null,
  //           ...JSON.parse(q.stem),
  //         };
  //       } catch (err) {
  //         console.error(err);
  //         return pq;
  //       }
  //     }),
  //   [questions, mapQidSubmission]
  // ); 



  return (
    <div className="indicator-edit-main-container">
      {isLoading ? (
        <>
          <div className="loading-spinner-container">
            <Spinner animation="border" />
          </div>
        </>
      ) : (
        <>
          <div className="indicator-edit-indicators-container">
            <div>
              <h3 className="A-indicator-edit">指标编辑</h3>
              <br />
              <IndicatorEditCreateFormModal
                {...{
                  qnaire,
                  curData: indicatorsMapIDData[0],
                  questionsUnused,
                }}
              />
            </div>

            <br />
            <div>
              <Accordion>
                {indicatorsMapIDData[0].children.map((ciid) => (
                  <IndicatorEditTreeNode
                    key={ciid}
                    {...{
                      curData: indicatorsMapIDData[ciid],
                      parentData: indicatorsMapIDData[0],
                      indicatorsMapIDData,
                      questionsUnused,
                      questionsUsedMapIDData,
                      qnaire,
                    }}
                  />
                ))}
              </Accordion>
            </div>
          </div>

          <div className="indicator-edit-incomplete-container">
            <h5>
            <strong>指标编辑概要</strong>
            </h5>
            <ol>
            {/* {parsedQuestions.map((data, idx) => (
                <li key={data.ciid}>ciid
                  <a href={`#qnaire-question-${idx + 1}`}>
                    {data.title}
                  </a>
                </li>
              ))} */}
                  {indicatorsMapIDData[0].children.map((ciid) => (
                  <li key ={ciid}>
                   
                  <a herf = {`#indicator-edit-incomplete-container`}>
                  </a>
                  <IndicatorEditTitleNode
                  
                    key={ciid}
                    {...{
                      curData: indicatorsMapIDData[ciid],
                      parentData: indicatorsMapIDData[0],
                      indicatorsMapIDData,
                      questionsUnused,
                      questionsUsedMapIDData,
                      qnaire,
                    }} />

                    </li>
                  
                  ))}

            </ol>        
          </div>
        </>
      )}
    </div>
  );

}