import React from 'react';
import Table from 'react-bootstrap/Table';
import SupervisorEditUserInterface from './edit&DeleteUser';
import { SupervisorDeleteUser } from './edit&DeleteUser';
import PaginationIcon from './Pagination';

// Satffing
function SupervisorUserRow(props) {
    const { value } = props;

    return (
        <tr>
            <td>{value.last_name + value.first_name}</td>
            <td>{value.username}</td>
            <td>{value.org}</td>
            <td>{value.user_type}</td>
            <td>{value.field}</td>
            <td>{value.mobile_number}</td>
            <td>{value.email}</td>
            <td>
                <SupervisorEditUserInterface
                    value={value}
                    rowID={props.rowID}
                    callback={(childData) => props.callbackTop(childData, props.rowID)}
                />
                &#160;
                <SupervisorDeleteUser callbackDelete={() => props.callbackDelete(props.rowID)} />
            </td>
        </tr>
    );
}






export default class SupervisorUserTable extends React.Component {


    // Pagination Settings
    state = {
        currentpage: 1,
        // Set the post per Page
        postsPerPage: 10,
    }

    getCurrentPosts = () => {
        const { currentpage, postsPerPage } = this.state;
        const indexOfLastPost = currentpage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        return this.props.value.slice(indexOfFirstPost, indexOfLastPost);
    }

    Paginate = (pageNumbers) => {
        this.setState({
            currentpage: pageNumbers
        })
    }


    // Render table Rows
    renderProjects(elem, i) {
        return (
            <SupervisorUserRow
                value={elem} key={"projectRow" + i}
                callbackTop={this.props.callbackEdit}
                rowID={i}
                callbackDelete={this.props.callbackDelete}
            />
        );
    }


    render() {
        return (
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>用户姓名</th>
                            <th>用户名</th>
                            <th>所属机构</th>
                            <th>用户类型</th>
                            <th>工作领域</th>
                            <th>手机</th>
                            <th>邮箱</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.getCurrentPosts().map((elem, i) => this.renderProjects(elem, i))}
                    </tbody>
                </Table>
                <PaginationIcon
                    postPerpage={this.state.postsPerPage}
                    currentpage={this.state.currentpage}
                    totalPosts={this.props.value.length}
                    Paginate={this.Paginate}
                />
            </div>
        );
    }
}


