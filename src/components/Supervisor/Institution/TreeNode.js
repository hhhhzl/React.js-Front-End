import React,{useState,useEffect} from 'react'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import EditIcon from '@material-ui/icons/Edit';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip'
import AssignmentIcon from '@material-ui/icons/Assignment';
import Dropdown from 'react-bootstrap/Dropdown'
import DeleteIcon from '@material-ui/icons/Delete';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav'
import { NavDropdown } from 'react-bootstrap';
import { Contacts, ControlCameraOutlined } from '@material-ui/icons';
import EditTree from './EditTree';
import DescriptionIcon from '@material-ui/icons/DescriptionTwoTone';
import SchoolIcon from '@material-ui/icons/School';
import SubjectIcon from '@material-ui/icons/Subject';
import GroupWorkIcon  from '@material-ui/icons/GroupWork';

const TreeList = ({tree = [], branch}) => {
    const [rawData, setrawData] = useState(tree);
    const [dataContacts, setdataContacts] = useState(rawData); 

    const rawData2Tree = (data) => {
        let id2Data = {};
        let treeRoot = [];
        data.forEach((elem) => {
          const node = {
            id: elem.id,
            label: elem.label,
            branch: elem.branch,
            parentOrg: elem.parentOrg,
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
            label: '',
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
              label: addData.label,
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
          label: '',
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
            label: editFormData.label,
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
            label: contact.label,
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




const TreeNode = ({ node, show, handleClose, handleShow, handleAddformSubmit,handleAddformchange, 
    level,editshow,editFormData,handleEditformchange,handleEditClose,handleEditFormSubmit,handleEditShow,handleEditClick,cancelClose,cancelShow,cancelshow,handleDeleteClick, show1, handleShow1, handleClose1}) => {
    const[childVisable,setChildVisiblity] = useState(false);
    const [contacts,setContacts] = useState(node);
    // const [hasChild,sethaschild] = useState(contacts.children ? true : false)
     // const hasChild = () => (contacts.children ? true : false);
    

     useEffect(() => {
        // trigger re-render when props.data change
        setContacts(node);
      }, [node]);
    
    

     
    return (
        <div>
            
        
        <li className ="d-tree-node">
            

            <div className = "d-flex">

                {(
                    <div >                        
                       <PlayArrowIcon className ={`d-tree-toggler ${ childVisable ? "active" : ""}`} onClick = {() => setChildVisiblity(!childVisable)}/>
                    </div>
                )}
                     
                {
                        level === 1  ? 
                        <div className =  "d-tree-font">

                        <Nav>
                            <Nav.Item >
                                <Nav.Link style={{color: "black"}} ><AccountBalanceIcon/>{' '}{contacts.label}</Nav.Link>
                            </Nav.Item>
                            <DropdownButton variant="light" size = "sm" id="dropdown-item-button" title={<EditIcon/>}> 
                            <Modal show = {show1}>
                                <Modal.Header closeButton onClick = {handleClose1}>
                                    <Modal.Title>
                                        <div className="addlowerinstitution-">
                                            添加下属机构
                                            </div>
                                            </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>机构名称</Form.Label>
                                                <Form.Control type="text" name = 'label' required = 'required' onChange={handleAddformchange}/>
                                            </Form.Group>
                                            <Form.Group className="mb-3"  controlId="formBasicText">
                                                <Form.Label>机构代码</Form.Label>
                                                <Form.Control type="text" name = 'code' placeholder=" " onChange={handleAddformchange}/>
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formBasicText">
                                                <Form.Label>机构地址</Form.Label>
                                                <Form.Control type="text" name = 'address' placeholder=" " onChange={handleAddformchange}/>
                                            </Form.Group>
                                            <Form.Group className="mb-3"   controlId="formBasicText">
                                                <Form.Label>邮编</Form.Label>
                                                <Form.Control type="text" name = 'mail' placeholder=" " onChange={handleAddformchange}/>
                                            </Form.Group>
                                            <Form.Group className="mb-3"  controlId="formBasicText">
                                                <Form.Label>领域</Form.Label>
                                                <Form.Control type="text" name = 'area'placeholder=" " onChange={handleAddformchange}/>
                                            </Form.Group>
                                        </Form>
                                    </Modal.Body>
                                     <Modal.Footer><Button variant="primary" type="submit" onClick = {() => {handleAddformSubmit(contacts.id);handleClose1();}}>提交</Button>                
                                    <Button variant="secondary" type="submit"onClick = {handleClose}>取消</Button></Modal.Footer>                
                            </Modal>
                                
                                <Dropdown.Item as="button" onClick = {handleShow1}><AddCircleOutlineIcon/>添加下属分院</Dropdown.Item>
                            </DropdownButton>
                                  
                        </Nav>
                        </div>
                        : 
                        <div  className = "d-tree-font">
                            <Nav>
                            <Nav.Item >
                                <Nav.Link style={{color: "black"}} >{level === 2? <GroupWorkIcon  style={{color:"darkslategray"}} /> : <SchoolIcon  style={{color:"darkgreen"}} />}{' '}{contacts.label}</Nav.Link>
                            </Nav.Item>                                                     {/* 分院和研究所的ICON */}
                            
                            <DropdownButton variant="light" size = "sm" id="dropdown-item-button" title={<EditIcon/>}>
                            <Modal show = {cancelshow} aria-labelledby="contained-modal-title-vcenter"centered>
                                <Modal.Header closeButton onClick = {cancelClose}>
                                    <Modal.Title>确认将该机构设置为非活跃</Modal.Title>
                                    </Modal.Header>
                <Modal.Footer><Button variant="primary" type="submit"  >确认</Button>
                <Button variant="primary" type="submit" onClick = {cancelClose}>取消</Button></Modal.Footer>
                </Modal> 
                            <EditTree editshow ={editshow} 
                            editFormData  = {editFormData} 
                            handleEditformchange = {handleEditformchange}
                            handleEditClose = {handleEditClose}
                            handleEditFormSubmit ={handleEditFormSubmit}
                            />
                            <Modal show = {show}>
                <Modal.Header closeButton onClick = {handleClose}>
                    <Modal.Title>
                        <div className="addlowerinstitution-">
                            添加下属机构
                            </div>
                            </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>机构名称</Form.Label>
                            <Form.Control type="text" name = 'label' required = 'required' onChange={handleAddformchange}/>
                        </Form.Group>
                        <Form.Group className="mb-3"  controlId="formBasicText">
                            <Form.Label>机构代码</Form.Label>
                            <Form.Control type="text" name = 'code' placeholder=" " onChange={handleAddformchange}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>机构地址</Form.Label>
                            <Form.Control type="text" name = 'address' placeholder=" " onChange={handleAddformchange}/>
                        </Form.Group>
                        <Form.Group className="mb-3"   controlId="formBasicText">
                            <Form.Label>邮编</Form.Label>
                            <Form.Control type="text" name = 'mail' placeholder=" " onChange={handleAddformchange}/>
                        </Form.Group>
                        <Form.Group className="mb-3"  controlId="formBasicText">
                            <Form.Label>领域</Form.Label>
                            <Form.Control type="text" name = 'area'placeholder=" " onChange={handleAddformchange}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                
                
                <Modal.Footer><Button variant="primary" type="submit" onClick = {() => {handleAddformSubmit(contacts.id);handleClose();}}>提交</Button>                
                <Button variant="secondary" type="submit"onClick = {handleClose}>取消</Button></Modal.Footer>                
            </Modal>
                                
                                <Dropdown.Item as="button" onClick = {() => {handleEditShow();handleEditClick(contacts)}}><AssignmentIcon/>编辑当前机构</Dropdown.Item>
                                <Dropdown.Item as="button" onClick = {handleShow}><AddCircleOutlineIcon/>添加下属机构</Dropdown.Item>
                                <Dropdown.Item as="button"onClick ={cancelShow}><DeleteIcon/>设置当前机构为非活跃</Dropdown.Item>
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
        </div>

        
    )
}


export default TreeList








