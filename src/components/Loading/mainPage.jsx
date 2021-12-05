import React from "react";
import { Navbar } from "react-bootstrap";
import EChartsMainPage from "./echartsMainPage";
import MainNavBar from "./mainNavBar";


export default function MainPage() {
    return (
        <div className="main-interface" style={{ background: "rgb(27, 114, 198)", height: "100vh" }}>
            <MainNavBar />
            <div className="main-left">
            <EChartsMainPage />
               
            </div>
            <div className="main-right" style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:'90vh'}}>
                <div>
                    <h1 className="title">
                        <strong>
                        <center>
                            2021年度
                            <br />
                            中国科学院信息化评估
                        </center>
                        </strong>
                    </h1>
                    {/*
                    <p className="content" >
                        2021年信息化评估对象是全院__名在职员工（在编人员___人，在读研究生___人）所属的院属单位。其中包括：研究单位___家、分院___家、支撑单位___家（包括院属大学2所及公共支撑单位1家）。
                    </p>
                    <p className="content" >
                        中国科学院信息化评估采集数据来源包括院属单位提供的信息、各类信息系统和网络采集的信息，如ARP系统、网站群、科技云、教育云、将继续教育系统、机构知识库管理系统等。
                    </p>
                    <p className="content">
                        评估信息采集时间范围为2020年_月_日至___年_月_日。
                    </p>
                    */}
                </div>
            </div>
        </div>
    );
}