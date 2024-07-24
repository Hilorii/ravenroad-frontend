import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App';
import LoginPage from './pages/login/Login';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
     <Router>
         <Routes>
             <Route path="" element={<App tab="./App"/>}/>
             <Route path="/login" element={<LoginPage tab="./pages/login/Login"/>}/>
         </Routes>
    </Router>
 );