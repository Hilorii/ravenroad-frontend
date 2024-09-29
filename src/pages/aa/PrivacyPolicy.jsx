import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Komponent wyświetlający pełną politykę prywatności
const PrivacyPolicy = () => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Polityka Prywatności Raven Road</Text>

            <Text style={styles.section}>
                Twoja prywatność jest dla nas ważna. W Raven Road dbamy o ochronę Twojej prywatności i zobowiązujemy się do jej ochrony. Zbieramy, przetwarzamy i wykorzystujemy Twoje dane osobowe zgodnie z niniejszą Polityką Prywatności, aby świadczyć usługi i prowadzić naszą działalność. Przed skorzystaniem z naszych usług prosimy o dokładne zapoznanie się z treścią Polityki Prywatności. Korzystanie z naszych usług oznacza akceptację niniejszej Polityki Prywatności oraz naszych Warunków Użytkowania.
            </Text>

            <Text style={styles.subtitle}>Dane osobowe, które zbieramy</Text>
            <Text style={styles.section}>
                Dane osobowe to wszelkie informacje, które mogą zostać wykorzystane do identyfikacji użytkownika (samodzielnie lub w połączeniu z innymi danymi). Zbieramy następujące rodzaje danych osobowych:
            </Text>
            <Text style={styles.listItem}>• Imię i nazwisko</Text>
            <Text style={styles.listItem}>• Adres e-mail</Text>
            <Text style={styles.listItem}>• Adres pocztowy (w tym adres rozliczeniowy i dostawy)</Text>
            <Text style={styles.listItem}>• Informacje geolokalizacyjne (w tym monitorowanie pozycji GPS i prędkości)</Text>
            <Text style={styles.listItem}>• Numer telefonu</Text>
            <Text style={styles.listItem}>• Data urodzenia</Text>
            <Text style={styles.listItem}>• Informacje o pojeździe i sprzęcie</Text>
            <Text style={styles.listItem}>• Styl jazdy</Text>
            <Text style={styles.listItem}>• Płeć</Text>
            <Text style={styles.listItem}>• Cechy fizyczne (takie jak wymiary, rozmiary odzieży, butów, kasków itp.)</Text>
            <Text style={styles.listItem}>• Historia zamówień i zapisane przedmioty</Text>
            <Text style={styles.listItem}>• Informacje o płatnościach (w tym dane kart kredytowych i debetowych)</Text>
            <Text style={styles.listItem}>• Historia logowania i aktywności online</Text>
            <Text style={styles.listItem}>• Informacje z mediów społecznościowych i logowania zewnętrznego (np. dane z Facebooka)</Text>
            <Text style={styles.listItem}>• Adresy IP oraz inne unikalne identyfikatory urządzeń</Text>

            <Text style={styles.subtitle}>Zbieranie i przetwarzanie danych</Text>
            <Text style={styles.section}>
                Zbieramy dane osobowe na kilka sposobów: kiedy przekazujesz je nam bezpośrednio (np. podczas rejestracji konta, składania zamówienia lub kontaktu z obsługą klienta), oraz automatycznie, kiedy korzystasz z naszych usług. Dane zbierane automatycznie mogą obejmować:
            </Text>
            <Text style={styles.listItem}>• Adresy IP</Text>
            <Text style={styles.listItem}>• Typ przeglądarki, system operacyjny, czas dostępu, długość wizyty</Text>
            <Text style={styles.listItem}>• Strony przeglądane na naszej witrynie</Text>
            <Text style={styles.listItem}>• Informacje o tym, czy otworzyłeś wiadomość e-mail lub kliknąłeś link w wiadomości</Text>
            <Text style={styles.listItem}>• Dane z plików cookies i innych technologii śledzenia</Text>

            <Text style={styles.subtitle}>Monitorowanie urządzenia i przetwarzanie danych przez ChatGPT</Text>
            <Text style={styles.section}>
                Za Twoją zgodą możemy stale monitorować Twoje urządzenie, w tym śledzić pozycję GPS, prędkość, oraz inne dane związane z użytkowaniem naszych usług. Te informacje mogą być automatycznie przesyłane do systemu ChatGPT, aby poprawić jakość naszych usług, a także dostarczać spersonalizowane rekomendacje i wsparcie techniczne.
            </Text>

            <Text style={styles.subtitle}>Jak wykorzystujemy Twoje dane osobowe</Text>
            <Text style={styles.section}>
                Twoje dane osobowe są wykorzystywane w różnych celach, aby zapewnić lepszą obsługę oraz poprawić jakość usług, w tym:
            </Text>
            <Text style={styles.listItem}>• Przetwarzanie i realizacja zamówień</Text>
            <Text style={styles.listItem}>• Kontaktowanie się z Tobą w celach związanych z Twoim kontem, zamówieniami lub wsparciem technicznym</Text>
            <Text style={styles.listItem}>• Personalizowanie treści i ofert</Text>
            <Text style={styles.listItem}>• Ochrona przed oszustwami i nieuprawnionym dostępem</Text>
            <Text style={styles.listItem}>• Analizowanie i ulepszanie naszych usług</Text>
            <Text style={styles.listItem}>• Wyświetlanie spersonalizowanych reklam i treści na podstawie Twoich preferencji</Text>

            <Text style={styles.subtitle}>Udostępnianie danych osobowych</Text>
            <Text style={styles.section}>
                Twoje dane osobowe mogą być udostępniane w następujących sytuacjach:
            </Text>
            <Text style={styles.listItem}>• Naszym podmiotom powiązanym i usługodawcom w celu realizacji zamówień, dostarczania usług oraz poprawy jakości naszych produktów</Text>
            <Text style={styles.listItem}>• Organom ścigania lub innym instytucjom publicznym, gdy wymaga tego prawo</Text>
            <Text style={styles.listItem}>• W przypadku reorganizacji, połączenia, sprzedaży lub innej transakcji związanej z naszą działalnością</Text>
            <Text style={styles.listItem}>• Podmiotom trzecim, z którymi współpracujemy w celach marketingowych</Text>

            <Text style={styles.subtitle}>Pliki cookies i technologie śledzenia</Text>
            <Text style={styles.section}>
                Nasza strona internetowa i aplikacje korzystają z plików cookies oraz innych technologii śledzenia, aby dostarczać użytkownikom spersonalizowane treści i reklamy, a także poprawiać funkcjonalność naszych usług. Możesz zrezygnować z plików cookies, zmieniając ustawienia przeglądarki, jednak niektóre funkcje mogą przestać działać poprawnie.
            </Text>

            <Text style={styles.subtitle}>Twoje prawa zgodnie z RODO</Text>
            <Text style={styles.section}>
                Jeśli mieszkasz na terenie Unii Europejskiej, przysługują Ci następujące prawa w odniesieniu do Twoich danych osobowych:
            </Text>
            <Text style={styles.listItem}>• Prawo do dostępu do danych</Text>
            <Text style={styles.listItem}>• Prawo do ich sprostowania</Text>
            <Text style={styles.listItem}>• Prawo do usunięcia danych ("prawo do bycia zapomnianym")</Text>
            <Text style={styles.listItem}>• Prawo do ograniczenia przetwarzania</Text>
            <Text style={styles.listItem}>• Prawo do przenoszenia danych</Text>
            <Text style={styles.listItem}>• Prawo do sprzeciwu wobec przetwarzania danych</Text>
            <Text style={styles.listItem}>• Prawo do wycofania zgody na przetwarzanie danych w dowolnym momencie</Text>

            <Text style={styles.subtitle}>Bezpieczeństwo danych</Text>
            <Text style={styles.section}>
                Stosujemy odpowiednie środki techniczne i organizacyjne, aby chronić Twoje dane osobowe przed nieautoryzowanym dostępem, utratą, modyfikacją czy zniszczeniem. Pamiętaj jednak, że żadna metoda transmisji danych przez Internet nie jest w 100% bezpieczna.
            </Text>

            <Text style={styles.subtitle}>Okres przechowywania danych</Text>
            <Text style={styles.section}>
                Twoje dane osobowe będą przechowywane tak długo, jak jest to konieczne do realizacji celów określonych w niniejszej Polityce Prywatności, w zgodzie z obowiązującymi przepisami prawa.
            </Text>

            <Text style={styles.subtitle}>Zmiany w Polityce Prywatności</Text>
            <Text style={styles.section}>
                Zastrzegamy sobie prawo do wprowadzania zmian w Polityce Prywatności w dowolnym momencie. Wszelkie zmiany będą publikowane na naszej stronie internetowej. Zachęcamy do regularnego sprawdzania aktualizacji.
            </Text>

            <Text style={styles.subtitle}>Kontakt</Text>
            <Text style={styles.section}>
                Jeśli masz jakiekolwiek pytania dotyczące tej Polityki Prywatności lub sposobu, w jaki przetwarzamy Twoje dane osobowe, prosimy o kontakt na adres: kontakt@ravenroad.eu.
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    section: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 10,
        textAlign: 'justify',
    },
    listItem: {
        fontSize: 16,
        lineHeight: 24,
        marginLeft: 20,
        marginBottom: 5,
    },
});

export default PrivacyPolicy;
