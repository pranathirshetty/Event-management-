import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaLock, FaArrowRight, FaGoogle, FaGithub, FaUserGraduate, FaUserShield } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [shake, setShake] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMsg('');

        try {
            if (!email || !password) {
                setShake(true);
                setTimeout(() => setShake(false), 500);
                setErrorMsg('Please enter valid credentials.');
                setIsLoading(false);
                return;
            }

            const result = await login(email, password, role);
            if (result.success) {
                navigate('/');
            } else {
                setShake(true);
                setTimeout(() => setShake(false), 500);
                setErrorMsg(result.message);
                setIsLoading(false);
            }
        } catch (error) {
            setErrorMsg('An error occurred during login.');
            setIsLoading(false);
        }
    };

    const togglePassword = () => setShowPassword(!showPassword);

    return (
        <div className="auth-container">
            <div className="auth-glass-card">
                <div className="auth-left">
                    <div className="auth-left-content">
                        <div className="auth-header">
                            <div className="auth-icon-wrapper">
                                <FaUser className="auth-icon" />
                            </div>
                            <h2>Welcome Back!</h2>
                            <p>Login to access EventFlow</p>
                        </div>

                    <form className={`auth-form ${shake ? 'shake' : ''}`} onSubmit={handleSubmit}>
                        {errorMsg && <div className="auth-error">{errorMsg}</div>}

                        <div className="role-selector">
                            <button 
                                type="button" 
                                className={`role-option ${role === 'student' ? 'active' : ''}`}
                                onClick={() => setRole('student')}
                            >
                                <FaUserGraduate className="role-option-icon" /> Student
                            </button>
                            <button 
                                type="button" 
                                className={`role-option ${role === 'admin' ? 'active' : ''}`}
                                onClick={() => setRole('admin')}
                            >
                                <FaUserShield className="role-option-icon" /> Admin
                            </button>
                        </div>

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

                        <button type="submit" className={`auth-submit-btn ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
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
                </div>

                <div className="auth-right">
                    <div className="auth-right-content">
                        <h3>Join Our Community</h3>
                        <ul className="benefits-list">
                            <li><span className="benefit-icon">🎉</span> Access to 50+ amazing events</li>
                            <li><span className="benefit-icon">👥</span> Connect with 1000+ students</li>
                            <li><span className="benefit-icon">🏆</span> Win prizes and certificates</li>
                            <li><span className="benefit-icon">📈</span> Grow your professional network</li>
                        </ul>
                        <div className="auth-decoration">
                            <div className="deco-ring"></div>
                            <div className="deco-ring"></div>
                            <div className="deco-ring"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;