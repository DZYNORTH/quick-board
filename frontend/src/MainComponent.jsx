import React, {useEffect, useState} from 'react';
import './main.css';
import coldbk from './cold-bk.jpg';
//import * as axios from 'axios';
import axios from 'axios';

const MainComponent = () => {
    const [projectName, setProjectName] = useState('');
    const [projects, setProjects] = useState([]);
    const [currentProject, setCurrentProject] = useState('');
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);

    useEffect(() => {
        let save_projects = [];
        axios.get("http://127.0.0.1:7002/projects").then(response => {
            save_projects = response.data;
            let empty_projects = save_projects.filter(line => line.trim().length > 0);
            setProjects([...empty_projects]);
        })

        let save_tasks = [];
        axios.get("http://127.0.0.1:7002/tasks").then(response => {
            save_tasks = response.data;
            let empty_tasks = save_tasks.filter(line => line.trim().length > 0);
            setTasks([...empty_tasks]);
        })

        let completed_tasks = [];
        axios.get("http://127.0.0.1:7002/complete_tasks").then(response => {
            completed_tasks = response.data;
            let empty_tasks = completed_tasks.filter(line => line.trim().length > 0);
            setCompletedTasks([...empty_tasks]);
        })
    }, []);

    const handleAddProject = () => {
        if (projectName.trim()) {
            setProjects([...projects, projectName]);
            axios.post("http://127.0.0.1:7002/projects", {
                newProject: projectName,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                if (response) {
                    console.log('添加成功');
                } else {
                    console.log('添加失败');
                }
            })
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
        if (task.trim()) {
            setTasks([...tasks, task]);
            axios.post("http://127.0.0.1:7002/tasks", {
                newTask: task,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                if (response) {
                    console.log("添加成功");
                } else {
                    console.log("添加失败");
                }
            })
        }
    };

    const handleDeleteTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
        const task = tasks[index];
        if (task.trim()) {
            axios.post("http://127.0.0.1:7002/delete_tasks", {
                deleteTask: task,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                if (response) {
                    console.log("删除成功");
                } else {
                    console.log("删除失败");
                }
            })
        }
    };

    const handleCompleteTask = (index) => {
        const task = tasks[index];
        setTasks(tasks.filter((_, i) => i !== index));
        setCompletedTasks([...completedTasks, task]);
        if (task.trim()) {
            axios.post("http://127.0.0.1:7002/complete_tasks", {
                newTask: task,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                if (response) {
                    console.log("添加成功2");
                } else {
                    console.log("添加失败2");
                }
            })
        }
    };

    const handleDeleteCompletedTask = (index) => {
        setCompletedTasks(completedTasks.filter((_, i) => i !== index));
        const task = completedTasks[index];
        if (task.trim()) {
            axios.post("http://127.0.0.1:7002/delete_complete_tasks", {
                deleteTask: task,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                if (response) {
                    console.log("删除成功2");
                } else {
                    console.log("删除失败2");
                }
            })
        }
    };

    const handleAddComment = (index) => {
        const comment = prompt("请输入评论内容:");
        if (comment) {
            const updatedTasks = tasks.map((task, i) =>
                i === index ? { ...task, comments: [...(task.comments || []), comment] } : task
            );
            setTasks(updatedTasks);
        }
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
                                <span>{task.text}</span>
                                <button onClick={() => handleCompleteTask(index)}>已完成</button>
                                <button onClick={() => handleDeleteTask(index)}>删除</button>
                                <button onClick={() => handleAddComment(index)}>评论</button>
                                {task.comments && task.comments.map((comment, i) => (
                                    <div key={i} className="task-comment">
                                        <span>{comment}</span>
                                    </div>
                                ))}
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
                                <span>{task.text}</span>
                                <button onClick={() => handleDeleteCompletedTask(index)}>删除</button>
                                {task.comments && task.comments.map((comment, i) => (
                                    <div key={i} className="task-comment">
                                        <span>{comment}</span>
                                    </div>
                                ))}
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