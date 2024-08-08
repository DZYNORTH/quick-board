import React from 'react';
import './main.css';

const MainComponent = () => {
    return (
        <div>
            <div className="main_bc">
            <div className="navi">
                <span className="main_title_font">敏捷看板</span>
                <img src="./cold-bk.jpg" alt="." width="1" height="1"/>
            </div>

            <div className="container">
                <div className="main_project">
                    <h2>待办任务</h2>
                </div>
                <div className="main_project">
                    <h2>正在进行的任务</h2>
                </div>
                <div className="main_project">
                    <h2>已完成的任务</h2>
                </div>
            </div>

            <div className="add_project">
                <button className="add_button">创建项目</button>
                <form>
                    <label htmlFor="name_form" className="name">项目名称：</label>
                    <input type="text" id="name_form"/>
                </form>
            </div>

            <div className="current_project"></div>
            </div>
        </div>
    );
}

export default MainComponent;