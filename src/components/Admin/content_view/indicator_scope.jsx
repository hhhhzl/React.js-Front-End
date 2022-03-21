import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllQuestionsIE, 
    fetchAllIndicatorsIE,
    createIndicatorIE,
    updateIndicatorIE,
    deleteIndicatorIE,
    selectAllQuestionsIE,
    selectAllIndicatorsIE,
    selectIsLoadingIE, } from "../../../state/slices/indicator-edit";
import { selectAllSubmissionsQA } from "../../../state/slices/question-answering";
import { selectAllOrgs, selectTopOrgs, selectOrgById, fetchAllOrgs, createOrg, updateOrg, deleteOrg, selectIsLoadingOrgs} from '../../../state/slices/orgs';
import { Button, Form, Accordion, Modal, Spinner, Col, Nav, Tab, Collapse, Row, Card, Image, Container } from "react-bootstrap";
import QuestionDisplayCard from "../../Question/questionDisplayCard";
import "../../../style/content_view.css";
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import { mapOrgType, mapUserType, mapQuestionType } from "../../../constants/maps";

const { SearchBar } = Search;
const { ExportCSVButton } = CSVExport;

   

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
          {curData.children.length > 0 ? (<>
            <Row><Col>{ "--".repeat(level) + childrenName }</Col></Row>
          </>) :
          (<>
          <Row><Col xs ={1}><Form.Check type="checkbox" /></Col><Col xs ={11}>{"--".repeat(level)}{childrenName}</Col> </Row>
          </>)

          }
         </span><br/>


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




export default function QnaireIndicatorEdit({pagegonext}) {
  const { qnaire } = useParams();
  const [displayrow1, setdisplayrow1] = useState(true);
  const [displayrow2, setdisplayrow2] = useState(true);
  const [quesitonshow, setquestionshow] = useState([]);

  
  


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllQuestionsIE({ qnaire }));
    dispatch(fetchAllIndicatorsIE(qnaire));
    dispatch(fetchAllOrgs(qnaire));
  }, [dispatch, qnaire]);

  const questions = useSelector(selectAllQuestionsIE);
  const indicators = useSelector(selectAllIndicatorsIE);
  const isLoading = useSelector(selectIsLoadingIE);
  const Orgs = useSelector(selectAllOrgs);

  const OrgsMapIDData = useMemo(() => {
    let id2data = {
      // dummy root (id=0 not in db)
      0: { id: 0, children: [], childrenTotalWeight: 0.0 },
      // from db
      ...Orgs.reduce(
        (map, item) => ({
          ...map,
          [item.id]: { ...item, children: [], childrenTotalWeight: 0.0 },
        }),
        {}
      ),
    };

    Orgs.forEach((item) => {
      id2data[item.parent_org || 0].children.push(item.id);
      id2data[item.parent_org || 0].childrenTotalWeight += item.weight;
    });
    console.log(Orgs)
    return id2data;
  }, [Orgs]);

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
        submissionID: null,
      }))
      .sort((item1, item2) => item1.id - item2.id);

    // qUsed: display question contents in leaf nodes
    const qUsedMapIDData = questions
      .filter((item) => questionsUsedID.has(item.id))
      .reduce((map, item) => ({ ...map, [item.id]: item }), {});

    return [qUnused, qUsedMapIDData];
  }, [questions, indicators]);

  

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
      style: { width: '5%' },
      formatter:(value) =>{
        return <>{mapQuestionType[value]}题</>
      }
  },
    {
        dataField: 'title',
        text: "题号",
        sort: true,
        style: { width: '30%' }
    },
  ]

  const columns1 = [
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
      dataField: 'name',
      text: "机构名称",
      sort: true,
      style: { width: '10%' }
  },
    {
        dataField: 'org_type',
        text: "机构类型",
        sort: true,
        style: { width: '5%' },
        formatter:(value) =>{
          return <>{mapOrgType[value]}</>
        }
    },
  ]

  const expandRow = {
    renderer: row => {
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
    clickToSelect: true,
    nonSelectableStyle: { backgroundColor: 'gray' },
    style: { backgroundColor: '#c8e6c9' },
    hideSelectAll: false,
    hideSelectColumn: true,
    onSelect: (row, isSelect, rowIndex, e) => {
      if (isSelect){
          setquestionshow([...quesitonshow,row]);
      }else{
          const restData =[]
          quesitonshow.forEach((elem) => {
                  if (row !== elem){
                      restData.push(elem)
                  }
              });
      
          setquestionshow([...restData]);
      }  
    },
      };

      const selectRow1 = {
        mode: 'checkbox',
        clickToSelect: true,
        nonSelectableStyle: { backgroundColor: 'gray' },
        style: { backgroundColor: '#c8e6c9' },
        hideSelectAll: false,
        hideSelectColumn: true,
          };

      useEffect(() => {
        // trigger re-render when props.data change
        setquestionshow(quesitonshow);
        console.log(quesitonshow)
      }, [quesitonshow]);
    
 
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
    <div className="indicator-view-main-container">
      {isLoading ? (
        <>
          <div className="loading-spinner-container">
            <Spinner animation="border" />
          </div>
        </>
      ) : (
        <>
        <Container>
          <Row className ="row1-container">
            <Col xs ={3}>
            <div>
          <div className="indicator-view-incomplete-container">
            <div className="top-bar1">
            <h5><strong>选择指标</strong><Button 
            className = 'display-button'
              variant="outline-dark"
              aria-controls="row1-display"
               aria-expanded={displayrow1}
               onClick = {() => setdisplayrow1(!displayrow1)}>
                 {displayrow1 ? "隐藏" : "展开"}
                 </Button></h5>
             </div>
              <Collapse in = {displayrow1}> 
              <Card.Body className = "rest-bar" id= {`--display-collapse`}>           
            <ol>
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
     
            </Card.Body>
            
            </Collapse>  
            </div>     
          </div>

            </Col>
            <Col xs ={4}>
            <div >        
            <div className="org-view-container">
              <div className ="top-bar2">
              <h5><strong>选择机构</strong><Button 
              className = 'display-button'
              variant="outline-dark"
              aria-controls="row1-display"
               aria-expanded={displayrow1}
               onClick = {() => setdisplayrow1(!displayrow1)}>
                 {displayrow1 ? "隐藏" : "展开"}
                 </Button></h5>
                </div>
                <Collapse in={displayrow1}>  
                <div className = "rest-bar">
                <ToolkitProvider
        bootstrap4
        keyField="id"
        data={Orgs}
        columns={columns1}
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
                          placeholder='搜索机构'
                />
                </div>
              <hr />
              <BootstrapTable
               { ...props.baseProps}
               striped
                hover
                condensed
                selectRow={selectRow1}
                />
            
          </div>                        
          )        
        }
    </ToolkitProvider>
            </div>  
            </Collapse>            
          </div>  
            </div> 
            </Col>
            <Col xs = {5}>
            <div >               
            <div className="question-show-container">
              <div className ="top-bar2">
              <h5><strong>题目展示</strong><Button 
              className = 'display-button'
              variant="outline-dark"
              aria-controls="row1-display"
               aria-expanded={displayrow1}
               onClick = {() => setdisplayrow1(!displayrow1)}>
                 {displayrow1 ? "隐藏" : "展开"}
                 </Button></h5>
                </div>
                <Collapse in={displayrow1}>  
                <div className = "rest-bar">
                {quesitonshow.map((data,idx) => (
              <Card key={data.id} id={`qnaire-question-${idx + 1}`}>
                <Card.Body>
                <QuestionDisplayCard
                readOnly={true}
                {...{
                  qid: data.id,
                  isRequired: data.is_required,
                  maxScore: parseFloat(data.max_score),
                  minScore: parseFloat(data.min_score),
                  questionType: parseInt(data.question_type),
                  rubric: data.rubric,
                  title: data.title,
                  ...JSON.parse(data.stem),
                  submissionID: null,
                }}
              />
                </Card.Body>
              </Card>
            ))}
                
            </div>  
            </Collapse>            
          </div>
            </div> 
            </Col>
          </Row >
          <Row className ="row2-container">
            <Col xs ={7}>
            <div className="question-view-container" >        
                  <div >
                    <div className ="top-bar2">
                    <h5><strong>选择题目</strong>{' '}
                    <Button 
                    variant="outline-dark"
                    className = 'display-button'
                    aria-controls="row1-display"
                     aria-expanded={displayrow2}
                     onClick = {() => setdisplayrow2(!displayrow2)}>
                       {displayrow2 ? "隐藏" : "展开"}
                       </Button></h5>
                      </div>
                      <Collapse in={displayrow2}>  
                      <div className = "rest-bar">
                      <ToolkitProvider
              bootstrap4
              keyField="id"
              data={questions}
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
                    <BootstrapTable
                     { ...props.baseProps}
                     striped
                      hover
                      condensed
                      selectRow={selectRow}
                      />
                  
                </div>                        
                )        
              }
          </ToolkitProvider>
                  </div>  
                  </Collapse>            
                </div>
                
                  </div>
       

            </Col>
          </Row>
        </Container>

        <br/>
        <br/>
        <Button>筛选题目</Button>
            
   

            <div className ='row3-container' >
            <Collapse in={true}>        
            <div className="answer-submission-view">
              <div className ="top-bar3">
              <h5><strong>答案查看</strong></h5>
                </div>

                <div className = "rest-bar2">
                <Image src = "/demo.png"
                title="Cover image"
                alt="views in the World"     
                style={{
                  position: "relative",
                  left: 0,
                  top: 0,
                  width: "100%",
      }}
    />
           
            </div>
                   
          </div>
          </Collapse>
            </div>
        </>
      )}
    </div>
    
  );
  

}