import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate(); // Create navigate function

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/api/v1/login', { email, password });
            console.log(response.data);
            // Assuming the server responds with a success message and a token
            const { success, message, token } = response.data;

            if (success) {
                // Set the token as a cookie or store it in localStorage as per your preference
                document.cookie = `token=${token}`;

                // Redirect the user based on their role
                if (message.role === 1) {
                    navigate('/GroundWorker'); // Redirect to admin dashboard
                }else if(message.role === 2){
                    navigate('/OperationManager');
                } else if (message.role === 3) {
                    navigate('/CaseManager'); // Redirect to user dashboard
                }

                console.log('Login successful!');
            } else {
                setError('Invalid email or password.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <div>
                <label>Email:</label>
                <input type="text" value={email} onChange={handleEmailChange} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={handlePasswordChange} />
            </div>
            {error && <div>{error}</div>}
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
