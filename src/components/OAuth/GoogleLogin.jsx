import React from 'react';

const Login = () => {
    const googleLogin = () => {
        window.location.href = 'http://localhost:5000/auth/google';
    };

    return (
        <button onClick={googleLogin}>Zaloguj się przez Google</button>
    );
};

export default Login;
