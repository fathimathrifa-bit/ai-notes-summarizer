
import { Link } from "react-router-dom";

const sidebar = {backgroundColor:"#1f2937",width:"220px",padding:"1.5rem",display:"flex",flexDirection:"column",gap:"1rem",minHeight:"100vh"};
const link = {color:"#d1d5db",textDecoration:"none"};

export default function Profile() {
  return (
    <div style={{display:"flex",minHeight:"100vh",backgroundColor:"#111827"}}>
      <div style={sidebar}>
        <h2 style={{color:"white",marginBottom:"1rem"}}>🗒️ Notes AI</h2>
        <Link to="/dashboard" style={link}>🏠 Dashboard</Link>
        <Link to="/summarize" style={link}>📝 Summarize</Link>
        <Link to="/history" style={link}>📚 History</Link>
      </div>
      <div style={{flex:1,padding:"2rem"}}>
        <h1 style={{color:"white",marginBottom:"1.5rem"}}>👤 Profile</h1>
        <div style={{backgroundColor:"#1f2937",padding:"1.5rem",borderRadius:"1rem",width:"350px"}}>
          <p style={{color:"#9ca3af",marginBottom:"0.25rem"}}>App</p>
          <p style={{color:"white",fontWeight:"bold",marginBottom:"1rem"}}>🗒️ AI Notes Summarizer</p>
          <p style={{color:"#9ca3af",marginBottom:"0.25rem"}}>AI Model</p>
          <p style={{color:"white",fontWeight:"bold",marginBottom:"1rem"}}>🤗 facebook/bart-large-cnn</p>
          <p style={{color:"#9ca3af",marginBottom:"0.25rem"}}>Status</p>
          <p style={{color:"#4ade80",fontWeight:"bold"}}>✅ Logged In</p>
        </div>
      </div>
    </div>
  );
}