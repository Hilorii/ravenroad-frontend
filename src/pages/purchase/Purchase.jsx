import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from "../../components/navbar/Navbar";
import './purchase.css';
import { YStack, XStack } from 'tamagui';

const PurchasePage = () => {
    const navigate = useNavigate();
    const subscriptionName = localStorage.getItem('subscriptionName');
    const price = localStorage.getItem('price');

    useEffect(() => {
        if (!subscriptionName || !price) {
            navigate('/pricing');
        }
    }, [subscriptionName, price, navigate]);

    return (
        <div className="App">
        <div className="gradient__bg">
            <Navbar/>
            <XStack  justifyContent="center" className="gradient__text" >
                <div className="purchase-form gradient__text ">
                    <h1>Podsumowanie zamówienia</h1>
                    <p>Wybrany abonament: {subscriptionName}</p>
                    <p>Cena: {price}</p>
                    <p>Masz 7 dniowy okres próbny!</p>
                    {/* Dodaj metody płatności */}
                </div>
            </XStack>
        </div>
        </div>

    );
};

export default PurchasePage;
