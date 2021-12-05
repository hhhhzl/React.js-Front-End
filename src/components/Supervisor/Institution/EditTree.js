import React,{ useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';


const EditTree = ({editshow,editFormData,handleEditformchange,handleEditFormSubmit,handleEditClose}) => {
    
    return (
        <Modal show = {editshow}>
                <Modal.Header closeButton onClick = {() => handleEditClose()}>
                    <Modal.Title>
                        <div className="editcurrentinstitution-">
                            编辑当前机构
                            </div>
                        </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>机构名称</Form.Label>
                            <Form.Control type="text" name = 'label' required = 'required' value = {editFormData.label} onChange={handleEditformchange}/>
                        </Form.Group>
                        <Form.Group className="mb-3"  controlId="formBasicText">
                            <Form.Label>机构代码</Form.Label>
                            <Form.Control type="text" name = 'code' placeholder=" " value = {editFormData.code} onChange={handleEditformchange}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>机构地址</Form.Label>
                            <Form.Control type="text" name = 'address' placeholder=" " value = {editFormData.address} onChange={handleEditformchange}/>
                        </Form.Group>
                        <Form.Group className="mb-3"   controlId="formBasicText">
                            <Form.Label>邮编</Form.Label>
                            <Form.Control type="text" name = 'mail' placeholder=" " value = {editFormData.mail} onChange={handleEditformchange}/>
                        </Form.Group>
                        <Form.Group className="mb-3"  controlId="formBasicText">
                            <Form.Label>领域</Form.Label>
                            <Form.Control type="text" name = 'area'placeholder=" " value = {editFormData.area} onChange={handleEditformchange}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer><Button variant="primary" type="submit" onClick = {(event) => {handleEditFormSubmit(event);handleEditClose()}}>提交</Button>
                <Button variant="secondary" type="submit"onClick = {handleEditClose}>取消</Button></Modal.Footer>                
            </Modal>
    )
}

export default EditTree
