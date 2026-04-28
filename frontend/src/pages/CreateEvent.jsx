import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    category: '',
    description: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.title && formData.date) {
      alert('Event created successfully!');
      navigate('/admin');
    } else {
      alert('Please fill out all required fields.');
    }
  };

  return (
    <div className="page-container flex-center">
      <div className="form-card w-100 max-w-lg">
        <h2>Create New Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Event Title *</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Event Date *</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              <option value="">Select a Category</option>
              <option value="Technology">Technology</option>
              <option value="Cultural">Cultural</option>
              <option value="Sports">Sports</option>
            </select>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" rows="4" value={formData.description} onChange={handleChange}></textarea>
          </div>
          <Button type="submit" className="w-100">Create Event</Button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;