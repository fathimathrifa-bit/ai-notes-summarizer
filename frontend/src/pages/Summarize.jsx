
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const sidebar = {backgroundColor:"#1f2937",width:"220px",padding:"1.5rem",display:"flex",flexDirection:"column",gap:"1rem",minHeight:"100vh"};
const link = {color:"#d1d5db",textDecoration:"none"};

export default function Summarize() {
  const [notes, setNotes] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSummarize = async () => {
    if (!notes.trim()) return;
    setLoading(true); setError(""); setSummary("");
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:8000/summarize",
        { notes },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSummary(res.data.summary);
    } catch { setError("Something went wrong. Try again."); }
    setLoading(false);
  };

  return (
    <div style={{display:"flex",minHeight:"100vh",backgroundColor:"#111827"}}>
      <div style={sidebar}>
        <h2 style={{color:"white",marginBottom:"1rem"}}>🗒️ Notes AI</h2>
        <Link to="/dashboard" style={link}>🏠 Dashboard</Link>
        <Link to="/history" style={link}>📚 History</Link>
      </div>
      <div style={{flex:1,padding:"2rem"}}>
        <h1 style={{color:"white",marginBottom:"1.5rem"}}>📝 Summarize Your Notes</h1>
        <textarea
          style={{width:"100%",height:"180px",backgroundColor:"#1f2937",color:"white",padding:"1rem",borderRadius:"0.5rem",border:"none",fontSize:"1rem",resize:"none",boxSizing:"border-box"}}
          placeholder="Paste your long notes here..."
          value={notes} onChange={e => setNotes(e.target.value)}
        />
        <br/>
        <button onClick={handleSummarize} disabled={loading}
          style={{marginTop:"1rem",padding:"0.75rem 2rem",backgroundColor: loading ? "#374151" : "#2563eb",color:"white",border:"none",borderRadius:"0.5rem",cursor:"pointer",fontWeight:"bold",fontSize:"1rem"}}>
          {loading ? "⏳ Summarizing..." : "🚀 Summarize"}
        </button>
        {error && <p style={{color:"#f87171",marginTop:"1rem"}}>{error}</p>}
        {summary && (
          <div style={{marginTop:"1.5rem",backgroundColor:"#1f2937",padding:"1.5rem",borderRadius:"1rem"}}>
            <p style={{color:"#4ade80",fontWeight:"bold",marginBottom:"0.75rem"}}>✅ Summary:</p>
            <p style={{color:"#e5e7eb",whiteSpace:"pre-wrap"}}>{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
}