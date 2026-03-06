import React from 'react';
import "./Welcome.css"
import Cookies from 'js-cookie';
const Welcome = () => {
    const username = Cookies.get('email');
    return <h1>Welcome, {username}!</h1>;
};

export default Welcome;