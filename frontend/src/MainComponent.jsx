import React, { useState } from 'react';
import './main.css';
import coldbk from './cold-bk.jpg';

const MainComponent = () => {
    const [projectName, setProjectName] = useState('');
    const [projects, setProjects] = useState([]);
    const [currentProject, setCurrentProject] = useState(''); // 新的状态

    const handleAddProject = () => {
        if (projectName.trim()) {
            setProjects([...projects, projectName]);
            setProjectName('');
        }
    };

    const handleButtonClick = (index) => {
        setCurrentProject(projects[index]); // 更新当前项目状态
    };

    return (
        <div className="main_bc">
            <div className="navi">
                <span className="main_title_font">敏捷看板</span>
            </div>

            <div className="container">
                <div className="main_project">
                    <h2>项目列表</h2>
                    <div className="task-list">
                        {projects.map((project, index) => (
                            <div key={index} className="task-item">
                                <span>{project}</span>
                                <button onClick={() => handleButtonClick(index)}>切换至该项目</button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="main_project">
                    <h2>待完成的任务</h2>
                    <br />
                    <div>
                        <button className= "add-task-button">添加新的任务</button>
                    </div>
                </div>
                <div className="main_project">
                    <h2>已完成的任务</h2>
                </div>
            </div>

            <div className="add_project">
                <button
                    className="add_button"
                    id="add_project"
                    onClick={handleAddProject}
                >
                    创建项目
                </button>
                <form onSubmit={(e) => { e.preventDefault(); handleAddProject(); }}>
                    <label htmlFor="name_form" className="name">项目名称：</label>
                    <input
                        type="text"
                        id="name_form"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                    />
                </form>
            </div>

            <div className="current_project">
                <div className="current-project-font">当前项目：{currentProject}</div> {/* 显示当前项目 */}
            </div>
        </div>
    );
}

export default MainComponent;