import React from 'react';
import AdminProjectTable from "./adminProjectTable";

export default class AdminInterface extends React.Component {



    render() {
        return (
            <div className="supervisor-interface">
                <h3>欢迎</h3>
                <br />
                <AdminProjectTable/>
            </div>
        );
    }

}