import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './index.css';
import { UserProvider } from './contexts/UserContext';

//Tamagui
import { config } from '@tamagui/config/v3';
import { TamaguiProvider, createTamagui} from '@tamagui/core';
//Pages
import App from './App';
import LoginPage from './pages/login/Login';
import SignupPage from './pages/signup/Signup';
import PasswordForgotPage from './pages/passwordForgot/PasswordForgot';
import ProfilePage from './pages/profile/Profile';
import PrivacyPolicyPage from './pages/privacyPolicy/PrivacyPolicy';
import TermsOfUsePage from './pages/termsOfUse/TermsOfUse';
import PricingPage from './pages/pricing/Pricing';
import ConstructionPage from './pages/underConstruction/UnderConstruction';
import ContactPage from './pages/contact/Contact';
import HelpPage from './pages/help/Help';
import AboutPage from './pages/aboutUs/AboutUs';
import TeamPage from './pages/team/Team';

const tamaguiConfig = createTamagui(config);
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <TamaguiProvider config={tamaguiConfig}>
        <UserProvider>
            <Router>
                <Routes>
                    {/*JEŚLI STRONA NIE BEDZIE W BUDOWIE TE ŚCIEŻKI ODKOMENTOWAĆ*/}
                    <Route path="/" element={<App />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/passwordForgot" element={<PasswordForgotPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/profile/:username" element={<ProfilePage />} />
                    <Route path="/privacypolicy" element={<PrivacyPolicyPage/>} />
                    <Route path="/termsofuse" element={<TermsOfUsePage/>} />
                    <Route path="/pricing" element={<PricingPage/>} />
                    <Route path="/notify" element={<ConstructionPage/>} />
                    <Route path="/contact" element={<ContactPage/>} />
                    <Route path="/help" element={<HelpPage/>} />
                    <Route path="/about" element={<AboutPage/>} />
                    <Route path="/team" element={<TeamPage/>} />

                    {/*JEŚLI STRONA JEST W BUDOWIEE TYLKO TA ŚCIEŻKA MA BYĆ ODKOMENTOWANA*/}
                    {/*<Route path="/" element={<ConstructionPage/>} />*/}
                </Routes>
            </Router>
        </UserProvider>
    </TamaguiProvider>
);