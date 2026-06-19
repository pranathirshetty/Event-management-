import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, auth } from '../firebase/config';
import { collection, getDocs, doc, addDoc, updateDoc, deleteDoc, query, where, increment } from 'firebase/firestore';

const EventContext = createContext(null);

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const eventsCol = collection(db, 'events');
      const snapshot = await getDocs(eventsCol);
      if (!snapshot.empty) {
        const eventsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEvents(eventsList);
      } else {
        setEvents([]);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const fetchRegistrations = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'registrations'));
      const regs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRegistrations(regs);
    } catch (error) {
      console.error("Error fetching registrations:", error);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      await fetchEvents();
      await fetchRegistrations();
      setLoading(false);
    };
    initializeData();
  }, []);

  const createEvent = async (eventData) => {
    try {
      const newEvent = {
        ...eventData,
        registrations: 0,
        createdAt: new Date().toISOString(),
        createdBy: auth.currentUser ? auth.currentUser.uid : null
      };
      const docRef = await addDoc(collection(db, 'events'), newEvent);
      setEvents(prev => [...prev, { id: docRef.id, ...newEvent }]);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const deleteEvent = async (id) => {
    try {
      await deleteDoc(doc(db, 'events', id));
      setEvents(prev => prev.filter(e => e.id !== id));
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const getEventById = (id) => {
    // loose equality in case id comes from URL parameter as string but is stored as number
    return events.find((e) => e.id == id);
  };

  const registerForEvent = async (eventId, studentData) => {
    try {
      const event = getEventById(eventId);
      if (!event) return { success: false, message: 'Event not found' };

      // Simple max capacity check if one exists
      if (event.maxCapacity && event.registrations >= event.maxCapacity) {
        return { success: false, message: 'Event is fully booked' };
      }

      // Check if already registered
      const q = query(collection(db, 'registrations'), 
          where('eventId', '==', eventId), 
          where('email', '==', studentData.email)
      );
      const existing = await getDocs(q);
      if (!existing.empty) {
        console.error("Already registered. Docs found:", existing.docs.map(d => d.data()));
        return { success: false, message: `You are already registered for this event! (Found ${existing.size} existing records in database)` };
      }

      // Create registration
      const newReg = {
        eventId,
        ...studentData,
        timestamp: new Date().toISOString()
      };
      const docRef = await addDoc(collection(db, 'registrations'), newReg);
      setRegistrations(prev => [...prev, { id: docRef.id, ...newReg }]);

      // Update event count locally (no need to write to Firestore events collection)
      setEvents(prev => prev.map(e => e.id == eventId ? { ...e, registrations: e.registrations + 1 } : e));

      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Derived properties dynamically mapping the registration counts
  const dynamicEvents = events.map(event => ({
    ...event,
    registrations: registrations.filter(r => String(r.eventId) === String(event.id)).length
  }));

  const totalEvents = dynamicEvents.length;
  const totalRegistrations = registrations.length;
  const upcomingEvents = dynamicEvents.filter(e => new Date(e.date) >= new Date()).length;
  const categories = [...new Set(dynamicEvents.map(e => e.category))];

  // Helper for admin dashboard
  const getRegistrationsForEvent = (eventId) => {
    return registrations.filter(r => String(r.eventId) === String(eventId));
  };

  return (
    <EventContext.Provider value={{ 
      events: dynamicEvents, registrations, createEvent, deleteEvent, getEventById, registerForEvent, loading,
      totalEvents, totalRegistrations, upcomingEvents, categories, getRegistrationsForEvent,
      addEvent: createEvent // map addEvent to createEvent for backwards compatibility
    }}>
      {!loading && children}
    </EventContext.Provider>
  );
};

export default EventContext;
