import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from "../../components/navbar/Navbar";
import './addGroup.css';
import { useUser } from '../../contexts/UserContext';
import BackButton from '../../components/backBt/BackButton';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';


export default function AddGroup() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [error, setError] = useState({ title: '', description: '' });
    const navigate = useNavigate();
    const { user, setUser } = useUser();
    const { username } = useParams();
    const [image, setImage] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const actualBtn = document.getElementById('image');
        const fileChosen = document.getElementById('file-chosen');

        if (actualBtn && fileChosen) {
            actualBtn.addEventListener('change', function () {
                fileChosen.textContent = this.files[0]?.name || 'Nie wybrano pliku';
                setError((prevError) => ({ ...prevError, image: '' })); // Resetuje błąd obrazu po wyborze pliku
            });
        }

        return () => {
            if (actualBtn) {
                actualBtn.removeEventListener('change', function () {
                    fileChosen.textContent = 'Nie wybrano pliku';
                });
            }
        };
    }, []);

  
    const handleTitleChange = (e) => {
        const value = e.target.value;
        if (value.length > 100) {
            setError({ ...error, title: 'Tytuł nie może przekraczać 100 znaków!' });
        } else {
            setError({ ...error, title: '' });
        }
        setTitle(value);
    };

    
    const handleDescriptionChange = (e) => {
        const value = e.target.value;
        if (value.length > 1000) {
            setError({ ...error, description: 'Opis nie może przekraczać 1000 znaków!' });
        } else {
            setError({ ...error, description: '' });
        }
        setDescription(value);
    };

   
    const handlePrivateChange = (e) => {
        setIsPrivate(e.target.checked);
    };
    const handleVisibleChange = (e) => {
        setIsVisible(e.target.checked);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (error.title || error.description) {
            alert('Proszę poprawić błędy przed wysłaniem formularza.');
            return;
        }

        if (!image) {
            setError({ ...error, image: 'Zdjęcie grupy jest wymagane.' });
            return;
        }

        // Przygotowanie danych do wysłania z użyciem FormData
        const formData = new FormData();
        formData.append('name', title);
        formData.append('description', description);
        formData.append('private', isPrivate ? 1 : 0);
        formData.append('visible', isVisible ? 0 : 1);
        if (image) formData.append('image', image);

        try {
            const response = await fetch('http://localhost:5000/addGroup', {
                method: 'POST',
                credentials: 'include',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Błąd przy dodawaniu grupy');
            }

            alert('Grupa została dodana pomyślnie!');
            navigate(`/profile/${user.username}`);
        } catch (error) {
            console.error('Error:', error);
            alert('Wystąpił problem podczas dodawania grupy.');
        }
    };


    return (
        <div className="App">
            <div className="gradient__bg">
                <Navbar />
                <BackButton />
                <form onSubmit={handleSubmit} className="ab add-route-form-main">
                    <div className="add-route-form field">
                        <input
                            placeholder=""
                            className="form__field"
                            type="text"
                            id="title"
                            value={title}
                            onChange={handleTitleChange}
                            maxLength={50}
                            required
                        />
                        <label htmlFor="title" className="form__label">Nazwa grupy:</label>
                        {error.title && <p className="error-message">{error.title}</p>}
                    </div>
                    <div className="add-route-text field">
                        <textarea
                            placeholder=""
                            className="r-desc form__field"
                            id="description"
                            value={description}
                            onChange={handleDescriptionChange}
                            maxLength={1000}
                            required
                        />
                        <label htmlFor="description" className="form__label">Opis grupy:</label>
                        {error.description && <p className="error-message">{error.description}</p>}
                    </div>
                    <div className="g-checkbox-field">
                        <input
                            type="checkbox"
                            id="private"
                            checked={isPrivate}
                            onChange={handlePrivateChange}
                        />
                        <label htmlFor="private" className="g-checkbox-label">Grupa prywatna</label>
                    </div>
                    <div className="g-checkbox-field">
                        <input
                            type="checkbox"
                            id="visible"
                            checked={isVisible}
                            onChange={handleVisibleChange}
                        />
                        <label htmlFor="visible" className="g-checkbox-label">Grupa niewidoczna</label>
                    </div>
                    <div className="e-image">
                        <div className="r-form-group">
                            <input
                                type="file"
                                id="image"
                                onChange={(e) => setImage(e.target.files[0])}
                                accept="image/*"
                                hidden
                                name="imageName"
                            />
                            <label className="r-input-label" htmlFor="image">Zdjęcie grupy</label>
                            <span id="file-chosen">Nie wybrano pliku</span>
                            {error.image && <p className="error-message e-image-error">{error.image}</p>}
                        </div>
                    </div>
                    <button className="edit r-add-bt" role="button" type="submit">
                        <span className="text">Dodaj grupę</span>
                    </button>
                </form>
            </div>
        </div>
    );
}




