import { X } from "../icons";
import { useUser } from '../../contexts/UserContext';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import "../../pages/profile/profile.css";
import {
    Adapt,
    Button,
    Dialog,
    Fieldset,
    Input,
    Label,
    Sheet,
    Unspaced,
    XStack,
} from 'tamagui';
import { useEffect, useState } from "react";

export function DialogDemo() {
    return <DialogInstance />;
}

function DialogInstance() {
    const { username } = useParams();
    const navigate = useNavigate();  // Dodano hook useNavigate
    const { user, setUser } = useUser();
    const [updatedUser, setUpdatedUser] = useState(() => ({
        name: user?.username || username || "",
        email: user?.email || "",
        avatar: user?.avatar || "",
    }));

    useEffect(() => {
        if (user) {
            console.log("Initializing updatedUser with:", user);
            setUpdatedUser({
                name: user.username || "",
                email: user.email || "",
                avatar: user.avatar || "",
            });
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUpdatedUser((prevUser) => ({
                ...prevUser,
                avatar: file,
            }));
            console.log("Selected file:", file.name);
        }
    };

    const handleSaveChanges = async () => {
        try {
            const formData = new FormData();
            formData.append('username', updatedUser.name);
            formData.append('email', updatedUser.email);
            if (updatedUser.avatar) {
                formData.append('avatar', updatedUser.avatar);
            }

            const response = await axios.put(`http://localhost:5000/user/${user.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });

            console.log("Response from server:", response.data);

            if (response.data.user) {
                setUser(response.data.user);
            }

            // Po pomyślnym zapisaniu, nawiguj do profilu użytkownika
            navigate(`/profile/${updatedUser.name}`);

            // Odśwież stronę, aby załadować nowe zdjęcie profilowe
            window.location.reload();
        } catch (error) {
            console.error('Failed to update user:', error);
        }
    };

    return (
        <Dialog modal>
            <Dialog.Trigger asChild>
                <button className="edit" role="button"><span className="text">Edytuj profil</span></button>
            </Dialog.Trigger>
            <Adapt when="sm" platform="touch">
                <Sheet animation="medium" zIndex={200000} modal dismissOnSnapToBottom>
                    <Sheet.Frame padding="$4" gap="$4">
                        <Adapt.Contents/>
                    </Sheet.Frame>
                    <Sheet.Overlay
                        animation="lazy"
                        enterStyle={{opacity: 0}}
                        exitStyle={{opacity: 0}}
                    />
                </Sheet>
            </Adapt>
            <Dialog.Portal>
                <Dialog.Overlay
                    key="overlay"
                    animation="slow"
                    opacity={0.5}
                    enterStyle={{opacity: 0}}
                    exitStyle={{opacity: 0}}
                />
                <Dialog.Content
                    bordered
                    elevate
                    key="content"
                    animateOnly={['transform', 'opacity']}
                    animation={[
                        'quicker',
                        {
                            opacity: {
                                overshootClamping: true,
                            },
                        },
                    ]}
                    enterStyle={{x: 0, y: -20, opacity: 0, scale: 0.9}}
                    exitStyle={{x: 0, y: 10, opacity: 0, scale: 0.95}}
                    gap="$4"
                >
                    <Dialog.Title>Edytuj profil</Dialog.Title>
                    <Fieldset className="editProfileLabel" gap="$10" horizontal>
                        <Label width={300} justifyContent="flex-end" htmlFor="name">
                            Nazwa użytkownika
                        </Label>
                        <input
                            className="edit-profile-input"
                            flex={1}
                            id="name"
                            placeholder="Wpisz nową nazwę użytkownika"
                            type="text"
                            name="name"
                            value={updatedUser.name}
                            onChange={handleInputChange}
                        />
                    </Fieldset>
                    <Fieldset className="editProfileLabel" gap="$10" horizontal>
                        <Label width={300} justifyContent="flex-end" htmlFor="email">
                            Email
                        </Label>
                        <input
                            className="edit-profile-input"
                            flex={1}
                            id="email"
                            placeholder="Wpisz nowy email"
                            type="text"
                            name="email"
                            value={updatedUser.email}
                            onChange={handleInputChange}
                        />
                    </Fieldset>
                    <Fieldset className="editProfileLabel" gap="$10" horizontal>
                        <div className="center-container">
                            <input
                                type="file"
                                name="avatar"
                                onChange={handleFileChange}
                                className="avatar-input"
                                id="file-upload"
                            />
                            <label htmlFor="file-upload" className="custom-file-upload">
                                Zmień profilowe
                            </label>
                        </div>
                    </Fieldset>

                    <XStack alignSelf="flex-end" gap="$4">
                        <Button theme="active" onPress={handleSaveChanges}>Zapisz zmiany</Button>
                        <Dialog.Close displayWhenAdapted asChild>
                            <Button theme="muted">Anuluj</Button>
                        </Dialog.Close>
                    </XStack>

                    <Unspaced>
                        <Dialog.Close asChild>
                            <Button
                                position="absolute"
                                top="$3"
                                right="$3"
                                size="$2"
                                circular
                                icon={X}
                            />
                        </Dialog.Close>
                    </Unspaced>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog>
    );
}
