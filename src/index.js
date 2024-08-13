import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import { UserProvider } from './contexts/UserContext';

//Tamagui
import { config } from '@tamagui/config/v3';
import { TamaguiProvider, createTamagui } from '@tamagui/core';
//Pages
import App from './App';
import LoginPage from './pages/login/Login';
import SignupPage from './pages/signup/Signup';
import PasswordForgotPage from './pages/passwordForgot/PasswordForgot';
import ProfilePage from './pages/profile/Profile';
import PrivacyPolicyPage from './pages/privacyPolicy/PrivacyPolicy';
import TermsOfUsePage from './pages/termsOfUse/TermsOfUse';

const tamaguiConfig = createTamagui(config);
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <TamaguiProvider config={tamaguiConfig}>
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/passwordForgot" element={<PasswordForgotPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/profile/:username" element={<ProfilePage />} />
                    <Route path="/privacypolicy" element={<PrivacyPolicyPage/>} />
                    <Route path="/termsofuse" element={<TermsOfUsePage/>} />
                </Routes>
            </Router>
        </UserProvider>
    </TamaguiProvider>
);
