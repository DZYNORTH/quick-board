import React, { useState } from 'react';
import './main.css';
import coldbk from './cold-bk.jpg';

const MainComponent = () => {
    const [projectName, setProjectName] = useState('');
    const [projects, setProjects] = useState([]);
    const [currentProject, setCurrentProject] = useState('');
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);

    const handleAddProject = () => {
        if (projectName.trim()) {
            setProjects([...projects, projectName]);
            setProjectName('');
        }
    };

    const handleButtonClick = (index) => {
        setCurrentProject(projects[index]);
    };

    const handleDeleteProject = (index) => {
        setProjects(projects.filter((_, i) => i !== index));
        if (currentProject === projects[index]) {
            setCurrentProject('');
        }
    };

    const handleAddTask = () => {
        const task = prompt('请输入任务内容:');
        if (task) {
            setTasks([...tasks, task]);
        }
    };

    const handleDeleteTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    const handleCompleteTask = (index) => {
        const task = tasks[index];
        setTasks(tasks.filter((_, i) => i !== index));
        setCompletedTasks([...completedTasks, task]);
    };

    const handleDeleteCompletedTask = (index) => {
        setCompletedTasks(completedTasks.filter((_, i) => i !== index));
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
                                <button onClick={() => handleDeleteProject(index)}>删除</button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="main_project">
                    <h2>待完成的任务</h2>
                    <br />
                    <br />
                    <div>
                        <button className="add-task-button" onClick={handleAddTask}>添加新的任务</button>
                    </div>
                    <div className="task-list">
                        {tasks.map((task, index) => (
                            <div key={index} className="task-item">
                                <span>{task}</span>
                                <button onClick={() => handleCompleteTask(index)}>已完成</button>
                                <button onClick={() => handleDeleteTask(index)}>删除</button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="main_project">
                    <h2>已完成的任务</h2>
                    <img src={coldbk} alt="coldbk" height="1" width="1" />
                    <div className="task-list">
                        {completedTasks.map((task, index) => (
                            <div key={index} className="task-item">
                                <span>{task}</span>
                                <button onClick={() => handleDeleteCompletedTask(index)}>删除</button>
                            </div>
                        ))}
                    </div>
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
                <div className="current-project-font">当前项目：{currentProject}</div>
            </div>
        </div>
    );
};

export default MainComponent;