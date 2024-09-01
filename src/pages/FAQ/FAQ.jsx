import { useState, useEffect } from 'react';
import Navbar from "../../components/navbar/Navbar";
import './faq.css';
import { XStack } from 'tamagui';

const FaqPage = () => {
    const [faqData, setFaqData] = useState([]);

    useEffect(() => {
        // Pobieranie danych z pliku JSON
        const fetchFaqData = async () => {
            try {
                const response = await fetch('/faqData.json');
                const data = await response.json();
                setFaqData(data);
            } catch (error) {
                console.error('Błąd wczytywania danych FAQ:', error);
            }
        };

        fetchFaqData();
    }, []);

    return (
        <div className="App">
            <div className="gradient__bg">
                <Navbar />
                <XStack justifyContent="center" className="gradient__text">
                    <div className="faq-container gradient__text">
                        <h1>FAQ - Najczęściej zadawane pytania</h1>
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
