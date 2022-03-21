import React, { useState, useEffect, useMemo, useCallback } from 'react';
import "../../../style/qnaire.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import '../../../style/table.css';
import '../../../style/admin.css';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import { Button, Col, Row, Collapse, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { shouldRefetchList } from '../../../state/store';
import QuestionDisplayCard from "../../Question/questionDisplayCard";
import { Spinner, Card, OverlayTrigger, Tooltip, Form } from "react-bootstrap";
import {
  fetchAllQuestionsQA,
  fetchAllSubmissionsQA,
  createSubmissionQA,
  updateSubmissionQA,
  selectAllQuestionsQA,
  selectAllSubmissionsQA,
  selectIsLoadingQA,
  selectAllExpertsQA,
} from "../../../state/slices/question-answering";
import {
  deleteIndicatorIE,
  selectAllQuestionsIE,
  selectAllIndicatorsIE,
  updateIndicatorIE,
  updateQuestionQE,
  createIndicatorIE,
  fetchAllIndicatorsIE,
  fetchAllQuestionsQE,
  createDraftItemQE,
  commitDraftsQE,
  selectDraftsQE,
  selectIsLoadingQE,
  doublecommitDraftsQE,
} from "../../../state/slices/question-edit";
import { mapQuestionType } from "../../../constants/maps";
import { selectAuthUserOrg } from "../../../state/slices/auth";
import { useParams } from "react-router-dom";

const { SearchBar } = Search;
const { ExportCSVButton } = CSVExport;



export default function ExpertScoringDisQuestion({savefirstpage}) {
  const { qnaire } = useParams();
  const dispatch = useDispatch();
  const curUserOrg = useSelector(selectAuthUserOrg);
  
  useEffect(() => {
    dispatch(fetchAllQuestionsQA({ qnaire }));
    dispatch(
      fetchAllSubmissionsQA({ question__qnaire: qnaire, org: curUserOrg })
    );
  }, [dispatch, qnaire, curUserOrg]);

  const questions = useSelector(selectAllExpertsQA);
  const submissions = useSelector(selectAllSubmissionsQA);

  const mapQidSubmission = useMemo(
    () => submissions.reduce((map, sm) => ({ ...map, [sm.question]: sm }), {}),
    [submissions]
  );

  const parsedQuestions = useMemo(
    () =>
      questions.map((q) => {
        const pq = {
          id: q.id,
          isRequired: q.is_required,
          title: q.title,
          maxScore: parseFloat(q.max_score),
          minScore: parseFloat(q.min_score),
          questionType: parseInt(q.question_type),
          rubric: q.rubric,
          rubric_detail: q.rubric_detail? JSON.parse(q.rubric_detail) : "", 
        };
        try {
          const submission = mapQidSubmission[q.id];
          return {
            ...pq,
            answer: submission ? JSON.parse(submission.answer) : null,
            submissionID: submission ? submission.id : null,
            ...JSON.parse(q.stem),
          };
        } catch (err) {
          console.error(err);
          return pq;
        }
      }),
    [questions, mapQidSubmission]
  );

  const inActiveQ = useMemo(
    () =>
    questions.map(elem =>{
      if (elem.is_required === false){
        return [] + [parseFloat(elem.id)]
      }
      else{
        return [] + [-1000]
      }
    }
    ),
    [questions]
  )

  useEffect(() => {
    if(parsedQuestions) {
        setquestiondata([...parsedQuestions]);
    }
}, [parsedQuestions]);



  const questionUpdate = useCallback(
    (id,data) => dispatch(
      updateQuestionQE({
        id:id,
        data}),
    [dispatch]
  ))




  const findinactive =(props) =>{
    const unselect = []
    props.map(elem =>{
      if (elem!='-1000'){
        unselect.push(parseInt(elem))
      }
    })
    return unselect
  }

  function refreshPage() {
    window.location.reload(false);
  }


  const isLoading = useSelector(selectIsLoadingQA);

  const [questiondata, setquestiondata] = useState(parsedQuestions ? [...parsedQuestions] : []);
  const [selectedindicator ,setselectedindicator ] = useState([])
  const [unselectableid, setunselectableid] = useState([])
  const [unselectedindicator , setunselectedindicator ] = useState([])
  const [options, setOptions] = useState("")
  const [disamount, setdisamount] = useState("")
  const [level,setlevel] = useState("")

  const whetherselected = (props) =>{
    if (props =='' || props.selected === 0){
      return false
    }
    else{
      return true
    }
  }


    const columns = [
      {
          dataField: 'id',
          text: "id号",
          sort: true,
          style: { width: '5%' }
      },
      {
          dataField: 'qnaire',
          text: '所属问卷',
          sort: true,
          hidden:true
      },
      {
        dataField: 'question_type',
        text: "问题类型",
        sort: true,
        hidden:true
    },
      {
          dataField: 'title',
          text: "题号",
          sort: true,
          style: { width: '30%' }
      },

      { 
        text: "设置题目被分配次数（默认3次)",
        dataField:'rubric_detail',
        style: { width: '25%' },
        formatter:(value,row) => {
  
          
          return (
            <div style={{margin: 0,
                position: "relative",
                textAlign:"center",
                transform: "-moz-initial"}} >
                  <Row>
                    <Col>
                    <OverlayTrigger trigger="hover" overlay={(!row.isRequired || whetherselected(value))== false ? <Tooltip id="tooltip-disabled">请先选择题目是否参与分配</Tooltip> : (<></>)}>
                  <Form.Group style ={{left:0}}>
                          <Form.Control
                              required
                              type="number"
                              defaultValue={!row.isRequired? "" : value.number}
                              disabled={(!row.isRequired || whetherselected(value)===false)? true : false}
                              placeholder={row.isRequired? "请填写次数" : "该题目未设置为必答"}
                              onChange = {(e) =>{
                                const changeQuestion = {
                                  id: row.id,
                                  isRequired: row.isRequired,
                                  title: row.title,
                                  maxScore: parseFloat(row.maxScore),
                                  minScore: parseFloat(row.minScore),
                                  questionType: parseInt(row.questionType),
                                  rubric: row.rubric,
                                  rubric_detail: JSON.stringify({selected:1, number:e.target.value, level:value.level}),
                                }
                                questionUpdate(row.id,changeQuestion);
                              }
                              }
                           
                          />
      
                      </Form.Group>
                      </OverlayTrigger>
                      </Col>
        
                      </Row>
            </div>
            
      
        )
        }
      },

      { 
        text: "设置题目难度",
        dataField:'rubric_detail',
        style: { width: '15%' },
        formatter:(value,row) => {
          return (
              <div style={{margin: 0,
                  position: "relative",
                  textAlign:"center",
                  transform: "-moz-initial"}} >
                    <OverlayTrigger trigger="hover" overlay={(!row.isRequired || whetherselected(value))== false ? <Tooltip id="tooltip-disabled">请先选择题目是否参与分配</Tooltip> : (<></>)} >

                    <Form.Group style ={{left:0}}>
                    <Form.Select aria-label="选择题目难易程度"
                                required
                                disabled={(!row.isRequired || whetherselected(value)===false)? true : false}
                                defaultValue={!row.isRequired? "" : value.level}
                                onChange = {(e) =>{
                                  const changeQuestion = {
                                    id: row.id,
                                    isRequired: row.isRequired,
                                    title: row.title,
                                    maxScore: parseFloat(row.maxScore),
                                    minScore: parseFloat(row.minScore),
                                    questionType: parseInt(row.questionType),
                                    rubric: row.rubric,
                                    rubric_detail: JSON.stringify({selected:1, number:value.number, level:e.target.value}),
                                  }
                                  questionUpdate(row.id,changeQuestion)
                                }
                                }                   
                            >
                                <option value="">选择题目难易程度</option>
                                <option value="0">简单</option>
                                <option value="1">普通</option>
                                <option value="2">困难</option>
                            </Form.Select>
                            </Form.Group>
                            </OverlayTrigger>
              </div>
          )

      },},


      {
        text: '是否参与分配',
        dataField:'rubric_detail',
        style: { width: '10%' },
        formatter:(value,row) => {
            return (
                <div style={{margin: 0,
                    position: "relative",
                    textAlign: 'center',
                    transform: "-moz-initial"}} >
                    <Form>
                      <Form.Check 
                      defaultChecked ={value.selected === 1 ? true : false}
                      disabled ={!row.isRequired}
                      type="switch"
                      value = {value.selected}
                      onChange={(e) => {
                        if (!value){
                          const changeuser = {
                            id: row.id,
                            isRequired: row.isRequired,
                            title: row.title,
                            maxScore: parseFloat(row.maxScore),
                            minScore: parseFloat(row.minScore),
                            questionType: parseInt(row.questionType),
                            rubric: row.rubric,
                            rubric_detail:JSON.stringify({selected:1, number:3, level:0}),
                          }
                          questionUpdate(row.id,changeuser);
      
                        } 
                        else if(value.selected === 0){
                          const changeQuestion = {
                            id: row.id,
                            isRequired: row.isRequired,
                            title: row.title,
                            maxScore: parseFloat(row.maxScore),
                            minScore: parseFloat(row.minScore),
                            questionType: parseInt(row.questionType),
                            rubric: row.rubric,
                            rubric_detail:JSON.stringify({selected:1, number:3, level:0}),
                          }
                          console.log(changeQuestion)
                          questionUpdate(row.id,changeQuestion)
             
    

                        }else if(value.selected === 1){
                          const changeuser = {
                            id: row.id,
                            isRequired: row.isRequired,
                            title: row.title,
                            maxScore: parseFloat(row.maxScore),
                            minScore: parseFloat(row.minScore),
                            questionType: parseInt(row.questionType),
                            rubric: row.rubric,
                            rubric_detail:JSON.stringify({selected:0, number:"", level:""}),
                          }
                          questionUpdate(row.id,changeuser);
              
                        }
                    }}

                     
                      />
                    </Form>
                </div>
            )
        },
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
                    qid={row.id}
                    {...row}
                  />
                </Card.Body>
              </Card>
    </div>
  )},
  showExpandColumn: true,
};


const selectRow = {
    mode: 'checkbox',
    nonSelectable: findinactive(inActiveQ),
    nonSelectableStyle: { backgroundColor: 'gray' },
    hideSelectAll: false,
    hideSelectColumn: true,
    // onSelect: (row, isSelect, rowIndex, e) => {
    //         if (isSelect){
    //             setselectedindicator([...selectedindicator ,row]);

    //         }else{
    //             const restData =[]
    //             selectedindicator.forEach((elem) => {
    //                     if (row !== elem){
    //                         restData.push(elem)
    //                     }
    //                 });
    //             setselectedindicator([...restData]);
    //         }  
            
    //       },
    //       onSelectAll: (isSelect, rows, e) => {
    //           if (isSelect){
    //             setselectedindicator(rows);
    //           }else{
    //             setselectedindicator([]);

    //           }
    //     }
        
      };
    
  //   const handlerestart = (row) =>{
  //       const id = row.id;
  //       const row_rubric_detail = JSON.parse(row.rubric_detail)
  //       const rowdata = {
  //         id: row.id,
  //         questionType: row.questionType,
  //         title: row.title,
  //         detail:row.detail,
  //         minScore: row.minScore,
  //         maxScore: row.maxScore,
  //         rubric: row.rubric,
  //         rubric_detail: JSON.stringify({
  //           active:1,
  //           selected:row_rubric_detail.selected,
  //           amount:row_rubric_detail.amount,
  //           difficult_level:row_rubric_detail.difficult_level

  //         })
  //       }

  //       if (unselectableid.includes(id)){
  //           const restData = []
  //           const expert = []
  //           const question = []
  //           unselectedindicator.map((elem) => {
  //               if (id !== elem.id){
  //                   restData.push(elem.id)
  //                   expert.push(elem)
  //               } 
  //           });
            
  //           questiondata.map((elem) => {
  //             if (id != elem.id){
  //               question.push(elem)
  //             }else{
  //               question.push(rowdata)
                
  //             }
  //           })
           
  //           setunselectableid([...restData])
  //           setunselectedindicator ([...expert])
  //           setquestiondata([...question])
  //       }

  //   }  

  //   const changeamount = (value,row) =>{
  //     console.log(row.rubric_detail)
  //       const row_rubric_detail = JSON.parse(row.rubric_detail)
  //       const question = []
  //       const rowdata = {
  //         id: row.id,
  //         isRequired:row.isRequired,
  //         questionType: row.questionType,
  //         title: row.title,
  //         detail:row.detail,
  //         minScore: row.minScore,
  //         maxScore: row.maxScore,
  //         rubric: row.rubric,
  //         rubric_detail: JSON.stringify({
  //           active:row_rubric_detail.active,
  //           selected:row_rubric_detail.selected,
  //           amount:value,
  //           difficult_level:row_rubric_detail.difficult_level
  //         })
  //       }
  //       console.log(rowdata)
  //       console.log(questiondata)
  //       questiondata.map((elem) =>{
  //         if (elem.id != row.id){
  //           question.push(elem)
  //           console.log(elem)
  //         } else{
  //           question.push(rowdata)
  //         }
  //       })
  //       setquestiondata([...question])


  //   }



  //   const changelevel = (value,row) =>{
  //     console.log(questiondata)
  //     const row_rubric_detail = JSON.parse(row.rubric_detail)
  //     const question = []
  //     const rowdata = {
  //       id: row.id,
  //       isRequired:row.isRequired,
  //       questionType: row.questionType,
  //       title: row.title,
  //       detail:row.detail,
  //       minScore: row.minScore,
  //       maxScore: row.maxScore,
  //       rubric: row.rubric,
  //       rubric_detail: JSON.stringify({
  //         active:row_rubric_detail.active,
  //         selected:row_rubric_detail.selected,
  //         amount:row_rubric_detail.amount,
  //         difficult_level:value
  //       })
  //     }
  //     questiondata.map((elem) =>{
  //       if (elem.id != row.id){
  //         question.push(elem)
  //       } else{
  //         question.push(rowdata)
  //       }
  //     })
  //     setquestiondata([...question])

  // }

    useEffect(() => {
      // trigger re-render when props.data change
      
      setquestiondata(questiondata);
      
    }, [questiondata]);


    return (
      <div>
        <ToolkitProvider
        bootstrap4
        keyField="id"
        data={questiondata}
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
            <hr/>
            <Button onClick={() => 
              {
              savefirstpage();
              dispatch(commitDraftsQE(),
              setInterval(alert("保存成功，请勿重复保存！！！"),3000));
              refreshPage();
            }
              }>保存设置</Button>
            <p></p>
            <p>请选择设置每题被批分配次数，默认值为3，推荐使用：3，5，7</p>
            <p>请选择设置题目难易程度，方便系统自动分配，默认为“简单”</p>
            <p>点击'<strong>（ + ）</strong>'查看题目内容</p>
        </div>

    );
}