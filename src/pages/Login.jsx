import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaLock, FaArrowRight, FaGoogle, FaGithub } from 'react-icons/fa';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [shake, setShake] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            if (email && password) {
                navigate('/');
            } else {
                setShake(true);
                setTimeout(() => setShake(false), 500);
                alert('Please enter valid credentials.');
            }
        }, 1500);
    };

    const togglePassword = () => setShowPassword(!showPassword);

    return (
        <div className="auth-container">
            <div className="auth-wrapper">
                <div className="auth-content">
                    <div className="auth-header">
                        <div className="auth-icon-wrapper">
                            <FaUser className="auth-icon" />
                        </div>
                        <h2>Welcome Back!</h2>
                        <p>Login to access amazing campus events</p>
                    </div>

                    <form className={`auth-form ${shake ? 'shake' : ''}`} onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Email Address</label>
                            <div className="input-group">
                                <span className="input-icon"><FaUser /></span>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    className="auth-input"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <div className="input-group">
                                <span className="input-icon"><FaLock /></span>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                    className="auth-input"
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={togglePassword}
                                >
                                    {showPassword ? '👁️' : '👁️‍🗨️'}
                                </button>
                            </div>
                        </div>

                        <div className="form-options">
                            <label className="checkbox-container">
                                <input type="checkbox" />
                                <span>Remember me</span>
                            </label>
                            <Link to="/forgot-password" className="forgot-link">
                                Forgot Password?
                            </Link>
                        </div>

                        <button type="submit" className={`btn-primary auth-btn ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
                            {isLoading ? (
                                <span className="btn-text">Logging in...</span>
                            ) : (
                                <span className="btn-text">
                                    Login <FaArrowRight className="btn-arrow" />
                                </span>
                            )}
                            {isLoading && <div className="btn-loader"></div>}
                        </button>
                    </form>

                    <div className="divider">
                        <span>Or continue with</span>
                    </div>

                    <div className="social-login">
                        <button className="social-btn google">
                            <FaGoogle className="social-icon" />
                            Google
                        </button>
                        <button className="social-btn github">
                            <FaGithub className="social-icon" />
                            GitHub
                        </button>
                    </div>

                    <p className="auth-link">
                        Don't have an account? <Link to="/signup" className="auth-highlight">Sign up here</Link>
                    </p>
                </div>

                <div className="auth-sidebar">
                    <div className="sidebar-content">
                        <h3>Join Our Community</h3>
                        <ul className="benefits-list">
                            <li>🎉 Access to 50+ campus events</li>
                            <li>👥 Connect with 1000+ students</li>
                            <li>🏆 Win prizes and certificates</li>
                            <li>📈 Grow your professional network</li>
                        </ul>
                        <div className="auth-decoration">
                            <div className="decoration-circle"></div>
                            <div className="decoration-circle"></div>
                            <div className="decoration-circle"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;