import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './index.css';
import { UserProvider } from './contexts/UserContext';
import { PortalProvider } from './contexts/PortalProvider';
import './i18n';
// import { PortalProvider } from 'tamagui';
import { Cookies } from './components/index'
import { PrivateRoute } from './contexts/PrivateRoute';

//Tamagui
import { config } from '@tamagui/config/v3';
import { TamaguiProvider, createTamagui} from '@tamagui/core';
//Pages
import App from './App';
import LoginPage from './pages/login/Login';
import LoginPage1 from './pages/login/Login1';
import RegisterPage from './pages/register/Register';
import PasswordForgotPage from './pages/passwordForgot/PasswordForgot';
import ProfilePage from './pages/profile/Profile';
import TermsOfUsePage from './pages/termsOfUse/TermsOfUse';
import TermsOfUsePageEN from './pages/termsOfUse/TermsOfUseEn';
import TermsOfUsePageDE from './pages/termsOfUse/TermsOfUseDe';
import PricingPage from './pages/pricing/Pricing';
import ConstructionPage from './pages/underConstruction/UnderConstruction';
import ContactPage from './pages/contact/Contact';
import HelpPage from './pages/help/Help';
import AboutPage from './pages/aboutUs/AboutUs';
import TeamPage from './pages/team/Team';
import PurchasePage from './pages/purchase/Purchase';
import PageNotFoundPage from './pages/pageNotFound/PageNotFound';
// import RoutesPage from './pages/routes/Routes';
// import AddRoutePage from './pages/addRoute/AddRoute';
// import RouteDetailsPage from './pages/routeDetails/RouteDetails';
// import GroupDetailsPage from './pages/groupDetails/GroupDetails';
// import EventDetailsPage from './pages/eventDetails/EventDetails';
import CollaborationPage from './pages/collaboration/Collaboration';
// import ReadyRoutesPage from './pages/readyRoutes/ReadyRoutes';
// import EditRoutePage from './pages/editRoute/EditRoute';
// import AddGroupPage from './pages/addGroup/AddGroup';
// import EditGroupPage from './pages/editGroup/EditGroup';
// import EditEventPage from './pages/editEvent/EditEvent';
// import SearchGroupsPage from './pages/searchGroups/SearchGroups';
// import SearchedGroupDetailsPage from './pages/searchGroups/SearchedGroupDetails';
// import ReadyRoutesDetailsPage from './pages/readyRoutes/ReadyRoutesDetails';
// import AddEventPage from './pages/addEvent/AddEvent';
// import JoinEventPage from './pages/joinEvents/JoinEvents';
// import JoinEventDetailsPage from './pages/joinEvents/JoinEventDetails';
import DeleteDataPage from './pages/deleteData/DeleteData';
import ForgotPasswordPage from './pages/resetPassword/ForgotPassword';

//POZOSTAŁE
import FAQ from './pages/FAQ/FAQ';

//GROUPS
import Groups from './pages/groups/Groups';
import GroupDetails from './pages/groups/GroupDetails';
import EditGroup from './pages/groups/EditGroup';
import CreateGroup from './pages/groups/CreateGroup';

//ROUTES

//EVENTS
import Events from './pages/events/Events';
import EventDetails from './pages/events/EventDetails';
import EditEvent from './pages/events/EditEvent';
import CreateEvent from './pages/events/CreateEvent';

const tamaguiConfig = createTamagui(config);
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <TamaguiProvider config={tamaguiConfig}>
            <PortalProvider>
                <UserProvider>
                    <Router>
                        {/*<Cookies/>*/}
                        <Routes>
                            {/*JEŚLI STRONA NIE BEDZIE W BUDOWIE TE ŚCIEŻKI ODKOMENTOWAĆ*/}
                            <Route path="/" element={<App />} />
                            <Route path="/login" element={<LoginPage1 />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/passwordForgot" element={<PasswordForgotPage />} />
                            <Route path="/profile/:username" element={<PrivateRoute element={<ProfilePage/>} />} />
                            <Route path="/pl/termsofuse" element={<TermsOfUsePage/>} />
                            <Route path="/en/termsofuse" element={<TermsOfUsePageEN/>} />
                            <Route path="/de/termsofuse" element={<TermsOfUsePageDE/>} />
                            <Route path="/deleteData" element={<DeleteDataPage/>} />
                            <Route path="/pricing" element={<PricingPage/>} />
                            <Route path="/notify" element={<ConstructionPage/>} />
                            <Route path="/contact" element={<ContactPage/>} />
                            <Route path="/help" element={<HelpPage/>} />
                            <Route path="/about" element={<AboutPage/>} />
                            <Route path="/team" element={<TeamPage/>} />
                            <Route path="/pricing/purchase" element={<PurchasePage/>} />
                            {/*<Route path="/routes" element={<RoutesPage/>} />*/}
                            {/*<Route path="/addRoute" element={<AddRoutePage/>} />*/}
                            {/*<Route path="/addRoute" element={<PrivateRoute element={<AddRoutePage/>} />} />*/}
                            {/*<Route path="/routeDetails/:id" element={<RouteDetailsPage/>} />*/}
                            <Route path="/collaboration" element={<CollaborationPage/>} />
                            {/*<Route path="/readyRoutes" element={<ReadyRoutesPage/>} />*/}
                            {/*<Route path="/editRoute/:id" element={<EditRoutePage/>} />*/}
                            {/*<Route path="/addGroup" element={<AddGroupPage/>} />*/}
                            {/*<Route path="/editGroup/:id" element={<EditGroupPage/>} />*/}
                            {/*<Route path="/editEvent/:id" element={<EditEventPage/>} />*/}
                            {/*<Route path="/groupDetails/:id" element={<GroupDetailsPage/>} />*/}
                            {/*<Route path="/eventDetails/:id" element={<EventDetailsPage/>} />*/}
                            {/*<Route path="/searchGroups" element={<SearchGroupsPage/>} />*/}
                            {/*<Route path="/searchedGroupDetails/:id" element={<SearchedGroupDetailsPage/>} />*/}
                            {/*<Route path="/readyRouteDetails/:id" element={<ReadyRoutesDetailsPage/>} />*/}
                            {/*<Route path="/createEvent" element={<AddEventPage/>} />*/}
                            {/*<Route path="/joinEvents" element={<JoinEventPage/>} />*/}
                            {/*<Route path="/joinEventDetails/:id" element={<JoinEventDetailsPage/>} />*/}
                            <Route path="/password-reset" element={<ForgotPasswordPage/>} />
                            <Route path="*" element={<PageNotFoundPage/>} />

                            {/*POZOSTAŁE*/}
                            <Route path="/FAQ" element={<FAQ/>} />


                            {/*GROUPS*/}
                            <Route path="/groups" element={<Groups/>} />
                            <Route path="/groupDetails/:id" element={<GroupDetails />} />
                            <Route path="/editGroup/:id" element={<EditGroup />} />
                            <Route path="/create-group" element={<CreateGroup />} />

                            {/*ROUTES*/}

                            {/*EVENTS*/}
                            <Route path="/events" element={<Events/>} />
                            <Route path="/eventDetails/:id" element={<EventDetails />} />
                            <Route path="/editEvent/:id" element={<EditEvent />} />
                            <Route path="/create-event" element={<CreateEvent />} />

                            {/*JEŚLI STRONA JEST W BUDOWIEE TYLKO TA ŚCIEŻKA MA BYĆ ODKOMENTOWANA*/}
                            {/*<Route path="/" element={<Navigate to="/construction" replace />} />*/}
                            {/*<Route path="/" element={<Navigate to="/main" replace />} />*/}
                            {/*<Route path="/construction" element={<ConstructionPage />} />*/}
                        </Routes>
                    </Router>
                </UserProvider>
            </PortalProvider>
        </TamaguiProvider>
    </React.StrictMode>
);