import React, { useState, useEffect } from 'react';
import EventCard from '../components/EventCard';
import { dummyEvents } from '../data/dummyEvents';
import { Link } from 'react-router-dom';
import { FaRocket, FaUsers, FaCalendarAlt, FaStar } from 'react-icons/fa';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    // Simulate fetching data
    setEvents(dummyEvents);
    setTimeout(() => setFadeIn(true), 100);
  }, []);

  const categories = ['All', 'Technology', 'Cultural', 'Sports', 'Academic', 'Music', 'Business', 'Art'];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || event.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-beautiful">
        <div className="hero-overlay">
          <div className={`hero-content ${fadeIn ? 'fade-in' : ''}`}>
            <div className="hero-badge">🚀 Welcome to Campus Events</div>
            <h1>Discover Amazing Campus Events</h1>
            <p>Your one-stop platform for the most exciting college hackathons, fests, and workshops.</p>
            <div className="search-bar-container">
              <input
                type="text"
                placeholder="Search for events..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn-primary search-btn">
                <FaRocket className="btn-icon" />
                Search
              </button>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number-large">50+</div>
                <div className="stat-label">Events</div>
              </div>
              <div className="stat-item">
                <div className="stat-number-large">1000+</div>
                <div className="stat-label">Students</div>
              </div>
              <div className="stat-item">
                <div className="stat-number-large">15+</div>
                <div className="stat-label">Organizations</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <div className="page-container">
          <div className="section-header">
            <h2>Why Choose Us?</h2>
            <div className="title-underline"></div>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <FaCalendarAlt />
              </div>
              <h3>Easy Registration</h3>
              <p>Quick and simple sign-up process for all events with just a few clicks.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FaUsers />
              </div>
              <h3>Community Driven</h3>
              <p>Connect with thousands of students and grow your professional network.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FaStar />
              </div>
              <h3>Premium Events</h3>
              <p>Access to top-quality hackathons, workshops, and cultural events.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="page-container">
        {/* Category Filter */}
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category}
              className={`category-pill ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Dynamic Events Grid */}
        <div className="section-header">
          <h2>{searchTerm || activeCategory !== 'All' ? 'Search Results' : 'Trending Events'}</h2>
          <div className="title-underline"></div>
        </div>

        {filteredEvents.length > 0 ? (
          <div className={`events-grid ${fadeIn ? 'fade-in' : ''}`}>
            {filteredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h3>No events found matching your criteria.</h3>
            <p>Try adjusting your search or selecting a different category.</p>
          </div>
        )}
      </div>

      {/* Call to action block */}
      <div className="cta-section">
        <div className="cta-content">
          <div className="cta-badge">🎯 Ready to create amazing experiences?</div>
          <h2>Want to host your own event?</h2>
          <p>Join the organizational committee and manage incredible experiences for thousands of students.</p>
          <Link to="/login" className="btn-outline cta-btn">
            Join as Organizer
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;