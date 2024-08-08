import React from 'react';
import './index.css'; // 假设这是你的样式文件

const IndexComponent = () => {
    return (
        <div className="bc">
            <div className="container">
                <div className="title_box">
                    <h1 className="title_font">Title Here</h1>
                    <form className="index_form">
                        <label className="index_label" htmlFor="inputField">Label</label>
                        <input id="inputField" type="text" className="index_form" />
                        <button type="submit" className="index_login_button">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default IndexComponent;