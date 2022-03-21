import {React, useEffect, useState} from "react";
import ExpertScoringDisExpert from "./ExpertScoringDisExpert";
import ExpertScoringDisQuestion from "./ExpertScoringDisQuestion";
import { Button,Col,Row, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { commitDraftsQE } from "../../../state/slices/question-edit";
import { PriorityHighRounded } from "@material-ui/icons";

function refreshPage() {
    window.location.reload(false);
  }



export default function Expert_dis_interface(){
    const dispatch = useDispatch();
    const storepage = Number(localStorage.getItem("page"))

    const [page, setpage] = useState(Number.isInteger(storepage) ? storepage : 1)
    const [sumbmitQ, setsubmitQ] = useState(false)
    const [sumbmitE, setsubmitE] = useState(false)
    const storedValueAsNumber1 = Number(localStorage.getItem("first"))
    const storedValueAsNumber2 = Number(localStorage.getItem("second"))
    const [firstpagesave, setfirstpagesave] = useState(Number.isInteger(storedValueAsNumber1) ? storedValueAsNumber1 : 0)
    const [secondpagesave, setsecondpagesave] = useState(Number.isInteger(storedValueAsNumber2) ? storedValueAsNumber2 : 0)
    

    const Pageaddone = () => {
        setpage(2)
        setfirstpagesave(0)
        setsecondpagesave(0)
    }

    const Pageminusone = () =>{
        setpage(1)
        setfirstpagesave(0)
        setsecondpagesave(0)
    }

    const savefirstpage = () =>{
        setfirstpagesave(firstpagesave + 1)
    }

    const savesecondpage =() =>{
        setsecondpagesave(secondpagesave + 1)
    }


    useEffect(() => {
        localStorage.setItem("first", String(firstpagesave))
      }, [firstpagesave])
    

      useEffect(() => {
        localStorage.setItem("second", String(secondpagesave))
      }, [secondpagesave])

      useEffect(() => {
        localStorage.setItem("page", String(page))
      }, [page])
    

      useEffect(()=>{
          setfirstpagesave(firstpagesave)
      },[firstpagesave])

      useEffect(()=>{
        setsecondpagesave(secondpagesave)
    },[secondpagesave])

    useEffect(()=>{
        setpage(page)
    },[page])

    


    return (
        <div className ="supervisor-interface">
            {(page === 1 && sumbmitE === false) ? 
            <div>
            <ExpertScoringDisQuestion savefirstpage={savefirstpage}/>

            <OverlayTrigger trigger="hover" overlay={firstpagesave===0? <Tooltip id="popover-contained"><PriorityHighRounded/>请先保存设置<PriorityHighRounded/></Tooltip> : (<></>)}>
                <span style={{marginLeft:"85%"}}>
                <Button disabled={firstpagesave===0? true: false} style={{pointerEvents:firstpagesave===0 ? "none":"visible"}} onClick ={() => {Pageaddone();setsubmitE(true)}} >
                    <a  href={`#expert-setting`} style={{color:"white",textDecoration:"none"}}>
                    下一页/设置打分专家
                    </a></Button>
                    </span>
            </OverlayTrigger>
            </div>
            : 
            <div>         
            <ExpertScoringDisExpert savesecondpage={savesecondpage}/> 
            <Row style={{marginLeft:"85%"}}>
                <Col xs={6}>

                <OverlayTrigger trigger="hover" overlay={secondpagesave===0 ? <Tooltip id="tooltip-disabled"><PriorityHighRounded/>请先保存设置<PriorityHighRounded/></Tooltip> : (<></>)}>
                <span>

                <Button disabled={secondpagesave ===0? true: false} style={{pointerEvents:secondpagesave===0 ? "none":"visible"}} onClick ={() => {Pageminusone();setsubmitE(false)}}>
                    <a  href={`#question-setting`} style={{color:"white",textDecoration:"none"}}>         
                    上一页
                </a></Button>
                </span>
                </OverlayTrigger>
                
                </Col>
                <Col xs={6}>
                <OverlayTrigger trigger="hover" overlay={secondpagesave===0 ? <Tooltip id="tooltip-disabled"><PriorityHighRounded/>请先保存设置<PriorityHighRounded/></Tooltip> : (<></>)}>
                <Button disabled={secondpagesave ===0? true: false} style={{pointerEvents:secondpagesave===0 ? "none":"visible"}} onClick ={() => {setsubmitE(true);setsubmitQ(true)}}>完成</Button>
                </OverlayTrigger>
                
                </Col> 

            </Row>   
            </div>
            }
            

        </div>
    )
}