
import React, { useState } from 'react';
import './RegisterPage.css';
// Task 1: Import urlConfig from config.js
import { urlConfig } from '../../config';
// Task 2: Import useAppContext from AuthContext.js
import { useAppContext } from '../../context/AuthContext';
// Task 3: Import useNavigate from react-router-dom
import { useNavigate } from 'react-router-dom';



function RegisterPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    // Task 4: Include a state for error message
    const [showerr, setShowerr] = useState('');

    // Task 5: Create local variables for navigate and setIsLoggedIn
    const navigate = useNavigate();
    const { setIsLoggedIn } = useAppContext();

    const handleRegister = async () => {
        setLoading(true);
        setShowerr('');
        setSuccess(null);
        try {
            const response = await fetch(`${urlConfig.backendUrl}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password
                })
            });
            // Task 1: Access data coming from fetch API
            const json = await response.json();
            if (json.authtoken) {
                // Task 2: Set user details
                sessionStorage.setItem('auth-token', json.authtoken);
                sessionStorage.setItem('name', firstName);
                sessionStorage.setItem('email', json.email);
                // Task 3: Set the state of user to logged in using useAppContext
                setIsLoggedIn(true);
                // Task 4: Navigate to the MainPage after logging in
                navigate('/app');
            } else if (json.error) {
                // Task 5: Set an error message if registration fails
                setShowerr(json.error);
            } else {
                setShowerr('Registration failed');
            }
        } catch (err) {
            setShowerr(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-10 col-lg-8">
                    <div className="register-card p-4 border rounded">
                        <h2 className="text-center mb-4 font-weight-bold">Register</h2>

                        {/* Task 6: Display error message to end user */}
                        {showerr && <div className="text-danger">{showerr}</div>}
                        {success && <div className="alert alert-success">{success}</div>}

                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <input
                                id="firstName"
                                type="text"
                                className="form-control"
                                placeholder="Enter your first name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                disabled={loading}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <input
                                id="lastName"
                                type="text"
                                className="form-control"
                                placeholder="Enter your last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                disabled={loading}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                id="email"
                                type="email"
                                className="form-control"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={loading}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                id="password"
                                type="password"
                                className="form-control"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={loading}
                            />
                        </div>

                        <button className="btn btn-primary w-100 mb-3" onClick={handleRegister} disabled={loading}>
                            {loading ? 'Registering...' : 'Register'}
                        </button>

                        <p className="mt-4 text-center">
                            Already a member? <a href="/app/login" className="text-primary">Login</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default RegisterPage;
