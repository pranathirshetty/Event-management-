import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// The ONE and only admin account email
const ADMIN_EMAIL = 'abc@gmail.com';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Map firebase user to our session user structure
        const role = firebaseUser.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase() ? 'admin' : 'student';
        setUser({
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || 'Student',
          email: firebaseUser.email,
          role: role
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = async (name, email, password) => {
    try {
      if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
        return { success: false, message: 'Admin account cannot be created via signup.' };
      }
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Update display name
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: name });
      }
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const login = async (email, password, role) => {
    try {
      const emailLower = email.toLowerCase();
      const adminLower = ADMIN_EMAIL.toLowerCase();

      // Role enforcement:
      if (role === 'admin' && emailLower !== adminLower) {
        return { success: false, message: 'Invalid credentials or role mismatch.' };
      }
      if (role === 'student' && emailLower === adminLower) {
        return { success: false, message: 'Admins cannot login as students.' };
      }

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      const actualRole = firebaseUser.email?.toLowerCase() === adminLower ? 'admin' : 'student';
      
      const sessionUser = {
        uid: firebaseUser.uid,
        name: firebaseUser.displayName || 'Student',
        email: firebaseUser.email,
        role: actualRole
      };

      // Set user synchronously to avoid race conditions with React Router redirects
      setUser(sessionUser);

      return { 
        success: true, 
        user: sessionUser
      };
    } catch (error) {
      return { success: false, message: 'Invalid credentials. ' + error.message };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
