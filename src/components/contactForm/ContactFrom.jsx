import React, { useState } from "react";
import "./ContactForm.css";

function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        subject: "",
        message: ""
    });

    // Obsługa zmian w polach formularza
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Obsługa wysyłania formularza
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Wywołujemy nasz endpoint (np. http://localhost:3001/send-email)
            const response = await fetch("http://localhost:3001/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (data.success) {
                alert("Wiadomość została pomyślnie wysłana!");
                // Reset formularza
                setFormData({
                    name: "",
                    phone: "",
                    email: "",
                    subject: "",
                    message: ""
                });
            } else {
                alert("Błąd przy wysyłaniu wiadomości. Spróbuj ponownie.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Błąd przy wysyłaniu wiadomości. Spróbuj ponownie.");
        }
    };

    return (
        <section className="contact-section">
            {/* Lewa kolumna z tekstem i obrazkiem */}
            <div className="contact-left">
                <h1 className="contact-heading">
                    Nawigacja <span className="highlight">nowej generacji</span>, <br/>
                    podróżowanie <span className="highlight">w najlepszym stylu!</span>
                </h1>
                <p>
                    Raven Road to innowacyjna aplikacja nawigacyjna, która wykorzystuje sztuczną inteligencję do
                    generowania
                    optymalnych tras. Niezależnie od tego, czy planujesz samotną podróż, czy chcesz jechać w grupie,
                    Raven Road
                    zapewni Ci najlepsze trasy dopasowane do Twoich potrzeb.
                </p>
                <p>
                    Twórz wydarzenia, dołączaj do grup podróżniczych i ciesz się wspólną jazdą z innymi użytkownikami.
                    Dzięki inteligentnym algorytmom aplikacja pomoże Ci odkryć nowe, ekscytujące trasy i sprawi,
                    że każda podróż stanie się niezapomnianą przygodą.
                </p>
            </div>

            {/* Prawa kolumna z formularzem */}
            <div className="contact-right">
                <div className="contact-form-container">
                    <h2 className="contact-form-title">Skontaktuj się z nami</h2>
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="contact-form-row">
                            <input
                                type="text"
                                name="name"
                                placeholder="Imię i nazwisko"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="phone"
                                placeholder="Telefon"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="contact-form-row">
                            <input
                                type="email"
                                name="email"
                                placeholder="Adres e-mail"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="subject"
                                placeholder="Temat"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="contact-form-row">
              <textarea
                  name="message"
                  placeholder="Wiadomość..."
                  value={formData.message}
                  onChange={handleChange}
                  required
              />
                        </div>

                        <button type="submit" className="contact-form-submit">
                            WYŚLIJ
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default ContactForm;
