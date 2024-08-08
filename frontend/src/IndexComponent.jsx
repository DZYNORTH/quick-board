import React from 'react';
import { useNavigate } from 'react-router-dom'; // 引入 useNavigate
import './index.css';
import coldIndexBk from './cold-index-bk.jpg';

const IndexComponent = () => {
    const navigate = useNavigate(); // 创建 navigate 函数

    const handleLogin = () => {
        // 在这里可以添加登录逻辑
        navigate('/main'); // 点击按钮后跳转到 '/main'
    };

    return (
        <div style={{ backgroundImage: `url(${coldIndexBk})` }} className="bc">
            <div className="container">
                <div className="title_box">
                    <h1 className="title_font">欢迎使用敏捷看板</h1>
                    <form>
                        <label className="index_label">账号：</label>
                        <input className="index_form" type="text" placeholder="  请输入用户名" />
                        <br /><br />
                        <label className="index_label">密码：</label>
                        <input className="index_form" type="password" placeholder="  请输入密码" />
                    </form>

                    <button className="index_login_button" id="LoginButton" onClick={handleLogin}>登录/注册</button>
                    <img src={coldIndexBk} alt="bk-pic" height="1" width="1" />
                </div>
            </div>
        </div>
    );
}

export default IndexComponent;