import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <img src={event.image || 'https://via.placeholder.com/300x150'} alt={event.title} />
      <div className="event-content">
        <span className="event-category">{event.category}</span>
        <h3>{event.title}</h3>
        <p className="event-date">{new Date(event.date).toLocaleDateString()}</p>
        <p className="event-desc">{event.description.substring(0, 60)}...</p>
        <Link to={`/event/${event.id}`} className="btn-primary">View Details</Link>
      </div>
    </div>
  );
};

export default EventCard;
