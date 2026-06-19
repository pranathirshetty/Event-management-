import React, { useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import { FiArrowLeft, FiCheckCircle, FiCalendar, FiMapPin, FiDownload } from 'react-icons/fi';
import QRCode from 'react-qr-code';
import emailjs from '@emailjs/browser';

const RegisterEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getEventById, registerForEvent } = useEvents();
  const { user } = useAuth();
  const event = getEventById(id);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [qrValue, setQrValue] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const qrRef = useRef();

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    studentId: '',
    department: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (formData.fullName && formData.email && formData.department) {
      // Register via EventContext (persists to Firestore)
      const result = await registerForEvent(id, {
        fullName: formData.fullName,
        email: formData.email,
        studentId: formData.studentId || 'N/A',
        department: formData.department,
      });

      if (!result.success) {
        setErrorMsg(result.message);
        return;
      }

      // Create a payload for the QR code
      const ticketInfo = {
        eventId: event.id,
        eventName: event.title,
        name: formData.fullName,
        studentId: formData.studentId || 'N/A',
        timestamp: new Date().toISOString()
      };

      const qrDataStr = JSON.stringify(ticketInfo);
      setQrValue(qrDataStr);

      // Generate a public URL for the QR code image so it can be embedded in the email
      const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(qrDataStr)}`;

      // Send the email using EmailJS
      emailjs
        .send(
          'service_33euagx',
          'template_q7lu3ds',
          {
            to_name: formData.fullName,
            to_email: formData.email,
            event_name: event.title,
            event_date: new Date(event.date).toLocaleDateString(),
            registration_time: new Date().toLocaleString(),
            qr_data: qrDataStr,
            qr_image_url: qrImageUrl,
          },
          {
            publicKey: 'nZwZpCXzr63LS7H1C',
          }
        )
        .then(
          () => {
            console.log('Email sent successfully!');
          },
          (error) => {
            console.error('Failed to send email...', error);
            alert(`EmailJS Error: Failed to send email. Please check your EmailJS dashboard or verify the keys. (${error?.text || 'Unknown Error'})`);
          }
        );

      setIsSubmitted(true);
    }
  };

  const handleFinish = () => {
    navigate('/student');
  };

  if (!event) return <div className="page-container">Loading...</div>;

  if (isSubmitted) {
    return (
      <div className="auth-container">
        <div className="auth-card" style={{ textAlign: 'center', padding: '3rem', maxWidth: '500px' }}>
          <FiCheckCircle style={{ fontSize: '4.5rem', color: '#48bb78', marginBottom: '1.5rem' }} />
          <h2 style={{ marginBottom: '1rem', color: '#2d3748' }}>Registration Successful!</h2>
          <p style={{ color: 'var(--secondary)', fontSize: '1.05rem', marginBottom: '1.5rem' }}>
            Your spot for <strong>{event.title}</strong> has been confirmed. Below is your entry ticket. <br /><br />
            An email with your ticket details has been sent to <strong>{formData.email}</strong>.
          </p>

          <div style={{ background: '#fff', padding: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '12px', display: 'inline-block', marginBottom: '1.5rem' }}>
            <QRCode ref={qrRef} value={qrValue} size={180} />
            <p style={{ marginTop: '1rem', fontWeight: 'bold', fontSize: '0.9rem', color: '#4a5568' }}>Scan for Entry</p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Button onClick={() => window.print()} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FiDownload /> Save Ticket
            </Button>
            <Button onClick={handleFinish}>Back to Home</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container" style={{ padding: '2rem 1rem' }}>
      <div className="auth-card" style={{ maxWidth: '650px', width: '100%' }}>
        <Link to={`/student/event/${event.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-color)', textDecoration: 'none', fontWeight: '600', marginBottom: '1.5rem' }}>
          <FiArrowLeft /> Back to Details
        </Link>

        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#1a202c' }}>Secure Your Spot</h2>

        <div style={{ background: '#f8fafc', padding: '1rem 1.5rem', borderRadius: '8px', borderLeft: '4px solid var(--primary-color)', marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#2d3748' }}>{event.title}</h3>
          <div style={{ display: 'flex', gap: '1.5rem', color: '#4a5568', fontSize: '0.95rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <FiCalendar /> {new Date(event.date).toLocaleDateString()}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <FiMapPin /> Main Campus
            </span>
          </div>
        </div>

        {errorMsg && (
          <div className="auth-error" style={{ marginBottom: '1rem' }}>
            <span>⚠️ {errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name *</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="e.g., Jane Doe" />
          </div>

          <div className="form-group">
            <label>College Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. student@university.edu"
              required
              readOnly
              style={{ backgroundColor: '#f3f4f6', cursor: 'not-allowed', color: '#6b7280' }}
              title="Email is locked to your account"
            />
          </div><div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div className="form-group" style={{ flex: '1 1 200px' }}>
              <label>Student ID Number</label>
              <input type="text" name="studentId" value={formData.studentId} onChange={handleChange} placeholder="e.g., CS2024-001" />
            </div>

            <div className="form-group" style={{ flex: '1 1 200px' }}>
              <label>Department *</label>
              <select name="department" value={formData.department} onChange={handleChange} required>
                <option value="">Select your department</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Information Tech">Information Technology</option>
                <option value="Electronics">Electronics</option>
                <option value="Mechanical">Mechanical</option>
                <option value="Civil">Civil</option>
                <option value="Business">Business / Commerce</option>
                <option value="Arts">Arts</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <Button type="submit" className="w-100" style={{ padding: '0.9rem', fontSize: '1.1rem' }}>
              Confirm Registration
            </Button>
            <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.85rem', color: '#718096' }}>
              By registering, you agree to follow the event's code of conduct.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterEvent;