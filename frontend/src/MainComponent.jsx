import React from 'react';
import './main.css';

const MainComponent = () => {
    return (
        <div className="main_bc">
            <div className="container">
                <nav className="navi">
                    <h1 className="main_title_font">Main Title</h1>
                    <div className="main_project">

                    </div>
                </nav>
                <div className="add_project">
                    <button className="add_button">Add Project</button>
                    <div className="name">Project Name</div>
                    <input id="name_form" type="text" />
                </div>
                <div className="current_project">

                </div>
            </div>
        </div>
    );
}

export default MainComponent;