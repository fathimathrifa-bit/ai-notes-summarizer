
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [isError, setIsError] = useState(false);

  const handleRegister = async () => {
    try {
      await axios.post("https://ai-notes-backend-ynth.onrender.com", { email, password });
      setMsg("Registered! Please login.");
      setIsError(false);
    } catch (err) {
      setMsg(err.response?.data?.detail || "Registration failed");
      setIsError(true);
    }
  };

  return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"#111827"}}>
      <div style={{backgroundColor:"#1f2937",padding:"2rem",borderRadius:"1rem",width:"350px"}}>
        <h1 style={{color:"white",marginBottom:"0.5rem"}}>🗒️ AI Notes Summarizer</h1>
        <p style={{color:"#9ca3af",marginBottom:"1.5rem"}}>Create your account</p>
        {msg && <p style={{color: isError ? "#f87171" : "#4ade80",marginBottom:"1rem"}}>{msg}</p>}
        <input style={{width:"100%",padding:"0.75rem",marginBottom:"0.75rem",borderRadius:"0.5rem",backgroundColor:"#374151",color:"white",border:"none",boxSizing:"border-box"}}
          placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" style={{width:"100%",padding:"0.75rem",marginBottom:"1rem",borderRadius:"0.5rem",backgroundColor:"#374151",color:"white",border:"none",boxSizing:"border-box"}}
          placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={handleRegister}
          style={{width:"100%",padding:"0.75rem",backgroundColor:"#16a34a",color:"white",border:"none",borderRadius:"0.5rem",cursor:"pointer",fontWeight:"bold",fontSize:"1rem"}}>
          Register
        </button>
        <p style={{color:"#9ca3af",marginTop:"1rem",textAlign:"center"}}>
          Have account? <Link to="/" style={{color:"#60a5fa"}}>Login here</Link>
        </p>
      </div>
    </div>
  );
}