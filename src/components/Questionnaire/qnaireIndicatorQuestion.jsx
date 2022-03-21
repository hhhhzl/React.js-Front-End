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
import { Button, Form, Accordion, Modal, Spinner, Col, Row } from "react-bootstrap";
import { Card, OverlayTrigger, Tooltip, Collapse} from "react-bootstrap";
import QuestionDisplayCard from "../Question/questionDisplayCard";
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
const { SearchBar } = Search;

const IndicatorhandleSubmit = (event) => {
  const form = document.getElementById('1','2');
  if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();}
  };      


const IndicatorEditCreateFormModal = ({ qnaire, curData, parentData, questionsUnused }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [validated, setValidated] = useState(false);
  const [selectedQ, setselectedQ] = useState([])

  

  const columns = [
    {
        dataField: 'id',
        text: "id号",
        sort: true,
        style: { width: '8%' }
    },
    {
      dataField: 'questionType',
      text: "问题类型",
      sort: true,
      style: { width: '12%' },
      formatter: (value) => {
      return <>{mapQuestionType[value]}题</>
    },
      
  },
    {
        dataField: 'title',
        text: "题号",
        sort: true,
        style: { width: '80%' }
    },
      
];

const expandRow = {
renderer: row => {
    console.log(row)
return(
  <div className="qnaire-q-question-display">
    <Card key={row.id} id={`qnaire-question-${row.id + 1}`}>
              <Card.Body>
                <QuestionDisplayCard
                readOnly={true}
                {...{
                  qid: row.id,
                  isRequired: row.isRequired,
                  maxScore: row.maxScore,
                  minScore: row.minScore,
                  questionType: parseInt(row.questionType),
                  rubric: row.rubric,
                  title: row.title,
                  ...JSON.parse(row.stem),
                }}
                />
              </Card.Body>
            </Card>
  </div>
)},
showExpandColumn: true,
};




const selectRow = {
  mode: 'checkbox',
  nonSelectableStyle: { backgroundColor: 'gray' },
  clickToSelect: true,
  style: { backgroundColor: 'green' },
  hideSelectAll: true ,
  hideSelectColumn: true,
  onSelect: (row, isSelect, rowIndex, e) => {
      const list = JSON.parse(JSON.stringify(selectedQ));
      if (isSelect){
          list.push(row.id)
          console.log(list)
      }else{     
        list.pop(row.id)
      }
      setselectedQ([...list])
    },   
 };

 useEffect(() => {
    // trigger re-render when props.data change
    setselectedQ(selectedQ); 
  }, [selectedQ]);


    
  


  return (
    <>
    {curData.children.length != 0 ? <></> :
    (<Button className="IndicatorButton" variant="outline-success" onClick={() => setShowModal(true)}>
    绑定问卷题目
  </Button>) 
    }
      
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
                绑定问卷题目
                </div>
                
                </Modal.Title>
             
          </Modal.Header>
          <Modal.Body>
          <ToolkitProvider
        bootstrap4
        keyField="id"
        data= {questionsUnused}
        columns={ columns }
        search
        exportCSV={ {
          fileName: '专家打分填报进度表.csv',
          separator: '|',
          ignoreHeader: true,
          noAutoBOM: false
        }}
        >
        {
          props =>(
            <div>
              <div>
                <SearchBar
                    {...props.searchProps}
                          srText={false}
                          placeholder='搜索问题'
                />
    
                </div>
              <hr />
              <Collapse in= {true}>
              <div className ="admin-ExpertMatching-scroll">
              <BootstrapTable
               { ...props.baseProps}
               striped
                hover
                condensed
                selectRow ={selectRow}
                expandRow ={expandRow}
                />
                </div>
                </Collapse>
          </div>
               )        
            }
        </ToolkitProvider>
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
              onClick={() => {
                dispatch(
                    updateIndicatorIE({
                      qnaireID: qnaire,
                      indicatorID: curData.id,
                      data: {
                        name,
                        weight,
                        question: selectedQ.length > 0 ? JSON.stringify(selectedQ) : null,
                        parent_indicator:
                          parentData.id > 0 ? parentData.id : null,
                      },
                    })
                  );
                setShowModal(false);
                setselectedQ([])
                
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
            : "待设置下级指标"}
          】 */}
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

  const [singleQ, setsingleQ] = useState({})
  const findsinglequestion = (data) =>{
      console.log(questionsUnused)
      questionsUnused.forEach(element => {
          if (element.id === data){
              console.log(element)
              const single = {
                  id: element.id,
                  title: element.title,
                  isRequired: element.isRequired,
                  maxScore:  element.maxScore,
                  minScore: element.minScore,
                  questionType: element.questionType,
                  rubric: element.rubric,
                  rubric_detail: element.rubric_detail,
                  stem: element.stem
              }
              return single
          } 
             
      })

      ;

  }



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
        // {id: 6, title: '专利文件', question_type: 6, is_required: true, 
        // answer: null,
        // max_score: 5,
        // min_score: 0,
        // rubric: "E",
        // rubric_detail: "{\"selected\":0,\"number\":\"\",\"level\":\"\"}",
        // stem: "{\"detail\":\"备注：2021年1月1日至2021年12月31日\"}",}
    
            return (
          <>
            <h5>
              <strong>问题预览</strong>
            </h5>
            <Accordion>
            {JSON.parse(curData.question).map(elem => {
                const qData = questionsUnused.filter((item) => item.id === parseInt(elem))[0];
                console.log(qData);
                return(
                <Accordion.Item eventKey={`$ie-question-${qData.id}`}>
                  
                <Accordion.Header>
                  【{mapQuestionType[qData.questionType]}题】
                  {qData.title}
                </Accordion.Header>
                <Accordion.Body>
                  <QuestionDisplayCard
                    readOnly={true}
                    {...{
                      qid: qData.id,
                      isRequired: qData.isRequired,
                      maxScore: parseFloat(qData.maxScore),
                      minScore: parseFloat(qData.minScore),
                      questionType: parseInt(qData.questionType),
                      rubric:qData.rubric,
                      title: qData.title,
                      ...JSON.parse(qData.stem),
                    }}
                  />
                </Accordion.Body>
              </Accordion.Item>
                )
                      
                    })}
              
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
        <span>
          【
          {curData.question
            ? <>问题指标{iid}</>
            : curData.children.length > 0
            ? <>指标{iid}</>
            : <strong style={{color:"red"}}>!!当前指标为最下级</strong>}
          】
        </span>
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
                  parentData,
                }}
              />
            ) : null
          }
          <br/>
        </div>
        <br/>

        <div>
          {childrenData.length > 0
            ? renderChildIndicators()
            : curData.question
            ? renderChildQuestion()
             : null
          }
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
};


export default function QnaireIndicatorBindingQuestions({pagegoback}) {
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
        questionType: parseInt(item.question_type),
        isRequired: item.is_required,
        maxScore: parseFloat(item.max_score),
        minScore: parseFloat(item.min_score),
        rubric: item.rubric,
        rubric_detail:item.rubric_detail,
        stem: item.stem,
        answer:null,
        submissionID:null,
      }))
      .sort((item1, item2) => item1.id - item2.id);

    // qUsed: display question contents in leaf nodes
    const qUsedMapIDData = questions
      .filter((item) => questionsUsedID.has(item.id))
      .reduce((map, item) => ({ ...map, [item.id]: item }), {});



    console.log(qUnused)
    
    

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
              <h3 className="A-indicator-edit">指标绑定问题</h3>
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
            <br/>
            <hr/>
            <br/>
            <div>
              <Button onClick={pagegoback}>编辑指标</Button>
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