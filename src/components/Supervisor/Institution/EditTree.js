import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Form, Modal, Button, Col, Row, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { selectAllOrgs, selectTopOrgs, selectOrgById, fetchAllOrgs, createOrg, updateOrg, deleteOrg, selectIsLoadingOrgs} from '../../../state/slices/orgs';


const EditTree = ({editshow,editFormData,handleEditformchange,handleEditFormSubmit,handleEditClose}) => {
    const [confirmshow, setconfirmshow] = useState(false)
    const [checked, setchecked] = useState(false)


    return (
        <>
        <Modal show = {editshow}>
                <Modal.Header closeButton onClick = {() => handleEditClose()}>
                    <Modal.Title>
                        <div className="editcurrentinstitution-">
                            {editFormData.parentOrg? "编辑当前机构" : "编辑当前上级机构"}
                            </div>
                        </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>机构名称</Form.Label>
                            <Form.Control type="text" name = 'name' required = 'required' value = {editFormData.name} onChange={handleEditformchange}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>机构类型</Form.Label>
                            <Form.Select type="text" name = 'org_type' required = 'required' value = {editFormData.org_type} onChange={handleEditformchange}>
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
                            <Form.Select disabled ={checked? false: true} type="text" name = 'is_active' required = 'required' value = {editFormData.is_active} onChange={(event) => setconfirmshow(true)}>
                                <option value= {null}>请选择机构状态</option>
                                <option value= {true}>启用</option>
                                <option value= {false}>禁用</option> 
                            </Form.Select>
                            </OverlayTrigger>
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

    </>


    )
}

export default EditTree
