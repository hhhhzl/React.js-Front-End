import React, { useState, useEffect, useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import '../../../style/table.css';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import { Button, Col, Row, Collapse, Container, ModalBody } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {fetchAllUsers, updateUser, selectAllUsers, selectAllExperts} from "../../../state/slices/users";
import { fetchAllQuestionExperts, createQuestionExpert, updateQuestionExpert, getQuestionExpert, deleteQuestionExpert } from '../../../state/slices/expert_score';
import { shouldRefetchList } from '../../../state/store';
import list from "./indicators.json";
import '../../../style/admin.css';
import { Spinner, Card, OverlayTrigger, Tooltip, Form, Badge, Modal } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { selectAuthUserOrg } from "../../../state/slices/auth";

const { SearchBar } = Search;
const { ExportCSVButton } = CSVExport; 


function refreshPage() {
  window.location.reload(false);
}

export default function ExpertScoringDisExpert({savesecondpage}) {
  const { exps } = useParams();
  const dispatch = useDispatch();
  const curUserOrg = useSelector(selectAuthUserOrg);

  useEffect(() => { 
    dispatch(fetchAllUsers({ users: exps, org: curUserOrg }));
  }, [dispatch, exps]);

    const experts = useSelector(selectAllExperts);

    const parsedUsers = useMemo(
      () =>     
        experts.map((q) => {
          const pq = {
            id: q.id,
            user_name: q.last_name + q.first_name,
            user_type: q.user_type,
            institute: q.org_name,
            isActive: q.is_active,
            mobile_number:q.mobile_number,
            email:q.email,
            field:  q.field ? JSON.parse(q.field) : "",
          };
          return {...pq}
        }),
      [experts]
    );

    const inActiveE = useMemo(
      () =>
      experts.map(elem =>{
        if (elem.is_active === false){
          return [] + [parseFloat(elem.id)]
        }
        else{
          return [] + [-1000]
        }
      }
      ),
      [experts]
    )

    useEffect(() => {
      if(parsedUsers) {
          setExpertdata([...parsedUsers]);
      }
  }, [parsedUsers]);


const findinactive =(props) =>{
  const unselect = []
  props.map(elem =>{
    if (elem!='-1000'){
      unselect.push(parseInt(elem))
    }
  })
  return unselect
}

const expert_quesitionCreate = (data) =>
    dispatch(
      createQuestionExpert({
        data,
      })
    );

const expert_quesitionUpdate = (id,update) => {
   dispatch(updateQuestionExpert({questionID:1,expertID:id,data:update}))
}



const expert_quesitionDelete = (id) =>{
  dispatch(
    deleteQuestionExpert(
      {questionID:1,
      expertID:id}
    )
  )
}

const userUpdate = (id, update) =>{
  dispatch(
    updateUser({
      userID:id,
      data:update
    })
  )

}
  
   




    //catch experts databases
    const [expertdata, setExpertdata] = useState(parsedUsers ? [...parsedUsers] : []);
    const [selectedexpert,setselectedexpert] = useState([])
    const [unselectableExpert, setunselectableExpert] = useState([])
    const [show, setShow] = useState(false)
    const [Expertinformation, setExpertinformation] = useState('')
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    ///////////////////////////////////////////////////////////////////////////////////////////////
    const [indicatordata, setIndicatordata] = useState(list);
    const [selectedindicator ,setselectedindicator ] = useState([])
    const [unselectableIndicatorid, setunselectableIndicatorid] = useState([])
    const [unselectedindicator , setunselectedindicator ] = useState([])

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
          text: "序号",
          sort: true,
          style: { width: '5%'}
      },
      {
          dataField: 'user_name',
          text: '专家姓名',
          sort: true,
          style: { width: '12%'}
      },
      {
        dataField: 'mobile_number',
        text: '专家联系方式',
        sort: true,
        style: { width: '10%'}
    },
      {
          dataField: 'institute',
          text: "所在单位",
          sort: true,
          style: { width: '15%', textAlign: 'center' },
      },
      {
        text: "领域",
        isDummyField: true,
        style: { width: '10%'},
        formatter:() => {
          return (
              <div style={{margin: 0,
                  position: "relative",
                  textAlign: 'center',
                  transform: "-moz-initial"}} >
                  <Button disabled variant="outline-primary" size = 'sm' onClick={openModel}>
                      绑定指标
                  </Button>{' '}
              </div>
          )

      },
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          openModel(row)
        }
        
      }
      },

      { 
        text: "设置专家改卷数量(默认为100)",
        dataField:'field',
        style: { width: '25%' },
        formatter:(value,row) => {
          return (
              <div style={{margin: 0,
                  position: "relative",
                  textAlign:"center",
                  transform: "-moz-initial"}} >
                    <Row>
                    <OverlayTrigger trigger="hover" overlay={(!row.isActive || whetherselected(value))== false ? <Tooltip id="tooltip-disabled">请先选择专家是否参与分配</Tooltip> : (<></>)}>
                    <Form.Group style ={{left:0}}>
                            <Form.Control
                                required
                                type="number" 
                                defaultValue={!row.isActive? "" : value.number}   
                                disabled={(!row.isActive || whetherselected(value)===false)? true : false}       
                                placeholder={row.isActive? "设置专家改题上限" : "该专家已禁用"}          
                                onChange = {(e) =>{
                                  const addexpert = {
                                    expert: row.id,
                                    question: 1,
                                    expert_detail: parseInt(e.target.value),
                                  }
                                  const changeuser = {
                                    id: row.id,
                                    user_name: row.user_name,
                                    user_type: row.user_type,
                                    institute: row.institute,
                                    isActive: row.isActive,
                                    mobile_number:row.mobile_number,
                                    email:row.email,
                                    field: JSON.stringify({selected:1, number:e.target.value, indicatorID:value.indicatorID}),
                                  }
                                  console.log(addexpert)
                                  userUpdate(row.id,changeuser)
                                  expert_quesitionUpdate(row.id,addexpert)
                                }

                                }
                            />

                        </Form.Group>
                        </OverlayTrigger>
           
                        </Row>
              </div>
              

          )

      },},
      {
          dataField: 'matched_indicator',
          text: '匹配的指标',
          sort: true,
          hidden:true
      },
      {
        text: '是否参与分配',
        dataField: 'field',
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
                      disabled ={!row.isActive}
                      type="switch"
                      value = {value.selected}
                      onChange={(e) => {
                        if (!value){
                          const addexpert = {
                            expert: row.id,
                            question: 1,
                            expert_detail: 100,
                          }
                          const changeuser = {
                            id: row.id,
                            user_name: row.user_name,
                            user_type: row.user_type,
                            institute: row.institute,
                            isActive: row.isActive,
                            mobile_number:row.mobile_number,
                            email:row.email,
                            field: JSON.stringify({selected:1, number:100,indicatorID:[]}),

                          }
                          userUpdate(row.id,changeuser)
                          expert_quesitionCreate(addexpert)
                          refreshPage();
                        } 
                        else if(value.selected === 0){
                          const addexpert = {
                            expert: row.id,
                            question: 1,
                            expert_detail: 100,
                          }
                          const changeuser = {
                            id: row.id,
                            user_name: row.user_name,
                            user_type: row.user_type,
                            institute: row.institute,
                            isActive: row.isActive,
                            mobile_number:row.mobile_number,
                            email:row.email,
                            field: JSON.stringify({selected:1, number:100, indicatorID:[]}),
                          }
                          userUpdate(row.id,changeuser)
                          expert_quesitionCreate(addexpert);
                          refreshPage();   

                        }else if(value.selected === 1){
                          const changeuser = {
                            id: row.id,
                            user_name: row.user_name,
                            user_type: row.user_type,
                            institute: row.institute,
                            isActive: row.isActive,
                            mobile_number:row.mobile_number,
                            email:row.email,
                            field: JSON.stringify({selected:0,number:"", indicatorID:row.field.indicatorID}),
                          }
                          userUpdate(row.id,changeuser)
                          expert_quesitionDelete(row.id);  
                          refreshPage();

                        }
                    }}
                      />
                    </Form>
                </div>
            )
        },
        },     
  ];

  useEffect(() => {
    // trigger re-render when props.data change
    setselectedexpert(selectedexpert)
  }, [selectedexpert]);


  const expandRow = {
    renderer: row => (
      <div>
        <p>人员姓名：{row.name}</p>
        <div>
          {!row.matched_indicators ? (
            <div>
              {row.isActive === true ? <p>该专家尚未匹配</p> : <p>该专家已禁用，请联系超级管理员恢复该专家状态</p>}
              </div>
          ) : (
            <div>
              <p>该人员绑定的指标：（共{row.matched_indicators.length}个)</p>
              {row.matched_indicators.map(elem => (
              <span><Badge pill bg="primary">{JSON.stringify(elem.name).slice(1,-1)}</Badge>{' '}</span>))}          
              </div>       
          )}
        
        </div>
        </div>
    ),
    showExpandColumn: true,
  };
    

const selectRow = {
    mode: 'checkbox',
    nonSelectable: findinactive(inActiveE),
    nonSelectableStyle: { backgroundColor: 'gray' },
    hideSelectAll: false,
    hideSelectColumn: true,

    /*
    onSelect: (row, isSelect, rowIndex, e) => {
            if (isSelect){
                setselectedexpert([...selectedexpert,row]);
            }else{
                const restData =[]
                selectedexpert.forEach((elem) => {
                        if (row !== elem){
                            restData.push(elem)
                        }
                    });
            
                setselectedexpert([...restData]);
            }  
          },

    onSelectAll: (isSelect, rows, e) => {
        if (isSelect){
          const restData = []
          expertdata.map(elem => {
            if (unselectableid.includes(elem.id) === false){
              restData.push(elem)
            }
          })
          console.log(selectedexpert)
          console.log(restData)
            setselectedexpert([...restData]);
        }else{
            setselectedexpert([]);
              }
        },        
      };
    */
    }
    const openModel = (row) => {
      if (row.isActive){
        setShow(true)
        setExpertinformation(row)
        const restData =[]
        const restid = []
        indicatordata.map(elem =>{
        if (!elem.question) {
          restData.push(elem)
          restid.push(elem.id)
        } 
        setunselectableIndicatorid([...restid])
        setunselectedindicator([...restData])
      })
      }    
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  

  const indicatorcolumns = [
    {
        dataField: 'id',
        text: "序号",
        sort: true,
        hidden:true
    },{
        dataField: 'qnaire',
        text: '所属问卷',
        sort: true,
        hidden:true
    },{
        dataField: 'name',
        text: "指标名称",
        sort: true,
    },{
      dataField: 'weight',
      text: "权重",
      sort: true,
      hidden:true
    },{
      dataField: 'question',
      text: "绑定题目",
      sort: true,
      hidden:true
    },{
      text: '选用指标',
      isDummyField: true,
      formatter:() => {
          return (
              <div style={{margin: 0,
                  position: "relative",
                  left: "30%",
                  transform: "-moz-initial"}} >
                  <Button variant = 'success' size = 'sm'>
                      选择指标
                  </Button>{' '}
              </div>
              

          )

      },
      events: {
          onClick: (e, column, columnIndex, row, rowIndex) => {
            if (row.question !== "None"){
              handlerestartmodal(row)

          }
          
        }
      }
    },
    {
      text: '该指标不参与分配',
      isDummyField: true,
      formatter:() => {
          return (
              <div style={{margin: 0,
                  position: "relative",
                  left: "30%",
                  transform: "-moz-initial"}} >
                  <Button variant = 'danger' size = 'sm'>
                      不参与分配
                  </Button>{' '}
              </div>
              

          )
              },
      events: {
          onClick: (e, column, columnIndex, row, rowIndex) => 
          handleforbbienmodal(row)
        }
      },
      
];
  

const selectRow1 = {
  mode: 'checkbox',
  nonSelectable: [...unselectableIndicatorid],
  nonSelectableStyle: { backgroundColor: 'gray' },
  hideSelectAll: false,
  clickToSelect: true,
  onSelect: (row, isSelect, rowIndex, e) => {
          if (isSelect){
              setselectedindicator([...selectedindicator ,row]);
          }else{
              const restData =[]
              selectedindicator.forEach((elem) => {
                      if (row !== elem){
                          restData.push(elem)
                      }
                  });
          
              setselectedindicator([...restData]);
          }  
          
        },
        onSelectAll: (isSelect, rows, e) => {
            if (isSelect){
              setselectedindicator(rows);
            }else{
              setselectedindicator([]);

            }
      }
      
    };
  
  const handleforbbienmodal = (row) => {
      const id = row.id;
      console.log(unselectableIndicatorid.includes(id))
      if (unselectableIndicatorid.includes(id) === false){
          setunselectedindicator([...unselectedindicator,row])
          setunselectableIndicatorid([...unselectableIndicatorid,id])
      }
  }

  const handlerestartmodal = (row) =>{
      console.log(unselectableIndicatorid.includes(row.id))
      if (unselectableIndicatorid.includes(row.id)){
          const restData = []
          const expert = []
          unselectedindicator.map((elem) => {
              console.log(elem)
              if ((row.id !== elem.id) || (!elem.question)){
                  restData.push(elem.id)
                  expert.push(elem)
              }
          });
          console.log(restData)
        
          setunselectableIndicatorid([...restData])
          setunselectedindicator([...expert])
      }

  }

  const Save = (event) => {    
    const newInfo ={
      id:Expertinformation.id,
      name:Expertinformation.name,
      user_type:Expertinformation.user_type,
      institute:Expertinformation.institute,
      matched_indicators:[...selectedindicator]
    }
    const restData =[]
    expertdata.map(elem => {
      if (elem.id != Expertinformation.id) {
        restData.push(elem)
      }
    })
    restData.push(newInfo)
    setExpertdata([...restData])
    setExpertinformation(newInfo)
    setselectedindicator([])
    setunselectableIndicatorid([])
  }

    useEffect(() => {
      // trigger re-render when props.data change
      setunselectableExpert(unselectableExpert);
    }, [unselectableExpert]);



    useEffect(() => {
      // trigger re-render when props.data change
      setExpertinformation(Expertinformation);
    }, [Expertinformation]);

    useEffect(() => {
      setExpertdata(expertdata);
    }, [expertdata]);

    useEffect(() => {
      setunselectedindicator(unselectedindicator);
    }, [unselectedindicator]);

    useEffect(() => {
      setunselectableIndicatorid(unselectableIndicatorid);
    }, [unselectableIndicatorid]);


  


    return (
      <div>
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        >
        <Modal.Header closeButton>
            <Modal.Title>
                <div className={"modal-title2"}>
                  请选择绑定{' '}{Expertinformation.name}{' '}专家的指标
                </div>
                </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <ToolkitProvider
        bootstrap4
        keyField="id"
        data={ list }
        columns={ indicatorcolumns }
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
                          placeholder='搜索指标'
                /> 
                </div>
              <hr />
              <Collapse in= {true}>
              <div className ="scroll">
              <BootstrapTable
               { ...props.baseProps}
               striped
                hover
                condensed
                selectRow ={selectRow1}
                />
                </div>
                </Collapse>
            </div>                
          )         
        }
    </ToolkitProvider>
        </Modal.Body>                          
        <Modal.Footer>  
             <p><strong>注意:</strong> 未绑定题目的指标（父级）无法参与分配[图中为灰色]</p>           
            <Button  variant="secondary" onClick={handleClose}>
                  关闭
            </Button>
            <Button  variant="primary" type="submit" onClick={(event) => {Save(event);handleClose()}}>
                保存
             </Button>                 
        </Modal.Footer>
    </Modal>

 
        <ToolkitProvider
        bootstrap4
        keyField="id"
        data={ expertdata }
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
                          placeholder='搜索打分专家'
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
                expandRow={ expandRow }
                selectRow ={selectRow}
                
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
              savesecondpage();
              refreshPage()
            }
              }>保存设置</Button>
        <p>请选择绑定专家领域对专家进行绑定，如若需修改，请重新绑定！</p>
        <p>点击'<strong>+</strong>'查看绑定指标</p>
    </div>

    );
}