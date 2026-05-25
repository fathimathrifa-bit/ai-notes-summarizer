
import { useNavigate, Link } from "react-router-dom";

const sidebar = {backgroundColor:"#1f2937",width:"220px",padding:"1.5rem",display:"flex",flexDirection:"column",gap:"1rem",minHeight:"100vh"};
const link = {color:"#d1d5db",textDecoration:"none",fontSize:"1rem"};

export default function Dashboard() {
  const navigate = useNavigate();
  const logout = () => { localStorage.removeItem("token"); navigate("/"); };

  return (
    <div style={{display:"flex",minHeight:"100vh",backgroundColor:"#111827"}}>
      <div style={sidebar}>
        <h2 style={{color:"white",marginBottom:"1rem"}}>🗒️ Notes AI</h2>
        <Link to="/summarize" style={link}>📝 Summarize</Link>
        <Link to="/history" style={link}>📚 History</Link>
        <Link to="/profile" style={link}>👤 Profile</Link>
        <button onClick={logout} style={{color:"#f87171",background:"none",border:"none",cursor:"pointer",textAlign:"left",marginTop:"auto",fontSize:"1rem"}}>🚪 Logout</button>
      </div>
      <div style={{flex:1,padding:"2rem"}}>
        <h1 style={{color:"white",marginBottom:"0.5rem"}}>Welcome! 👋</h1>
        <p style={{color:"#9ca3af",marginBottom:"2rem"}}>Paste your notes and get an instant AI summary.</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1.5rem"}}>
          {[["📝","Summarize","Paste notes, get summary"],["📚","History","View past summaries"],["🤖","AI Powered","Powered by Hugging Face"]].map(([icon,title,desc])=>(
            <div key={title} style={{backgroundColor:"#1f2937",padding:"1.5rem",borderRadius:"1rem"}}>
              <p style={{fontSize:"2rem"}}>{icon}</p>
              <p style={{color:"white",fontWeight:"bold",marginTop:"0.5rem"}}>{title}</p>
              <p style={{color:"#9ca3af",fontSize:"0.875rem"}}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}