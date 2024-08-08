import React from 'react';
import './index.css';
import './main.css';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IndexComponent from './IndexComponent.jsx';
import MainComponent from './MainComponent.jsx';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<IndexComponent />} />
                <Route path="/main" element={<MainComponent />} />
            </Routes>
        </Router>
    );
};

export default App;