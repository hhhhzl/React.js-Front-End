import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Nav, Button, Modal, Form, Tab, OverlayTrigger, Tooltip, Dropdown, DropdownButton, Row, Col } from 'react-bootstrap';
import data from './datatest..json';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import EditIcon from '@material-ui/icons/Edit';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DeleteIcon from '@material-ui/icons/Delete';
import { selectAllOrgs, selectTopOrgs, selectOrgById, fetchAllOrgs, createOrg, updateOrg, deleteOrg, selectIsLoadingOrgs} from '../../../state/slices/orgs';
import SchoolIcon from '@material-ui/icons/School';
import { Business } from '@material-ui/icons';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';


const TreeList = ({tree = [], branch, qnaire}) => {
  const [rawData, setrawData] = useState(tree);
  const [dataContacts, setdataContacts] = useState(rawData); 

  const rawData2Tree = (data) => {
      let id2Data = {};
      let treeRoot = [];
      data.forEach((elem) => {
        const node = {
          id: elem.id,
          name: elem.name,
          parent_org: elem.parent_org,
          children: [],
        };
        id2Data[node.id] = node;
        if (elem.parent_org === null) {
          treeRoot.push(node);
        } else {
          id2Data[elem.parent_org].children.push(node);
        }
      });
      return treeRoot;
    };

    const BranchDelete = (contactID,data) => {
      console.log(contactID);
        let deletedata =[];
        let ids = [contactID];
        let restdata = [];
        data.forEach((elem) => {
              if ((elem.id in ids) === true){
                deletedata.push(elem);
              }
              else if ((elem.parentOrg in ids) ===true){
                  ids.push(elem.id);
                  
                  deletedata.push(elem);
              }
              else{
                  restdata.push(elem);
              }
            
        });
        return restdata;
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    const [cancelshow, setCancelshow] = useState(false);
    const cancelClose = () => setCancelshow(false);
    const cancelShow = () => setCancelshow(true);

    const [editshow, setEditShow] = useState(false);
    const handleEditClose = () => setEditShow(false);
    const handleEditShow = () => setEditShow(true);

    const[addData, setAdddata] = useState(
        {
          key: [],
          name: '',
          icon: '',
          code: '',
          address:'',
          mail: '',
          area: '',
          parentOrg: '',
          branch: branch,
          children:[],
      },)

      const handleAddformchange = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;
        const newFormData ={...addData};
        newFormData[fieldName] = fieldValue;
        setAdddata(newFormData)
      }

      const [nextID, setNextID] = useState(1111);

      const handleAddformSubmit = (parentID) => {
          
        const newContacts = {
            id: nextID,
            name: addData.name,
            icon: 'AccountBoxIcon',
            code: addData.code,
            address:addData.address,
            mail: addData.mail,
            parentOrg: parentID,
            branch: addData.branch,
            area: addData.area,
            children:[],       
        } 
        setNextID(nextID + 1);
        
        
        setrawData([...rawData,newContacts]);
      };

      const[editContactId,setEditContactId] =useState(null);

    const[editFormData, setEditFormData] = useState(
      {
        id: '',
        name: '',
        code: '',
        address:'',
        mail: '',       
        area: '',
        branch: '',
        parentOrg: '',
        children:[],
        
    },)


    

  const handleEditformchange = (event) => {
      event.preventDefault();
      const fieldName = event.target.getAttribute('name');
      const fieldValue = event.target.value;
      const newFormData ={...editFormData};
      newFormData[fieldName] = fieldValue;
      setEditFormData(newFormData);
    }

    const handleEditFormSubmit = (event) => {
      event.preventDefault();

      const editedData ={
          id: editFormData.id,
          name: editFormData.name,
          code: editFormData.code,
          address: editFormData.address,
          mail: editFormData.mail,
          area: editFormData.area,
          parentOrg:editFormData.parentOrg,
          branch:editFormData.branch,
      }

      

      const newJATA = [...rawData];
      const index2 = rawData.findIndex((contact)=>contact.id === editContactId);
      newJATA[index2] = editedData;
      

      setrawData(newJATA);
  
      setEditContactId(null);
    };

    const handleEditClick = (contact) =>{
      setEditContactId(contact.id);
      const formValues ={
          id: contact.id,
          name: contact.name,
          code: contact.code,
          address: contact.address,
          mail: contact.mail,
          area: contact.area,
          branch: contact.branch,
          parentOrg: contact.parentOrg,
          children: contact.children,

      }
      setEditFormData(formValues);

  }

  const handleDeleteClick = (contactId) => {
      const restData =[]
      const deleteDATA = BranchDelete(contactId,dataContacts);
      console.log(deleteDATA);
      dataContacts.forEach((elem) => {
          if (elem in deleteDATA === false){
              restData.push(elem)

          }
      });
      setdataContacts(restData);
      console.log(restData);

  }


      useEffect(() => {
          // trigger re-render when props.data change
          setrawData(tree);
        }, [tree]);

        useEffect(() => {
          // trigger re-render when props.data change
          setdataContacts(rawData);
        }, [rawData]);



      
  return (
      <>
        <div className ="row">
            <div className = "col text-center">
                <p className = 'mt-3'>
                    <div className = "row mt-3 d-flex jusify-content-center">
                        <div className ="col-lg-8 text-center text-dark">
                        <div className = "d-tree">
                            <ul className = "d-flex d-tree-container flex-column">
                                {rawData2Tree(rawData).map(node => (
                                <div style={{ display: "flex" }}>
                                    |--
                                    <TreeNode key = {node.id} 
                                    qnaire = {qnaire}
                                    level = {1} node = {node} 
                                    show ={show} handleClose= {handleClose} 
                                    handleShow = {handleShow} 
                                    handleAddformSubmit ={handleAddformSubmit} 
                                    handleAddformchange = {handleAddformchange}
                                    editshow = {editshow}
                                    editFormData ={editFormData}
                                    handleEditformchange ={handleEditformchange}
                                    handleEditClose ={handleEditClose}
                                    handleEditFormSubmit ={handleEditFormSubmit}
                                    handleEditShow ={handleEditShow}
                                    handleEditClick ={handleEditClick}
                                    cancelClose = {cancelClose}
                                    cancelShow ={cancelShow}
                                    cancelshow ={cancelshow}
                                    handleDeleteClick ={handleDeleteClick}
                                    show1 ={show1}
                                    handleClose1 = {handleClose1}
                                    handleShow1 ={handleShow1}
                 

                                     />
                              </div >
                          ))}
                          
                             </ul>    
      </div>
                        </div>

                    </div>
                </p>
            </div>
            
        </div>
      </>
  )
}

const TreeNode = ({  qnaire, node, show, handleClose, handleShow, handleAddformSubmit,handleAddformchange, 
  level,editshow,editFormData,handleEditformchange,handleEditClose,handleEditFormSubmit,handleEditShow,handleEditClick,cancelClose,cancelShow,cancelshow,handleDeleteClick, show1, handleShow1, handleClose1,}) => {

  const Orgs = useSelector(selectAllOrgs);
  const Head = useSelector(selectTopOrgs)

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
    console.log(id2data)
    console.log(Orgs)
    console.log(Head)
    return id2data;
  }, [Orgs]);
  const[childVisable,setChildVisiblity] = useState(false);
  const [contacts,setContacts] = useState(node);
  
   useEffect(() => {
      // trigger re-render when props.data change
      setContacts(node);
    }, [node]);
    
  return (
      <>     
      <li className ="d-tree-node">
          <div className = "d-flex">
              {(<PlayArrowIcon className ={`d-tree-toggler ${ childVisable ? "active" : ""}`} onClick = {() => setChildVisiblity(!childVisable)}/>
              )}         
              {
                      level === 1  ? 
                      <div className =  "d-tree-font">
                      <Nav>
                          <Nav.Item >
                              <Nav.Link style={{color: "black"}} ><AccountBalanceIcon/>{' '}{contacts.name}</Nav.Link>
                          </Nav.Item>
                          <DropdownButton variant="light" size = "sm" id="dropdown-item-button" title={<EditIcon/>}> 
                          <OrgCreateFormModal {...{
                            qnaire,
                            curData: contacts,
                            top: 2,
                            }}/> 
                          </DropdownButton>
                                
                      </Nav>
                      </div>
                      : 
                      <div  className = "d-tree-font">
                          <Nav>
                          <Nav.Item >
                              <Nav.Link style={{color: "black"}} >{level === 2? <Business  style={{color:"darkslategray"}} /> : <SchoolIcon  style={{color:"darkgreen"}} />}{' '}{contacts.name}</Nav.Link>
                          </Nav.Item>                                                     {/* 分院和研究所的ICON */}
                          
                          <DropdownButton variant="light" size = "sm" id="dropdown-item-button" title={<EditIcon/>}>
                          <OrgCreateFormModal {...{
                            qnaire,
                            curData: contacts,
                            top: 2,
                            }}/>
                              <OrgEditUpdateFormModal
                        {...{
                          qnaire,
                          curData: contacts,
                          top:1
                          
                        }}/>

                        {// indicators with children indicators can't be deleted
            OrgsMapIDData[contacts.id].children.length != 0 ? (
              <OrgEditDeleteFormModal
                {...{
                  curData: OrgsMapIDData[contacts.id],
                }}
              />
            ) : null
          }

                          </DropdownButton>
                          </Nav>
                      </div>
              }        
          </div> 

          

          
          
              
          {childVisable && (
              <div className ="d-tree-content">
                  <ul className = "d-flex d-tree-container flex-column">
                  {contacts.children.map(tree => (
                  <div style={{ display: "flex" }}>
                  |--
                  <TreeNode  key ={node.id} level={level + 1} node = {tree} show ={show} handleClose= {handleClose} handleShow = {handleShow} handleAddformSubmit ={handleAddformSubmit} handleAddformchange = {handleAddformchange}
                  editshow = {editshow}
                  editFormData ={editFormData}
                  handleEditformchange ={handleEditformchange}
                  handleEditClose ={handleEditClose}
                  handleEditFormSubmit ={handleEditFormSubmit}
                  handleEditShow ={handleEditShow}
                  handleEditClick ={handleEditClick}
                  cancelClose = {cancelClose}
                  cancelShow ={cancelShow}
                  cancelshow ={cancelshow}
                  handleDeleteClick ={handleDeleteClick}
                  show1 ={show1}
                  handleClose1 = {handleClose1}
                  handleShow1 ={handleShow1}
                   />
                  </div >
                    
              ))}
                  </ul>
               </div>
          )}    
      </li>
      </>

      
  )
}

const OrgCreateFormModal = ({ qnaire, curData, top }) => {
  console.log(curData.id)
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [orgType, setorgType] = useState("");
  const [address, setaddress] = useState("");
  const [postcode, setpostcode] = useState("");
  const [department, setdepartment] = useState("");
  const [phone, setphone] = useState("");

  return (
    <>
      {top == 1? 
      (<><Button className="topButton" variant="outline-success" onClick={() => setShowModal(true)}>
      添加{top == 1 ? "上级" : "下级"}机构
    </Button></>) : 
    (<>
    <Dropdown.Item as="button" onClick = {() => setShowModal(true)}><AddCircleOutlineIcon/>添加下属分院</Dropdown.Item>

    </>)}
      
      <Modal
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
                {curData.id > 0 ? "下级机构" : null}
                </div>         
                </Modal.Title>      
          </Modal.Header>
          <Modal.Body>
            <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>机构名称*</Form.Label>
                  <Form.Control type="text" placeholder = "请输入机构名称"  required onChange={(e) => setName(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>机构类型</Form.Label>
                            <Form.Select type="text" name = 'org_type' required = 'required'  onChange={(e) => setorgType(e.target.value)}>
                                <option value="">请选择机构类型</option>
                                <option value="I">研究所</option>
                                <option value="B">分院</option>
                                <option value="S">支撑单位</option>
                                <option value="U">学校</option>  
                            </Form.Select>
                        </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>机构地址</Form.Label>
                  <Form.Control type="text" placeholder = "请输入机构地址" onChange={(e) => setaddress(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>机构邮编</Form.Label>
                  <Form.Control type="text" placeholder = "请输入机构邮编" onChange={(e) => setpostcode(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>机构所属部门</Form.Label>
                  <Form.Control type="text" placeholder = "请输入机构所属部门" onChange={(e) => setdepartment(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>机构联系方式</Form.Label>
                  <Form.Control type="number" placeholder = "请输入机构联系方式" onChange={(e) => setphone(e.target.value)}/>
            </Form.Group>

            </Form>
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
                  createOrg({
                    data: {
                      name:name,
                      org_type: orgType,
                      is_active: true,
                      address:address,
                      postcode:postcode,
                      department:department,
                      phone:phone,
                      parent_org: top == 1 ? null : curData.id,
                    },
                  })
                );
                setShowModal(false);
                
              }}
            >
              保存添加
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

const OrgEditUpdateFormModal = ({
  qnaire,
  curData,
  parentData,
  top,
}) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState(curData.name || "");
  const [org_type, setorgType] = useState(curData.org_type || "");
  const [address, setaddress] = useState(curData.address || "");
  const [postcode, setpostcode] = useState(curData.postcode || "");
  const [department, setdepartment] = useState(curData.department || "");
  const [phone, setphone] = useState(curData.phone || "");
  const [is_active, setisActive] = useState(curData.is_active || false)
  const [checked, setchecked] = useState(false)


  return (
    <>
    
    <Dropdown.Item as="button" onClick = {() => setShowModal(true)}><AssignmentIcon/>{top == 1? "修改当前上级机构" : "修改当前机构"}</Dropdown.Item>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton onClick = {() => setShowModal(false) }>
                    <Modal.Title>
                        <div className="editcurrentinstitution-">
                            {top == 1 ? "修改编辑当前上级机构" : "修改编辑当前机构"}
                            </div>
                        </Modal.Title>
                </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>机构名称</Form.Label>
                          <Form.Control type="text" name = 'name' required = 'required' value = {name} onChange={(e) => setName(e.target.value)}/>
            </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>机构类型</Form.Label>
                            <Form.Select type="text" name = 'org_type' required = 'required' value = {org_type} onChange={(e) => setorgType(e.target.value)}>
                                <option value="">请选择机构类型</option>
                                <option value="I">研究所</option>
                                <option value="B">分院</option>
                                <option value="S">支撑单位</option>
                                <option value="U">学校</option>  
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>状态</Form.Label>
                            <span> <Row><Col xs ={0.5}><Form.Check onChange ={() => setchecked(!checked)}></Form.Check></Col><Col xs={11.5}><p style={{color:"red"}}>!!!注意: 改变机构状态会同时改变下属所有机构状态</p></Col></Row></span> 
                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">请先勾选注意事项</Tooltip>}>       
                            <Form.Select disabled ={checked? false: true} type="text" name = 'is_active' required = 'required' value = {is_active} onChange={(e) => setisActive(e.target.value)}>
                                <option value= {null}>请选择机构状态</option>
                                <option value= {true}>启用</option>
                                <option value= {false}>禁用</option> 
                            </Form.Select>
                            </OverlayTrigger>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>机构地址</Form.Label>
                            <Form.Control type="text" name = 'address' placeholder=" " value = {address} onChange={(e) => setaddress(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3"   controlId="formBasicText">
                            <Form.Label>邮编</Form.Label>
                            <Form.Control type="text" name = 'postcode' placeholder=" " value = {postcode} onChange={(e) => setpostcode(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3"  controlId="formBasicText">
                            <Form.Label>所属部门</Form.Label>
                            <Form.Control type="text" name = 'department' placeholder=" " value = {department} onChange={(e) => setdepartment(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3"  controlId="formBasicText">
                            <Form.Label>电话</Form.Label>
                            <Form.Control type="text" name = 'phone' placeholder=" " value = {phone} onChange={(e) => setphone(e.target.value)}/>
                        </Form.Group>
            </Form>
      

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
              onClick={() => {
                dispatch(
                  updateOrg({
                    orgID: curData.id,
                    data: {
                      name:name,
                      org_type: org_type,
                      is_active: is_active,
                      address:address,
                      postcode:postcode,
                      department:department,
                      phone:phone,
                      parent_org: top == 1 ? null : curData.parent_org,
                    },
                  })
                );
                setShowModal(false);
              }}
            >
              保存修改
            </Button>
          </Modal.Footer>
      </Modal>
    </>
  );
};

const OrgEditDeleteFormModal = ({ qnaire, curData }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Dropdown.Item as="button" onClick ={() => setShowModal(true)}><DeleteIcon />删除机构</Dropdown.Item>
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
                  deleteOrg({
                    orgID: curData.id,
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




export default function SupervisorInstituteInterface() {
  const { qnaire } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllOrgs({ qnaire }));
  }, [dispatch, qnaire]);

  const Orgs = useSelector(selectAllOrgs);
  const Head = useSelector(selectTopOrgs)
  const isLoading = useSelector(selectIsLoadingOrgs);

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
    console.log(id2data)
    return id2data;
  }, [Orgs]);

  

  const rawData2Tree = (data) => {
    let id2Data = {};
    let treeRoot = [];
    data.forEach((elem) => {
      const node = {
        id: elem.id,
        name: elem.name,
        branch: elem.branch,
        children: [],
      };
      id2Data[node.id] = node;
      if (elem.parentOrg === null) {
        treeRoot.push(node);
      } else {
        id2Data[elem.parentOrg].children.push(node);
      }
    });
    return treeRoot;
  };

  const rawDatasingleTree = (institute, data, array) => {
    let treeSingle = [];
    treeSingle.push(institute);
    let idex = [institute.id];
    data.forEach((elem) => {
      if (array.children.includes(elem.id)) {
        treeSingle.push(elem);
      }
    });
    return treeSingle;
  };

  const rawDeleteTree = (branch, data) => {
    let AfterDeleteTree = [];
    data.forEach((elem) => {
      if (elem.branch !== branch) {
        AfterDeleteTree.push(elem);
      }
    });
    return AfterDeleteTree;
  }




  const [contacts, setContacts] = useState(rawData2Tree(data));
  const [HeadOrgs, setheadOrgs] = useState(Head)
  const [dataContacts, setdataContacts] = useState(Orgs);

  useEffect(() => {
    setheadOrgs(Head)
  }, [Head]);

  useEffect(() => {
    console.log(Orgs)
    setdataContacts(Orgs)
  }, [Orgs]);

  const [cancelshow, setCancelshow] = useState(false);
  const cancelClose = () => setCancelshow(false);
  const cancelShow = () => setCancelshow(true);

  const [frontshow, setFrontShow] = useState(false);
  const handlefrontClose = () => setFrontShow(false);
  const handlefrontShow = () => setFrontShow(true);

  const handleDeleteClick = (contactId, branch) => {
    const newDATA = [...contacts];
    const index = contacts.findIndex((contact) => contact.id === contactId);
    newDATA.splice(index, 1);
    setContacts(newDATA);
    setdataContacts(rawDeleteTree(branch, dataContacts));


  }


  return (
    <div> 
        <div className="supervisor-interface">
          <h3>欢迎</h3>
          <br />
          <br />
          <>
            <Button variant="secondary" size="sm" active>导出</Button>{' '}
            <Button variant="secondary" size="sm" active>上传模板</Button>{' '}
            <Button variant="secondary" size="sm" active>下载模板</Button>{' '}
          </>

          
          <h5 className="institutionpresentation"> 机构展示</h5>
          <br />
          <br />
          <Tab.Container id="left-tabs-example" defaultActiveKey='中国科学院'>
            <Nav variant="tabs">
              {HeadOrgs.map(institute => (
                <Nav.Item>
                  <Nav.Link eventKey={institute.name}> {institute.name}{" "}</Nav.Link>
                </Nav.Item>

              ))}

              <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">点击进行最上级机构编辑</Tooltip>}>
                <div style={{marginLeft:"2%"}}>
                <Button onClick={handlefrontShow} >上级机构编辑
                </Button>
                </div>
              </OverlayTrigger>

            </Nav>

            {HeadOrgs.map((institute,elem) => (
              <Tab.Content>
                <Tab.Pane eventKey={institute.name}>
                  <TreeList tree={rawDatasingleTree(institute, Orgs, OrgsMapIDData[institute.id] )} branch={elem} />
                </Tab.Pane>
              </Tab.Content>
            ))}
          </Tab.Container>


          <Modal size="sm" aria-labelledby="contained-modal-title-vcenter" centered show={frontshow}>
            <Modal.Header closeButton onClick={handlefrontClose}>
              <Modal.Title id="contained-modal-title-vcenter">
                <div className="editinstitution-">
                请编辑机构
                </div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="addinstitution-">
            <OrgCreateFormModal {...{
                  qnaire,
                  curData: Head[0],
                  top: 1,
                }}/>
               <hr/>
              {Head.map(institute => (
                <div>
                  <Nav>
                    <Nav.Item >
                      <Nav.Link style={{ color: "black" }} ><AccountBalanceIcon />{' '}{institute.name}</Nav.Link>
                    </Nav.Item>
                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">点击进行上级机构编辑</Tooltip>}>
                      <DropdownButton variant="light" size="sm" id="dropdown-item-button" title={<EditIcon />}>
                        <Modal show={cancelshow} aria-labelledby="contained-modal-title-vcenter" centered>
                          <Modal.Header closeButton onClick={cancelClose}>
                            <Modal.Title>确认删除该上级机构</Modal.Title>
                          </Modal.Header>
                          <Modal.Footer><Button variant="primary" type="submit" onClick={() => { cancelClose(); handleDeleteClick(institute.id, institute.branch); handlefrontClose() }} >确认删除</Button>
                            <Button variant="primary" type="submit" onClick={cancelClose}>取消</Button></Modal.Footer>
                        </Modal>
                        <OrgEditUpdateFormModal
                        {...{
                          qnaire,
                          curData: institute,
                          top:1
                          
                        }}/>
                        {
            // orgs with children indicators can't be deleted
            OrgsMapIDData[institute.id].children.length === 0 ? (
              <OrgEditDeleteFormModal
                {...{
                  curData: OrgsMapIDData[institute.id],
                }}
              />
            ) : null
          }

                        
                      </DropdownButton>
                    </OverlayTrigger>
                  </Nav>

                </div>
              ))}
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handlefrontClose}>取消</Button>
            </Modal.Footer>
          </Modal>


        </div>
      </div>
  )
}


