import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { TamaguiProvider, createTamagui } from '@tamagui/core';
import { config } from '@tamagui/config/v3';

import { UserProvider } from './contexts/UserContext';
import './index.css';
import App from './App';
import LoginPage from './pages/login/Login';
import SignupPage from './pages/signup/Signup';
import PasswordForgotPage from './pages/passwordForgot/PasswordForgot';

const container = document.getElementById('root');
const root = createRoot(container);
const tamaguiConfig = createTamagui(config);

root.render(
    <TamaguiProvider config={tamaguiConfig}>
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/passwordForgot" element={<PasswordForgotPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                </Routes>
            </Router>
        </UserProvider>
    </TamaguiProvider>
);
