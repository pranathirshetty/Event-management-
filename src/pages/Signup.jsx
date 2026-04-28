import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUserPlus, FaUser, FaEnvelope, FaLock, FaArrowRight, FaCheck } from 'react-icons/fa';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [shake, setShake] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState('');
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const navigate = useNavigate();

    const checkPasswordStrength = (pwd) => {
        let strength = '';
        if (pwd.length < 6) strength = 'weak';
        else if (pwd.length < 10) strength = 'medium';
        else if (pwd.match(/[a-z]/) && pwd.match(/[A-Z]/) && pwd.match(/[0-9]/)) strength = 'strong';
        else strength = 'medium';
        setPasswordStrength(strength);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        checkPasswordStrength(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            if (name && email && password && confirmPassword && password === confirmPassword) {
                alert('Account created successfully!');
                navigate('/login');
            } else {
                setShake(true);
                setTimeout(() => setShake(false), 500);
                alert('Please fill out all fields correctly.');
            }
        }, 1500);
    };

    return (
        <div className="auth-container">
            <div className="auth-wrapper">
                <div className="auth-content">
                    <div className="auth-header">
                        <div className="auth-icon-wrapper signup">
                            <FaUserPlus className="auth-icon" />
                        </div>
                        <h2>Create Account</h2>
                        <p>Join our community of event enthusiasts</p>
                    </div>

                    <form className={`auth-form ${shake ? 'shake' : ''}`} onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Full Name</label>
                            <div className="input-group">
                                <span className="input-icon"><FaUser /></span>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    required
                                    className="auth-input"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Email Address</label>
                            <div className="input-group">
                                <span className="input-icon"><FaEnvelope /></span>
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
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    required
                                    className="auth-input"
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? '👁️' : '👁️‍🗨️'}
                                </button>
                            </div>
                            {password && (
                                <div className={`password-strength ${passwordStrength}`}>
                                    <div className="strength-bar"></div>
                                    <span className="strength-text">
                                        {passwordStrength.charAt(0).toUpperCase() + passwordStrength.slice(1)} password
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Confirm Password</label>
                            <div className="input-group">
                                <span className="input-icon"><FaLock /></span>
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    required
                                    className="auth-input"
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                                </button>
                            </div>
                            {confirmPassword && password === confirmPassword && (
                                <div className="password-match">
                                    <FaCheck className="match-icon" />
                                    <span>Passwords match</span>
                                </div>
                            )}
                        </div>

                        <div className="form-options">
                            <label className="checkbox-container">
                                <input
                                    type="checkbox"
                                    checked={agreedToTerms}
                                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                                    required
                                />
                                <span>I agree to the <Link to="/terms" className="terms-link">Terms and Conditions</Link></span>
                            </label>
                        </div>

                        <button type="submit" className={`btn-primary auth-btn ${isLoading ? 'loading' : ''}`} disabled={isLoading || !agreedToTerms}>
                            {isLoading ? (
                                <span className="btn-text">Creating account...</span>
                            ) : (
                                <span className="btn-text">
                                    Create Account <FaArrowRight className="btn-arrow" />
                                </span>
                            )}
                            {isLoading && <div className="btn-loader"></div>}
                        </button>
                    </form>

                    <div className="divider">
                        <span>Or sign up with</span>
                    </div>

                    <div className="social-login">
                        <button className="social-btn google">
                            Google
                        </button>
                        <button className="social-btn github">
                            GitHub
                        </button>
                    </div>

                    <p className="auth-link">
                        Already have an account? <Link to="/login" className="auth-highlight">Login here</Link>
                    </p>
                </div>

                <div className="auth-sidebar">
                    <div className="sidebar-content">
                        <h3>Start Your Journey</h3>
                        <ul className="benefits-list">
                            <li>🎯 Discover 50+ amazing events</li>
                            <li>🎪 Attend hackathons and workshops</li>
                            <li>🏆 Build your portfolio and network</li>
                            <li>📚 Access exclusive resources</li>
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

export default Signup;