import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Footer, Blog, Possibility, Features, WhatRR, Header} from "./containers";
import {CTA, Brand, Navbar, Ad, Cookies} from './components'
import NavbarTmp from './components/navbar/NavbarTmp'
import "./App.css"

import { ProCard } from './components/tamagui/pro-card';
import { SpinnerLoading } from './components/tamagui/spinner';

const MainSite = () => {
    const navigate = useNavigate();


    return (
        <div className="App">
            <Cookies/>
            <div className="gradient__bg">
                <div className="">
                    <NavbarTmp/>
                </div>
                    <div>
                        <Header/>
                        {/*<Brand/> /!* ZMIENIĆ MARKI*!/*/}
                        <Ad/>
                        <WhatRR/>
                        <div className="middle yes" id="pro">
                            <ProCard/>
                        </div>
                        <Features/>
                        <Possibility/>
                        {/*<CTA/>*/}
                        {/*<Blog/> /!*Znaleźć kogoś od blogów fajny pomysł*!/*/}
                        <Footer/>
                    </div>



            </div>
        </div>

    )
}
export default MainSite


