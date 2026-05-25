
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const sidebar = {backgroundColor:"#1f2937",width:"220px",padding:"1.5rem",display:"flex",flexDirection:"column",gap:"1rem",minHeight:"100vh"};
const link = {color:"#d1d5db",textDecoration:"none"};

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("https://ai-notes-backend-ynth.onrender.com",
      { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setHistory(res.data))
      .catch(() => {});
  }, []);

  return (
    <div style={{display:"flex",minHeight:"100vh",backgroundColor:"#111827"}}>
      <div style={sidebar}>
        <h2 style={{color:"white",marginBottom:"1rem"}}>🗒️ Notes AI</h2>
        <Link to="/dashboard" style={link}>🏠 Dashboard</Link>
        <Link to="/summarize" style={link}>📝 Summarize</Link>
      </div>
      <div style={{flex:1,padding:"2rem"}}>
        <h1 style={{color:"white",marginBottom:"1.5rem"}}>📚 Summary History</h1>
        {history.length === 0
          ? <p style={{color:"#9ca3af"}}>No history yet. Summarize something first!</p>
          : history.map((item, i) => (
            <div key={i} style={{backgroundColor:"#1f2937",padding:"1.25rem",borderRadius:"1rem",marginBottom:"1rem"}}>
              <p style={{color:"#60a5fa",fontWeight:"bold",marginBottom:"0.5rem"}}>📄 Notes:</p>
              <p style={{color:"#9ca3af",fontSize:"0.875rem",marginBottom:"0.75rem"}}>{item.notes?.substring(0,150)}...</p>
              <p style={{color:"#4ade80",fontWeight:"bold",marginBottom:"0.5rem"}}>✅ Summary:</p>
              <p style={{color:"#e5e7eb",fontSize:"0.875rem"}}>{item.summary}</p>
              <p style={{color:"#6b7280",fontSize:"0.75rem",marginTop:"0.75rem"}}>{new Date(item.createdAt).toLocaleString()}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
}