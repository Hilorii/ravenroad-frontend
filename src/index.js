import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { UserProvider } from './contexts/UserContext';

import './index.css';
import App from './App';
import LoginPage from './pages/login/Login';
import SignupPage from './pages/signup/Signup';
import PasswordForgotPage from './pages/passwordForgot/PasswordForgot';


const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <UserProvider>
         <Router>
             <Routes>
                 <Route path="/" element={<App tab="./App"/>}/>
                 <Route path="/login" element={<LoginPage tab="./pages/login/Login"/>}/>
                 <Route path="/passwordForgot" element={<PasswordForgotPage tab="./pages/passwordForgot/PasswordForgot"/>}/>
                 <Route path="/signup" element={<SignupPage tab="./pages/signup/Signup"/>}/>
             </Routes>
        </Router>
    </UserProvider>
 );