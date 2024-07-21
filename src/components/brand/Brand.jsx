import React from 'react';
import './brand.css';
import { googlemaps, openai, android, iphone, canva} from './import'

const Brand = () => {
    return (
        <div className="rr__brand section__padding">
            <div>
                <img src={googlemaps} alt="googlemaps"/>
            </div>
            <div>
                <img src={openai} alt="openai"/>
            </div>
            <div>
                <img src={android} alt="android"/>
            </div>
            <div>
                <img src={iphone} alt="iphone"/>
            </div>
            <div>
                <img src={canva} alt="canva"/>
            </div>
        </div>
    )
}
export default Brand
