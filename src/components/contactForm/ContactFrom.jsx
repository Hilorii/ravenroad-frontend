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
                    The quality <span className="highlight">you expect</span>, <br />
                    the service <span className="highlight">you deserve!</span>
                </h1>
                <p>
                    Branding is one of the most important cornerstones of starting a handyman business,
                    and sadly, one that is often overlooked. Memorable catchy handyman slogans will separate
                    you from your competitors and ultimately, become etched on your customers' minds forever.
                </p>
                <p>
                    Key elements of a catchy handyman slogan is keeping it short, memorable and in line with the
                    handyman services you provide. An example of a great slogan is “Just do it” from Nike.
                </p>
                <img
                    src="https://via.placeholder.com/600x300/2ecc71/ffffff?text=Your+Image+Here"
                    alt="Handyman example"
                    className="contact-image"
                />
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
