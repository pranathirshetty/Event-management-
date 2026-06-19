import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useEvents } from '../context/EventContext';

const EventDetails = () => {
  const { id } = useParams();
  const { getEventById } = useEvents();
  const event = getEventById(id);

  if (!event) return <div className="page-container">Loading...</div>;

  return (
    <div className="page-container">
      <div className="breadcrumb">
        <Link to="/student">&larr; Back to Events</Link>
      </div>
      <div className="event-details-layout">
        <img src={event.image || 'https://via.placeholder.com/600x300'} alt={event.title} className="event-details-img" />
        <div className="event-info">
          <span className="event-category-badge">{event.category}</span>
          <h2>{event.title}</h2>
          <p className="event-meta"><strong>Date:</strong> {new Date(event.date).toDateString()}</p>
          <p className="event-meta"><strong>Registrations:</strong> {event.registrations}</p>
          <div className="event-desc-box">
            <h3>Description</h3>
            <p>{event.description}</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <Link to={`/student/register/${event.id}`} className="btn-primary register-btn" style={{ flex: 1, display: 'inline-block', textAlign: 'center' }}>
              Register Now
            </Link>
            <Link to={`/student/feedback/${event.id}`} className="btn-secondary feedback-btn" style={{ flex: 1, display: 'inline-block', textAlign: 'center', background: '#edf2f7', color: '#2d3748', padding: '0.8rem 1.5rem', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
              Leave Feedback
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;