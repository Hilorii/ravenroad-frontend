import Navbar from "../../components/navbar/Navbar"
import './faq.css'
import { Link } from 'react-router-dom';
import AnimatedBackground from '../../assets/AnimatedBackground/AnimatedBackground'
import Footer from '../../containers/footer/Footer'
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

export default function FAQ() {
    const [faqData, setFaqData] = useState([]);
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language;

    useEffect(() => {
        // Pobieranie danych FAQ z pliku JSON odpowiedniego dla aktualnego języka
        const fetchFaqData = async () => {
            try {
                const response = await fetch(`/faq/faqData-${currentLanguage}.json`);
                const data = await response.json();
                setFaqData(data);
            } catch (error) {
                console.error(t('faq.errorLoadingData'), error);
            }
        };

        fetchFaqData();
    }, [currentLanguage, t]);
    return (
        <div>
            <AnimatedBackground/>
            <Navbar/>
            <div className="faq">
                <div className="faq-container">
                    <h1>{t('faq.title')}</h1>
                    {faqData.map((faq, index) => (
                        <div key={index} className="faq-item">
                            <h2>{faq.question}</h2>
                            <p>{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </div>
            <Footer/>
        </div>
    );
}