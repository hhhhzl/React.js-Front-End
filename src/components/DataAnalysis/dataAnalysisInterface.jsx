import React from "react";
import NavBarTest from "../../navBar";
import AnnulScore from "./annulScore";
import Radar from "./radar";
import "./data.css";
//import SideNavPage from "./newSideMenu";
import SideMenu from "./sideMenu";
import Tabs from 'react-bootstrap/Tabs'
import { Tab } from "react-bootstrap";



export default class DataAnalysisInterface extends React.Component {

    render() {
        return (
                    <div className="supervisor-interface">
                        <br />
                        <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-3">
                            <Tab eventKey="home" title="总体情况">
                                <div className="left-seventy" style={{ height: "50vh" }}>
                                    <AnnulScore />
                                </div>
                                <div style={{ height: "50vh" }}>
                                    <Radar />
                                </div>
                            </Tab>
                            <Tab eventKey="profile" title="分院情况">
                                ppp
                            </Tab>
                            <Tab eventKey="contact" title="Contact" disabled>
                                000
                            </Tab>
                        </Tabs>
                    </div>
        )
    }
}