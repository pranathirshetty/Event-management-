import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Button from "../components/Button";
import { FiArrowLeft, FiStar, FiCheckCircle } from "react-icons/fi";

const Feedback = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) return alert("Please select a rating.");
    // Simulate submitting feedback
    setIsSubmitted(true);
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="auth-container">
        <div className="auth-card" style={{ textAlign: "center", padding: "3rem", maxWidth: "500px" }}>
          <FiCheckCircle style={{ fontSize: "4.5rem", color: "#48bb78", marginBottom: "1.5rem" }} />
          <h2 style={{ marginBottom: "1rem", color: "#2d3748" }}>Thank You!</h2>
          <p style={{ color: "var(--secondary)", fontSize: "1.05rem", marginBottom: "1.5rem" }}>
            Your feedback helps us improve future events.
          </p>
          <div className="spinner" style={{ width: "30px", height: "30px", margin: "0 auto", borderWidth: "3px" }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container" style={{ padding: "2rem 1rem" }}>
      <div className="auth-card" style={{ maxWidth: "650px", width: "100%" }}>
        <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--primary-color)", textDecoration: "none", fontWeight: "600", marginBottom: "1.5rem" }}>
          <FiArrowLeft /> Back to Home
        </Link>
        
        <h2 style={{ fontSize: "2rem", marginBottom: "0.5rem", color: "#1a202c" }}>Event Feedback</h2>
        <p style={{ color: "#718096", marginBottom: "2rem" }}>We would love to hear your thoughts on the event.</p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "2rem", textAlign: "center" }}>
            <label style={{ display: "block", marginBottom: "1rem", fontWeight: "600", fontSize: "1.1rem" }}>Rate your experience</label>
            <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem" }}>
              {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;
                return (
                  <label key={index}>
                    <input 
                      type="radio" 
                      name="rating" 
                      value={ratingValue} 
                      onClick={() => setRating(ratingValue)}
                      style={{ display: "none" }}
                    />
                    <FiStar 
                      size={40} 
                      color={ratingValue <= (hover || rating) ? "#ecc94b" : "#e2e8f0"}
                      fill={ratingValue <= (hover || rating) ? "#ecc94b" : "none"}
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(0)}
                      style={{ cursor: "pointer", transition: "color 0.2s" }}
                    />
                  </label>
                );
              })}
            </div>
          </div>
          
          <div className="form-group" style={{ marginBottom: "2rem" }}>
            <label style={{ fontWeight: "600" }}>Additional Comments</label>
            <textarea 
              rows="5"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="What did you like? What could be improved?"
              style={{ width: "100%", padding: "1rem", borderRadius: "8px", border: "1px solid #cbd5e0", resize: "vertical", marginTop: "0.5rem" }}
            ></textarea>
          </div>

          <Button type="submit" className="w-100" style={{ padding: "0.9rem", fontSize: "1.1rem" }}>
            Submit Feedback
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;

