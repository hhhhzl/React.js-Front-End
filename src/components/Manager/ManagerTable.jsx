import React, { useState, useEffect,Fragment } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import TreeList from './MangerTree';
import ManagerData from './Manager_project.json';
import ReadOnlyRow from './IndexRead';
import EditableRow from './IndexEdit';
import indexData from './index_data.json';


function ManagerTable() {  
    const [contacts,setContacts] = useState(indexData);  
    const [show, setShow] = useState(false);
    const uploadClose = () => setShow(false);
    const uploadShow = () => setShow(true);
    const [show1, setShow1] = useState(false);
    const manageClose = () => setShow1(false);
    const manageShow = () => setShow1(true);
    const [cancelshow, setCancelshow] = useState(false);
    const cancelClose = () => setCancelshow(false);
    const cancelShow = () => setCancelshow(true);
    const [show2, setShow2] = useState(false);
    const handleClose = () => setShow2(false);
    const handleShow = () => setShow2(true);

    const[editContactId,setEditContactId] =useState(null);
    

    const[addData, setAdddata] = useState(
      {
        label: '',
        ratio: '',
    },)

    const[editFormData, setEditFormData] = useState(
        {
        label: '',
        ratio: '',

    },)

    const handleAddformchange = (event) => {
      event.preventDefault();
      const fieldName = event.target.getAttribute('name');
      const fieldValue = event.target.value;
      const newFormData ={...addData};
      newFormData[fieldName] = fieldValue;
      setAdddata(newFormData)
    }

    const handleEditformchange = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;
        const newFormData ={...editFormData};
        newFormData[fieldName] = fieldValue;
        setEditFormData(newFormData)
      }

    const handleAddformSubmit = () => {
      const newContacts = {
        label: addData.label,
        ratio: addData.ratio,
        
      } 
      const newDATA = [...contacts,newContacts];
      setContacts(newDATA);
    };

    const handleEditFormSubmit = (event) => {
        event.preventDefault();
        const editedContact = {
         label: editFormData.label,
         ratio: editFormData.ratio,
          
          
        } 
        const newDATA = [...contacts];
        const index = contacts.findIndex((contact)=>contact.id === editContactId);
        newDATA[index] = editedContact;
        setContacts(newDATA);
        setEditContactId(null);
      };
  



    const handleEditClick = (event, contact) =>{
        event.preventDefault();
        setEditContactId(contact.id);
        const formValues ={
            id: contact.id,
            label: contact.label,
            ratio: contact.ratio,
        }
        setEditFormData(formValues);

    }

    const handleCancelClick = () =>{
        setEditContactId(null);
    }

    const handleDeleteClick = (contactId) => {
        const newDATA = [...contacts];
        const index = contacts.findIndex((contact)=>contact.id === contactId);
        newDATA.splice(index,1);
        setContacts(newDATA);

    }


    return (
        <div>
            <br />
            <h1 className = 'App-table'>欢迎<br />
            <br />
            管理员姓名
            <br />
            <br />
            <>
            <Button variant="secondary" size="lg" active>导出</Button>{' '}
            <Button variant="secondary" size="lg" active onClick ={uploadShow}>上传模板</Button>{' '}
            <Button variant="secondary" size="lg" active >下载模板</Button>{' '}
            </>
            
            
            <br /><br />
            <input type = "text" placeholder = "搜索关键字" />
            <InsertDriveFileIcon fontSize="large"/>sddd 100%
            <br />
            <TreeList tree={ManagerData} branch ={[]}/>

            
                    
        <Button variant="primary" size="lg" active onClick={manageShow}>管理指标</Button>{' '}
            <br /><br />

            </h1>
            <Modal centered show = {show}>
                <Modal.Header closeButton onClick = {uploadClose}>
                </Modal.Header>
                <Modal.Body>
                <Form.Group controlId="formFileMultiple" className="mb-3">
                    <Form.Label>上传表格 (.xlsx格式)</Form.Label>
                    <Form.Control type="file" multiple />
                </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                
                <Button variant="primary" type="submit"onClick = {uploadClose}>提交</Button>
                <Button variant="secondary" type="submit"onClick = {uploadClose}>取消</Button></Modal.Footer>              
            </Modal>


            
            <Modal aria-labelledby="contained-modal-title-vcenter" centered show = {show1}>
                <Modal.Header closeButton onClick = {manageClose}>
                    <Modal.Title>修改指标</Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>指标</th>
                                    <th>权重</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contacts.map((contact)=> (
                                <Fragment>
                            { editContactId === contact.id ? (
                            <EditableRow editFormData  = {editFormData} 
                            handleEditformchange = {handleEditformchange}
                            handleCancelClick = {handleCancelClick}
                            handleEditFormSubmit ={handleEditFormSubmit}
                            /> 
                            ) : (
                                <ReadOnlyRow contact = {contact} 
                                handleEditClick = {handleEditClick}
                                handleDeleteClick = {handleDeleteClick}
                                cancelShow = {cancelShow}
                                cancelshow ={cancelshow}
                                cancelClose = {cancelClose}
                                />  

                            )}
                        </Fragment>

                            ))}
                            </tbody>
                        </Table>
                      
                    <Button variant="primary" type="submit" onClick = {() => {handleShow();manageClose()}}>添加</Button>
                          
                    
                

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit">提交</Button>
                <Button variant="secondary" type="submit"onClick = {manageClose}>关闭</Button></Modal.Footer>               
            </Modal>



            <Modal show = {show2}>
                <Modal.Header closeButton onClick = {handleClose}>
                    <Modal.Title>添加指标</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>指标名称</Form.Label>
                            <Form.Control type="text" name = 'label' required = 'required'placeholder="请输入指标名称" onChange={handleAddformchange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>指标权重</Form.Label>
                            <Form.Control type="int" name = 'ratio' required = 'required'placeholder="请设置指标权重" onChange={handleAddformchange} />
                        </Form.Group>
                        
                    </Form>
                </Modal.Body>
                <Modal.Footer><Button variant="primary" type="submit" onClick = {() =>{handleAddformSubmit();handleClose()}}>提交</Button></Modal.Footer>
            </Modal>

        </div>
        
    



        
    )
}








export default ManagerTable
