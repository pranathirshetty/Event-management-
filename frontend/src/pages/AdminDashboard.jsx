import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import {
  FaCalendarAlt, FaUsers, FaChartLine, FaTrophy, FaTrash, FaPlus,
  FaSearch, FaFilter, FaQrcode, FaChevronDown, FaChevronUp, FaTimes,
  FaExclamationTriangle, FaEye
} from 'react-icons/fa';

const AdminDashboard = () => {
  const {
    events, totalEvents, totalRegistrations, upcomingEvents, categories,
    addEvent, deleteEvent, getRegistrationsForEvent, registrations, getEventById
  } = useEvents();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [expandedEventId, setExpandedEventId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: '', date: '', category: 'Technology', description: '',
    image: '',
  });

  const filteredEvents = events.filter(event => {
    const matchesSearch = (event.title || '').toLowerCase().includes((searchTerm || '').toLowerCase());
    const matchesCategory = filterCategory === 'All' || event.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.date) return;
    addEvent({
      ...newEvent,
      image: newEvent.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    });
    setNewEvent({ title: '', date: '', category: 'Technology', description: '', image: '' });
    setShowAddModal(false);
  };

  const handleDeleteEvent = (eventId) => {
    deleteEvent(eventId);
    setDeleteConfirm(null);
    if (expandedEventId === eventId) setExpandedEventId(null);
  };

  const toggleRegistrations = (eventId) => {
    setExpandedEventId(expandedEventId === eventId ? null : eventId);
  };

  return (
    <div className="page-container admin-dashboard-page">
      {/* Dashboard Hero */}
      <div className="dashboard-hero animate-in">
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
            <p className="stat-number count-up">{totalEvents}</p>
            <p className="stat-caption">Events created in the portal</p>
          </div>
        </div>
        <div className="dashboard-stat-card card-indigo">
          <div className="stat-icon">
            <FaUsers />
          </div>
          <div className="stat-content">
            <p className="stat-title">Total Registrations</p>
            <p className="stat-number count-up">{totalRegistrations}</p>
            <p className="stat-caption">Across all listed events</p>
          </div>
        </div>
        <div className="dashboard-stat-card card-green">
          <div className="stat-icon">
            <FaChartLine />
          </div>
          <div className="stat-content">
            <p className="stat-title">Upcoming Events</p>
            <p className="stat-number count-up">{upcomingEvents}</p>
            <p className="stat-caption">Scheduled from today onward</p>
          </div>
        </div>
        <div className="dashboard-stat-card card-purple">
          <div className="stat-icon">
            <FaTrophy />
          </div>
          <div className="stat-content">
            <p className="stat-title">Categories</p>
            <p className="stat-number count-up">{categories.length}</p>
            <p className="stat-caption">Event categories active</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="admin-quick-actions">
        <button className="quick-action-btn primary" onClick={() => setShowAddModal(true)} id="add-event-btn">
          <FaPlus />
          <span>Add New Event</span>
        </button>
        <Link to="/admin/attendance" className="quick-action-btn accent" id="scan-qr-btn">
          <FaQrcode />
          <span>Scan QR Code</span>
        </Link>
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
                id="admin-search"
              />
            </div>
            <select
              className="category-filter"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              id="admin-category-filter"
            >
              <option value="All">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h3>No events found</h3>
            <p>Try adjusting your search or create a new event.</p>
          </div>
        ) : (
          <div className="admin-events-list">
            {filteredEvents.map((event) => {
              const eventRegs = getRegistrationsForEvent(event.id);
              const isExpanded = expandedEventId === event.id;
              const isUpcoming = new Date(event.date) >= new Date();

              return (
                <div key={event.id} className={`admin-event-row ${isExpanded ? 'expanded' : ''}`}>
                  <div className="event-row-main">
                    <div className="event-row-image">
                      <img
                        src={event.image || 'https://via.placeholder.com/60x60'}
                        alt={event.title}
                      />
                    </div>
                    <div className="event-row-info">
                      <h4>{event.title}</h4>
                      <div className="event-row-meta">
                        <span className="meta-item">
                          <FaCalendarAlt />
                          {new Date(event.date).toLocaleDateString()}
                        </span>
                        <span className="table-category-pill">{event.category}</span>
                        <span className={`status-badge ${isUpcoming ? 'active' : 'ended'}`}>
                          {isUpcoming ? 'Active' : 'Ended'}
                        </span>
                      </div>
                    </div>
                    <div className="event-row-stats">
                      <div className="reg-count-badge">
                        <FaUsers />
                        <span>{event.registrations}</span>
                      </div>
                    </div>
                    <div className="event-row-actions">
                      <button
                        className="table-action-btn view"
                        onClick={() => toggleRegistrations(event.id)}
                        title="View registrations"
                        style={{ padding: '0.4rem 0.8rem' }}
                      >
                        <FaEye />
                        <span>{isExpanded ? 'Hide' : 'View'} Registrants</span>
                        {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                      </button>
                      <button
                        className="table-action-btn delete"
                        onClick={() => setDeleteConfirm(event.id)}
                        title="Delete event"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>

                  {/* Expanded Registration List */}
                  {isExpanded && (
                    <div className="event-registrations-panel">
                      <div className="regs-panel-header">
                        <h4>
                          <FaUsers /> Registered Participants ({eventRegs.length})
                        </h4>
                      </div>
                      {eventRegs.length === 0 ? (
                        <p className="no-regs-text">No one has registered for this event yet.</p>
                      ) : (
                        <div className="regs-table-wrapper">
                          <table className="regs-table">
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Student ID</th>
                                <th>Department</th>
                                <th>Registered At</th>
                              </tr>
                            </thead>
                            <tbody>
                              {eventRegs.map((reg, idx) => (
                                <tr key={reg.id || idx}>
                                  <td>{idx + 1}</td>
                                  <td className="reg-name">{reg.fullName || reg.name || 'N/A'}</td>
                                  <td>{reg.email}</td>
                                  <td>{reg.studentId || 'N/A'}</td>
                                  <td>{reg.department || 'N/A'}</td>
                                  <td>{new Date(reg.timestamp).toLocaleString()}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
      {/* Global Registrations Table */}
      <div className="dashboard-section" style={{ marginTop: '2rem' }}>
        <div className="dashboard-table-header">
          <div className="table-header-left">
            <h3>
              <FaUsers className="table-icon" />
              All Student Registrations
            </h3>
            <span className="table-count">{registrations.length} total</span>
          </div>
        </div>

        {registrations.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">👥</div>
            <h3>No registrations yet</h3>
            <p>When students register for events, they will appear here.</p>
          </div>
        ) : (
          <div className="regs-table-wrapper" style={{ marginTop: '1rem' }}>
            <table className="regs-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Student Name</th>
                  <th>Event Registered</th>
                  <th>Email</th>
                  <th>Student ID</th>
                  <th>Department</th>
                  <th>Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {[...registrations].reverse().map((reg, idx) => {
                  const event = getEventById(reg.eventId);
                  return (
                    <tr key={reg.id || idx}>
                      <td>{idx + 1}</td>
                      <td className="reg-name">{reg.fullName || reg.name || 'N/A'}</td>
                      <td>
                        <span className="table-category-pill" style={{ background: 'var(--primary)', color: 'white' }}>
                          {event ? event.title : 'Unknown Event'}
                        </span>
                      </td>
                      <td>{reg.email}</td>
                      <td>{reg.studentId || 'N/A'}</td>
                      <td>{reg.department || 'N/A'}</td>
                      <td>{new Date(reg.timestamp).toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3><FaPlus /> Create New Event</h3>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleAddEvent} className="modal-form">
              <div className="form-group">
                <label>Event Title *</label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  placeholder="e.g., Tech Innovation Hackathon"
                  required
                  id="new-event-title"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Event Date *</label>
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    required
                    id="new-event-date"
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={newEvent.category}
                    onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                    id="new-event-category"
                  >
                    <option value="Technology">Technology</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Sports">Sports</option>
                    <option value="Academic">Academic</option>
                    <option value="Music">Music</option>
                    <option value="Business">Business</option>
                    <option value="Art">Art</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  rows="3"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  placeholder="Describe the event..."
                  id="new-event-description"
                ></textarea>
              </div>
              <div className="form-group">
                <label>Image URL (optional)</label>
                <input
                  type="url"
                  value={newEvent.image}
                  onChange={(e) => setNewEvent({ ...newEvent, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  id="new-event-image"
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" id="create-event-submit">
                  <FaPlus /> Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal-content confirm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-icon">
              <FaExclamationTriangle />
            </div>
            <h3>Delete Event?</h3>
            <p>This will permanently remove the event and all its registrations. This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setDeleteConfirm(null)}>
                Cancel
              </button>
              <button className="btn-danger" onClick={() => handleDeleteEvent(deleteConfirm)} id="confirm-delete-btn">
                <FaTrash /> Delete Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;