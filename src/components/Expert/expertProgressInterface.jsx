import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

export default class ExpertProgressInterface extends React.Component {
    constructor(){
        super()
        this.state = {
            progress:60
        }
    }
    render() {
        return (
                <div className="supervisor-interface">
                        <h3>欢迎</h3>
                        <br/>
                        <h3>你目前的项目打分进度为：{this.state.progress}%</h3>
                        <br/>
                        
                        <ProgressBar striped variant="success" now={this.state.progress} key={1}/>


                        <br />
                </div>
        );
    }
}