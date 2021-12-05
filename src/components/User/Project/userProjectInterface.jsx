import React from 'react';
import UserProjectTable from './userProjectTable';

export default class UserInterface extends React.Component {

    render() {
        return (
            <div className="supervisor-interface">
                <h3>问卷填写</h3>
                <br />
                <UserProjectTable/>
            </div>
        );
    }
}