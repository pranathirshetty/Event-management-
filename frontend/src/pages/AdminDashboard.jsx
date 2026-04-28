import React, { useState, useEffect } from 'react';
import { dummyEvents } from '../data/dummyEvents';
import { FaCalendarAlt, FaUsers, FaChartLine, FaTrophy, FaEdit, FaTrash, FaPlus, FaSearch, FaFilter } from 'react-icons/fa';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [animateStats, setAnimateStats] = useState(false);

  useEffect(() => {
    setEvents(dummyEvents);
    setTimeout(() => setAnimateStats(true), 500);
  }, []);

  const totalEvents = events.length;
  const totalRegistrations = events.reduce((acc, curr) => acc + curr.registrations, 0);
  const upcomingEvents = events.filter((event) => new Date(event.date) >= new Date()).length;
  const categories = [...new Set(events.map(event => event.category))];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || event.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const recentEvents = [...events].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  return (
    <div className="page-container admin-dashboard-page">
      {/* Dashboard Hero */}
      <div className={`dashboard-hero ${animateStats ? 'animate-in' : ''}`}>
        <div className="hero-content-left">
          <div className="dashboard-kicker">
            <FaChartLine className="kicker-icon" />
            Administration Panel
          </div>
          <h1>Event Dashboard</h1>
          <p className="dashboard-subtitle">Track events, participation, and operational activity in one place.</p>
        </div>
        <div className="hero-content-right">
          <div className="dashboard-badge">
            <div className="pulse-dot"></div>
            Live Overview
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="dashboard-stats-grid">
        <div className="dashboard-stat-card card-blue">
          <div className="stat-icon">
            <FaCalendarAlt />
          </div>
          <div className="stat-content">
            <p className="stat-title">Total Events</p>
            <p className={`stat-number ${animateStats ? 'count-up' : ''}`}>{totalEvents}</p>
            <p className="stat-caption">Events created in the portal</p>
          </div>
        </div>
        <div className="dashboard-stat-card card-indigo">
          <div className="stat-icon">
            <FaUsers />
          </div>
          <div className="stat-content">
            <p className="stat-title">Total Registrations</p>
            <p className={`stat-number ${animateStats ? 'count-up' : ''}`}>{totalRegistrations}</p>
            <p className="stat-caption">Across all listed events</p>
          </div>
        </div>
        <div className="dashboard-stat-card card-green">
          <div className="stat-icon">
            <FaChartLine />
          </div>
          <div className="stat-content">
            <p className="stat-title">Upcoming Events</p>
            <p className={`stat-number ${animateStats ? 'count-up' : ''}`}>{upcomingEvents}</p>
            <p className="stat-caption">Scheduled from today onward</p>
          </div>
        </div>
        <div className="dashboard-stat-card card-purple">
          <div className="stat-icon">
            <FaTrophy />
          </div>
          <div className="stat-content">
            <p className="stat-title">Categories</p>
            <p className={`stat-number ${animateStats ? 'count-up' : ''}`}>{categories.length}</p>
            <p className="stat-caption">Event categories active</p>
          </div>
        </div>
      </div>

      {/* Recent Events Section */}
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <h3>
            <FaCalendarAlt className="section-icon" />
            Recent Events
          </h3>
          <span className="event-count">{recentEvents.length} latest</span>
        </div>
        <div className="recent-events-grid">
          {recentEvents.map((event, index) => (
            <div key={event.id} className="recent-event-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="event-image">
                <img src={event.image || 'https://via.placeholder.com/300x150'} alt={event.title} />
                <div className="event-category-badge">{event.category}</div>
              </div>
              <div className="event-info">
                <h4>{event.title}</h4>
                <div className="event-meta">
                  <span className="event-date">
                    <FaCalendarAlt />
                    {new Date(event.date).toLocaleDateString()}
                  </span>
                  <span className="event-registrations">
                    <FaUsers />
                    {event.registrations} registered
                  </span>
                </div>
              </div>
              <div className="event-actions">
                <button className="action-btn edit">
                  <FaEdit />
                </button>
                <button className="action-btn delete">
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Events Table */}
      <div className="dashboard-section">
        <div className="dashboard-table-header">
          <div className="table-header-left">
            <h3>
              <FaFilter className="table-icon" />
              All Events
            </h3>
            <span className="table-count">{filteredEvents.length} total</span>
          </div>
          <div className="table-header-right">
            <div className="search-container">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search events..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="category-filter"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <button className="btn-primary create-btn">
              <FaPlus />
              Create Event
            </button>
          </div>
        </div>

        <table className="events-table dashboard-events-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Date</th>
              <th>Category</th>
              <th>Registrations</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map((event) => (
              <tr key={event.id} className="table-row">
                <td data-label="ID">#{event.id}</td>
                <td data-label="Title" className="title-cell">
                  <div className="event-title-cell">
                    <img
                      src={event.image || 'https://via.placeholder.com/50x50'}
                      alt={event.title}
                      className="event-thumbnail"
                    />
                    <span>{event.title}</span>
                  </div>
                </td>
                <td data-label="Date">{new Date(event.date).toLocaleDateString()}</td>
                <td data-label="Category">
                  <span className="table-category-pill">{event.category}</span>
                </td>
                <td data-label="Registrations">
                  <span className="registrations-count">{event.registrations}</span>
                </td>
                <td data-label="Status">
                  <span className={`status-badge ${new Date(event.date) >= new Date() ? 'active' : 'ended'}`}>
                    {new Date(event.date) >= new Date() ? 'Active' : 'Ended'}
                  </span>
                </td>
                <td data-label="Action">
                  <div className="action-buttons">
                    <button className="table-action-btn edit">
                      <FaEdit />
                    </button>
                    <button className="table-action-btn delete">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;