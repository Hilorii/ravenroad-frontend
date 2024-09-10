//SIĘ MOŻE PRZYDA NA PRZYSZŁOŚĆ <ContactForm> ZASTĄPI PRZYCISK "NAPISZ" W Ad.jsx. ale trzebaby dodać logike wysyłania maila

import React, { useState } from 'react';
import './contactForm.css';

const ContactForm = () => {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Tutaj można obsłużyć logikę wysyłania e-maila np. przez serwer backendowy lub zewnętrzne API.
        alert('Wiadomość została wysłana!');
        setShowForm(false);
    };

    return (
        <div className="contact-form-container">
            <button className="open-form-button" onClick={() => setShowForm(true)}>
                NAPISZ
            </button>

            {showForm && (
                <div className="form-modal">
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <h2>Skontaktuj się z nami</h2>
                        <label>
                            Imię:
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Nazwisko:
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Numer telefonu:
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Adres e-mail:
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Treść wiadomości:
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </label>
                        <button type="submit" className="submit-button">
                            Wyślij
                        </button>
                        <button
                            type="button"
                            className="close-button"
                            onClick={() => setShowForm(false)}
                        >
                            Anuluj
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ContactForm;
