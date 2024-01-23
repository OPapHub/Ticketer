import React, { useState } from 'react';
import { setUser, getUser } from '../../userConfig';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSamePassword, setIsSamePassword] = useState(false);
    const [vrongInfo, setVrongInfo] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);
    const navigate = useNavigate();
    const handleEmailChange = (event) => {
        const inputValue = event.target.value;
        setEmail(inputValue);

        // Validate email using a regular expression
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(inputValue);
        setIsValidEmail(isValid);
    };

    const handlePasswordChange = (event) => {
        const inputValue = event.target.value;
        setPassword(inputValue);
    }

    const handlePasswordConfirmation = (event) => {
        const inputValue = event.target.value;
        inputValue === password ? setIsSamePassword(true) : setIsSamePassword(false);
    }

    const handleClick = () => {
        // Check if information is incorrect

        setEmail('');
        setPassword('');
        document.getElementById('passwordC').value = '';

        setVrongInfo(true);

        // Reset the bounce animation after a short delay
        setTimeout(() => {
            setVrongInfo(false);
        }, 500);

    };

    const showNotification = (message) => {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            document.body.removeChild(notification);
        }, 3000); // Remove the notification after 3 seconds
    };


    const handleSubmit = async (event) => {
        const url = 'https://localhost:7023/api/User/register'; // Replace with your actual API endpoint

        const requestBody = {
            email: email,
            password: password,
            confirmPassword: password
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {                
                showNotification("User already exists");
                handleClick();
                return;
            }

            const data = await response.json();
            setUser(data);            
            navigate('/');

        } catch (error) {
            console.error('Error during POST request:', error.message);
        }
    }

    return (
        <div className="login">
            <div className="login_wrapper">
                <div className="login_wd">
                    <div className="login_left">
                        <div className="login_form">
                            <div className="login_left_header">
                                <a href="/" className="link">
                                    <img src="logo.ico" alt="Ticketer" />
                                </a>
                                <p className="login_heading">Register your personal profile</p>
                            </div>
                            <div className="login_step1">
                                <p className="login_step_info">Here you will find all your purchases and personal information</p>
                                <div className="login_wrap_input_description_login_label">
                                    <p className="login_input_description">E-mail address</p>
                                    <div className="login_wrap_input_submit">
                                        <label className="login_label">
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={handleEmailChange}
                                                placeholder="userName@example.com"
                                                className="login_input login_email_input"></input>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="login_step1">
                                <div className="login_wrap_input_description_login_label">
                                    <p className="login_input_description">Password</p>
                                    <div className="login_wrap_input_submit">
                                        <label className="login_label">
                                            <input
                                                type="password"
                                                value={password}
                                                onChange={handlePasswordChange}
                                                placeholder="Password"
                                                className="login_input login_email_input"></input>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="login_step1">
                                <div className="login_wrap_input_description_login_label">
                                    <p className="login_input_description">Password Confirmation</p>
                                    <div className="login_wrap_input_submit">
                                        <label className="login_label">
                                            <input
                                                type="password"
                                                id="passwordC"
                                                onChange={handlePasswordConfirmation}
                                                placeholder="Password"
                                                className="login_input login_email_input"></input>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div
                                className={`login_email_submit ${isValidEmail && isSamePassword ? 'active' : ''} ${vrongInfo ? 'bounce-animation' : ''}`}
                                onClick={handleSubmit}
                            > Continue </div>                            

                            <div className="wrap-link">
                                <span>Return to </span>
                                <a href="/" className="link">Ticketer</a>
                            </div>
                        </div>
                    </div>
                    <div className="login_right"></div>
                </div>
            </div>
        </div>
    )
}
export default Register;