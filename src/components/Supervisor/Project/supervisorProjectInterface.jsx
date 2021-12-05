import React from 'react';
import SupervisorAddProjectInterface from './addProject';
import SupervisorProjectTable from './ProjectTable';


export default class SupervisorProjectInterface extends React.Component {


    render() {
        return (
            <div className="supervisor-interface">
                <h3 className="supervisorwelcome">欢迎</h3>
                <SupervisorAddProjectInterface/>
                <SupervisorProjectTable/>
            </div>
        );
    }
}