import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
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
    const [errorMsg, setErrorMsg] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('');
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const navigate = useNavigate();
    const { signup, isAuthenticated, user } = useAuth();

    React.useEffect(() => {
        if (isAuthenticated && user) {
            navigate(user.role === 'admin' ? '/admin' : '/student', { replace: true });
        }
    }, [isAuthenticated, user, navigate]);

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
        setErrorMsg('');

        try {
            if (password !== confirmPassword) {
                setIsLoading(false);
                setShake(true);
                setErrorMsg('Passwords do not match.');
                setTimeout(() => setShake(false), 500);
                return;
            }

            const result = await signup(name, email, password);
            setIsLoading(false);

            if (result.success) {
                navigate('/login');
            } else {
                setShake(true);
                setErrorMsg(result.message);
                setTimeout(() => setShake(false), 500);
            }
        } catch (error) {
            setIsLoading(false);
            setErrorMsg('An error occurred during signup.');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-glass-card">
                <div className="auth-left">
                    <div className="auth-left-content">
                        <div className="auth-logo">
                            <span className="logo-icon">⚡</span>
                            <span className="logo-text">Campus<span>Events</span></span>
                        </div>
                        <div className="auth-header">
                            <div className="auth-icon-wrapper signup">
                                <FaUserPlus className="auth-icon" />
                            </div>
                            <h2>Create Account</h2>
                            <p className="auth-subtitle">Join as a student to explore campus events</p>
                        </div>

                        {errorMsg && (
                            <div className="auth-error">
                                <span>⚠️ {errorMsg}</span>
                            </div>
                        )}

                        <form className={`auth-form ${shake ? 'shake' : ''}`} onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Full Name</label>
                                <div className="input-group">
                                    <span className="input-icon"><FaUser /></span>
                                    <input type="text" placeholder="Enter your name" value={name} onChange={e => setName(e.target.value)} required className="auth-input" id="signup-name" />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Email Address</label>
                                <div className="input-group">
                                    <span className="input-icon"><FaEnvelope /></span>
                                    <input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} required className="auth-input" id="signup-email" />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <div className="input-group">
                                    <span className="input-icon"><FaLock /></span>
                                    <input type={showPassword ? 'text' : 'password'} placeholder="Create a password" value={password} onChange={handlePasswordChange} required className="auth-input" id="signup-password" />
                                    <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
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
                                    <input type={showConfirmPassword ? 'text' : 'password'} placeholder="Confirm your password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="auth-input" id="signup-confirm-password" />
                                    <button type="button" className="password-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
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
                                    <input type="checkbox" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} required />
                                    <span>I agree to the Terms and Conditions</span>
                                </label>
                            </div>

                            <button type="submit" className={`auth-submit-btn ${isLoading ? 'loading' : ''}`} disabled={isLoading || !agreedToTerms} id="signup-submit">
                                {isLoading ? (
                                    <span className="btn-text">Creating account...</span>
                                ) : (
                                    <span className="btn-text">
                                        Create Student Account <FaArrowRight className="btn-arrow" />
                                    </span>
                                )}
                                {isLoading && <div className="btn-loader"></div>}
                            </button>
                        </form>

                        <p className="auth-link">
                            Already have an account? <Link to="/login" className="auth-highlight">Login here</Link>
                        </p>
                    </div>
                </div>

                <div className="auth-right">
                    <div className="auth-right-content">
                        <h3>Start Your Journey</h3>
                        <p>Create a student account to discover and register for amazing campus events.</p>
                        <ul className="benefits-list">
                            <li><span className="benefit-icon">🎯</span> Discover 50+ amazing events</li>
                            <li><span className="benefit-icon">🎪</span> Attend hackathons and workshops</li>
                            <li><span className="benefit-icon">🏆</span> Build your portfolio and network</li>
                            <li><span className="benefit-icon">📚</span> Access exclusive resources</li>
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

export default Signup;