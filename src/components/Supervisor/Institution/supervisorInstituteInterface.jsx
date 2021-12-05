import React, { useState } from 'react'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import data from './datatest..json';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Tab from 'react-bootstrap/Tab'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip'
import AssignmentIcon from '@material-ui/icons/Assignment';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import DeleteIcon from '@material-ui/icons/Delete';
import TreeList from './TreeNode';
import { Contacts, ControlCameraOutlined } from '@material-ui/icons';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import EditIcon from '@material-ui/icons/Edit';
import EditTree from './EditTree';
import NavBarTest from '../../../navBar';
import SideMenu from './sideMenu';


function SupervisorInstituteInterface() {



  const rawData2Tree = (data) => {
    let id2Data = {};
    let treeRoot = [];
    data.forEach((elem) => {
      const node = {
        id: elem.id,
        label: elem.label,
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

  const rawDatasingleTree = (institute, data) => {
    let treeSingle = [];
    data.forEach((elem) => {
      if (elem.branch === institute.branch) {
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
  const [dataContacts, setdataContacts] = useState(data);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [cancelshow, setCancelshow] = useState(false);
  const cancelClose = () => setCancelshow(false);
  const cancelShow = () => setCancelshow(true);

  const [frontshow, setFrontShow] = useState(false);
  const handlefrontClose = () => setFrontShow(false);
  const handlefrontShow = () => setFrontShow(true);

  const [editshow, setEditShow] = useState(false);
  const handleEditClose = () => setEditShow(false);
  const handleEditShow = () => setEditShow(true);


  const [addData, setAdddata] = useState(
    {
      id: '',
      label: '',
      icon: '',
      code: '',
      address: '',
      mail: '',
      area: '',
      children: [],
    })

  const handleAddformchange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;
    const newFormData = { ...addData };
    newFormData[fieldName] = fieldValue;
    setAdddata(newFormData)
  }

  const handleAddformSubmit = () => {

    const newContacts = {
      id: contacts.length + 1,
      label: addData.label,
      code: addData.code,
      address: addData.address,
      mail: addData.mail,
      area: addData.area,
      parentOrg: null,
      branch: contacts.length + 1,
      children: [],
    }
    const newDATA = [...contacts, newContacts];
    setContacts(newDATA);
    setdataContacts([...dataContacts, newContacts])
  };


  const [editContactId, setEditContactId] = useState(null);

  const [editFormData, setEditFormData] = useState(
    {
      id: '',
      label: '',
      code: '',
      address: '',
      mail: '',
      area: '',
      branch: '',
      parentOrg: '',
      children: [],

    })




  const handleEditformchange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;
    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;
    setEditFormData(newFormData);
  }

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    const editedContact = {
      id: editFormData.id,
      label: editFormData.label,
      code: editFormData.code,
      address: editFormData.address,
      mail: editFormData.mail,
      area: editFormData.area,
      parentOrg: null,
      branch: editFormData.branch,
      children: editFormData.children,


    }
    const editedData = {
      id: editFormData.id,
      label: editFormData.label,
      code: editFormData.code,
      address: editFormData.address,
      mail: editFormData.mail,
      area: editFormData.area,
      parentOrg: null,
      branch: editFormData.branch,
    }

    const newJATA = [...dataContacts];

    const newDATA = [...contacts];

    const index1 = contacts.findIndex((contact) => contact.id === editContactId);
    const index2 = dataContacts.findIndex((contact) => contact.id === editContactId);
    newDATA[index1] = editedContact;

    newJATA[index2] = editedData;


    setContacts(newDATA);
    setdataContacts(newJATA);

    setEditContactId(null);
  };

  const handleEditClick = (contact) => {
    setEditContactId(contact.id);
    const formValues = {
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

  const handleCancelClick = () => {
    setEditContactId(null);
  }

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
          <h5 className="institutionpresentation"> 机构展示</h5>
          <br />
          <br />
          <>
            <Button variant="secondary" size="sm" active>导出</Button>{' '}
            <Button variant="secondary" size="sm" active>上传模板</Button>{' '}
            <Button variant="secondary" size="sm" active>下载模板</Button>{' '}
          </>

          <br /><br />
          <Tab.Container id="left-tabs-example" defaultActiveKey='中国科学院'>
            <Nav variant="tabs">
              {contacts.map(institute => (
                <Nav.Item>
                  <Nav.Link eventKey={institute.label}> {institute.label}</Nav.Link>
                </Nav.Item>

              ))}

              <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">点击进行机构编辑</Tooltip>}>

                <Button onClick={handlefrontShow} >机构编辑


                </Button>
              </OverlayTrigger>

            </Nav>
            {contacts.map(institute => (
              <Tab.Content>
                <Tab.Pane eventKey={institute.label}>
                  <TreeList tree={rawDatasingleTree(institute, dataContacts)} branch={institute.branch} />
                </Tab.Pane>
              </Tab.Content>


            ))}

          </Tab.Container>




          <Modal show={show}>
            <Modal.Header closeButton onClick={handleClose}>
              <Modal.Title>
                <div className="addupperinstitution-">
                  添加上级机构
                  </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>机构名称</Form.Label>
                  <Form.Control type="text" name='label' required='required' onChange={handleAddformchange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicText">
                  <Form.Label>机构代码</Form.Label>
                  <Form.Control type="text" name='code' placeholder=" " onChange={handleAddformchange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicText">
                  <Form.Label>机构地址</Form.Label>
                  <Form.Control type="text" name='address' placeholder=" " onChange={handleAddformchange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicText">
                  <Form.Label>邮编</Form.Label>
                  <Form.Control type="text" name='mail' placeholder=" " onChange={handleAddformchange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicText">
                  <Form.Label>领域</Form.Label>
                  <Form.Control type="text" name='area' placeholder=" " onChange={handleAddformchange} />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer><Button variant="primary" type="submit" onClick={() => { handleAddformSubmit(); handleClose(); }}>提交</Button>
              <Button variant="secondary" type="submit" onClick={handleClose}>取消</Button></Modal.Footer>
          </Modal>

          <EditTree editshow={editshow}
            editFormData={editFormData}
            handleEditformchange={handleEditformchange}
            handleEditClose={handleEditClose}
            handleEditFormSubmit={handleEditFormSubmit}
          />



          <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={frontshow}>

            <Modal.Header closeButton onClick={handlefrontClose}>
              <Modal.Title id="contained-modal-title-vcenter">
                <div className="editinstitution-">
                请编辑机构
                </div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="addinstitution-">
              <Button onClick={() => { handleShow(); handlefrontClose() }}>添加上级机构</Button>

              {contacts.map(institute => (
                <div>
                  <Nav>
                    <Nav.Item >
                      <Nav.Link style={{ color: "black" }} ><AccountBalanceIcon />{' '}{institute.label}</Nav.Link>
                    </Nav.Item>
                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">点击进行下属分院编辑</Tooltip>}>
                      <DropdownButton variant="light" size="sm" id="dropdown-item-button" title={<EditIcon />}>
                        <Modal show={cancelshow} aria-labelledby="contained-modal-title-vcenter" centered>
                          <Modal.Header closeButton onClick={cancelClose}>
                            <Modal.Title>确认删除该上级机构</Modal.Title>
                          </Modal.Header>
                          {console.log(institute.id)}

                          <Modal.Footer><Button variant="primary" type="submit" onClick={() => { cancelClose(); handleDeleteClick(institute.id, institute.branch); handlefrontClose() }} >确认删除</Button>
                            <Button variant="primary" type="submit" onClick={cancelClose}>取消</Button></Modal.Footer>
                        </Modal>
                        <Dropdown.Item as="button" onClick={() => { handleEditShow(); handleEditClick(institute); handlefrontClose() }} ><AssignmentIcon />编辑机构</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={cancelShow}><DeleteIcon />删除机构</Dropdown.Item>
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








export default SupervisorInstituteInterface

