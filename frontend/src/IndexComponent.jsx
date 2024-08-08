import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 引入 useNavigate
import './index.css';
import coldIndexBk from './cold-index-bk.jpg';
import * as axios from 'axios';

const client = axios.default;

const IndexComponent = () => {
    const [username, setUsername] = useState(''); // 状态钩子来保存用户名
    const [password, setPassword] = useState(''); // 状态钩子来保存密码
    const navigate = useNavigate(); // 创建 navigate 函数

    const handleLogin = () => {
        // 添加登录逻辑
        client.post("http://127.0.0.1:7002/checkpoint", {
            name: username,
            password: password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                // 登录成功后的处理逻辑
                if (response) {
                    alert('登陆成功')
                    navigate('/main');
                } else {
                    console.log('114514 not found');
                }
                // 点击按钮后跳转到 '/main'
            })
            .catch(error => {
                // 错误处理逻辑
                console.error('Login error:', error);
            });
    };

    return (
        <div className="bc">
            <div className="container">
                <div className="title_box">
                    <h1 className="title_font">欢迎使用敏捷看板</h1>
                    <form>
                        <label className="index_label">账号：</label>
                        <input
                            className="index_form"
                            type="text"
                            placeholder="请输入用户名"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <br /><br />
                        <label className="index_label">密码：</label>
                        <input
                            className="index_form"
                            type="password"
                            placeholder="请输入密码"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </form>

                    <button className="index_login_button" id="LoginButton" onClick={handleLogin}>登录/注册</button>
                    <img src={coldIndexBk} alt="bk-pic" height="1" width="1" />
                </div>
            </div>
        </div>
    );
}

export default IndexComponent;