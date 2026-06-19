import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import Button from '../components/Button';
import { FaPlus } from 'react-icons/fa';

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    category: 'Technology',
    description: '',
    image: '',
  });
  const navigate = useNavigate();
  const { createEvent } = useEvents();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.title && formData.date) {
      await createEvent({
        ...formData,
        image: formData.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      });
      navigate('/admin');
    }
  };

  return (
    <div className="page-container flex-center">
      <div className="form-card w-100 max-w-lg">
        <h2><FaPlus style={{ marginRight: '0.5rem' }} /> Create New Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Event Title *</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required placeholder="e.g., Tech Innovation Hackathon" />
          </div>
          <div className="form-group">
            <label>Event Date *</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              <option value="Technology">Technology</option>
              <option value="Cultural">Cultural</option>
              <option value="Sports">Sports</option>
              <option value="Academic">Academic</option>
              <option value="Music">Music</option>
              <option value="Business">Business</option>
              <option value="Art">Art</option>
            </select>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" rows="4" value={formData.description} onChange={handleChange} placeholder="Describe the event..."></textarea>
          </div>
          <div className="form-group">
            <label>Image URL (optional)</label>
            <input type="url" name="image" value={formData.image} onChange={handleChange} placeholder="https://images.unsplash.com/..." />
          </div>
          <Button type="submit" className="w-100">Create Event</Button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;