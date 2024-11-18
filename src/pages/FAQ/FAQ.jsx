import { useState, useEffect } from 'react';
import Navbar from "../../components/navbar/Navbar";
import './faq.css';
import { XStack } from 'tamagui';
import NavbarTmp from '../../components/navbar/NavbarTmp';
import { useTranslation } from 'react-i18next';

const FaqPage = () => {
    const [faqData, setFaqData] = useState([]);
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language; // Pobieranie aktualnego języka

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
        <div className="App">
            <div className="gradient__bg">
                {/*<Navbar />*/}
                <NavbarTmp />
                <XStack justifyContent="center" className="gradient__text">
                    <div className="faq-container gradient__text">
                        <h1>{t('faq.title')}</h1>
                        {faqData.map((faq, index) => (
                            <div key={index} className="faq-item">
                                <h2>{faq.question}</h2>
                                <p>{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </XStack>
            </div>
        </div>
    );
};

export default FaqPage;
