import React,{ useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';


const EditableRow = ({editFormData,handleEditformchange,handleEditFormSubmit,handleCancelClick}) => {
    
    return (
        <Modal show = {true}>
                <Modal.Header closeButton onClick = {handleCancelClick}>
                    <Modal.Title>编辑指标</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>指标名称</Form.Label>
                            <Form.Control type="text" name = 'label' required = 'required' value = {editFormData.label} onChange={handleEditformchange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>指标权重</Form.Label>
                            <Form.Control type="text" name = 'ratio' required = 'required' value = {editFormData.ratio} onChange={handleEditformchange} />
                        </Form.Group>
                        

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" onClick = {handleEditFormSubmit}>提交</Button>
                    <Button variant="primary" type="submit" onClick = {handleCancelClick}>取消</Button>
                    </Modal.Footer>
            </Modal>
    )
}

export default EditableRow