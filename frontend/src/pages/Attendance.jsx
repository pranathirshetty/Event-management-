import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Scanner } from "@yudiel/react-qr-scanner";
import Button from "../components/Button";
import { FiArrowLeft, FiCheckCircle, FiXCircle } from "react-icons/fi";

const Attendance = () => {
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);
  const [attendedList, setAttendedList] = useState([]);

  const handleScan = (text) => {
    if (text) {
      try {
        const studentInfo = JSON.parse(text[0].rawValue);
        if (studentInfo && studentInfo.eventId) {
            if (!attendedList.find(s => s.studentId === studentInfo.studentId && s.eventId === studentInfo.eventId)) {
              setAttendedList([studentInfo, ...attendedList]);
            }
            setScanResult(studentInfo);
            setError(null);
            
            // Auto hide success after 3 secs
            setTimeout(() => setScanResult(null), 3000);
        } else {
            throw new Error("Invalid QR code format");
        }
      } catch (err) {
        setError("Invalid QR Code provided.");
        setTimeout(() => setError(null), 3000);
      }
    }
  };

  return (
    <div className="page-container" style={{ padding: "2rem 1rem", maxWidth: "800px", margin: "0 auto" }}>
      <Link to="/admin" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--primary-color)", textDecoration: "none", fontWeight: "600", marginBottom: "1.5rem" }}>
        <FiArrowLeft /> Back to Dashboard
      </Link>
      
      <h2 style={{ marginBottom: "1.5rem", color: "#1a202c" }}>QR Attendance Scanner</h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
        {/* Scanner Column */}
        <div style={{ background: "#fff", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
            <h3 style={{ marginBottom: "1rem", fontSize: "1.1rem" }}>Scan Participant QR</h3>
            <div style={{ borderRadius: "8px", overflow: "hidden", border: "2px solid #e2e8f0" }}>
              <Scanner 
                  onScan={handleScan}
                  onError={(e) => console.log(e)}
              />
            </div>
            
            {scanResult && (
                <div style={{ marginTop: "1rem", padding: "1rem", background: "#f0fff4", color: "#22543d", borderRadius: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem", borderBottom: "1px solid #c6f6d5", paddingBottom: "0.5rem" }}>
                        <FiCheckCircle size={20} />
                        <strong style={{ fontSize: "1.1rem" }}>Verified Check-in!</strong>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem", fontSize: "0.95rem" }}>
                        <div><strong>Name:</strong> {scanResult.name}</div>
                        <div><strong>Student ID:</strong> {scanResult.studentId}</div>
                        <div><strong>Event:</strong> {scanResult.eventName}</div>
                        {scanResult.timestamp && <div><strong>Reg. Date:</strong> {new Date(scanResult.timestamp).toLocaleString()}</div>}
                    </div>
                </div>
            )}
            
            {error && (
                <div style={{ marginTop: "1rem", padding: "1rem", background: "#fff5f5", color: "#c53030", borderRadius: "8px", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <FiXCircle size={20} />
                    <span>{error}</span>
                </div>
            )}
        </div>

        {/* List Column */}
        <div style={{ background: "#fff", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <h3 style={{ fontSize: "1.1rem", margin: 0 }}>Recent Check-ins</h3>
                <span style={{ background: "var(--primary-color)", color: "white", padding: "0.2rem 0.6rem", borderRadius: "12px", fontSize: "0.8rem", fontWeight: "bold" }}>
                    {attendedList.length}
                </span>
            </div>
            
            {attendedList.length === 0 ? (
                <p style={{ color: "#718096", fontSize: "0.95rem", fontStyle: "italic", textAlign: "center", padding: "2rem 0" }}>
                    No check-ins yet. Scan a ticket to begin.
                </p>
            ) : (
                <ul style={{ listStyle: "none", padding: 0, margin: 0, maxHeight: "400px", overflowY: "auto" }}>
                    {attendedList.map((participant, idx) => (
                        <li key={idx} style={{ padding: "0.8rem", borderBottom: "1px solid #edf2f7" }}>
                            <div style={{ fontWeight: "600", color: "#2d3748" }}>{participant.name}</div>
                            <div style={{ fontSize: "0.85rem", color: "#718096" }}>
                                {participant.studentId} � {participant.eventName}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
      </div>
    </div>
  );
};

export default Attendance;

