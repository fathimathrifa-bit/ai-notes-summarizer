
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:8000/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"#111827"}}>
      <div style={{backgroundColor:"#1f2937",padding:"2rem",borderRadius:"1rem",width:"350px"}}>
        <h1 style={{color:"white",marginBottom:"0.5rem"}}>🗒️ AI Notes Summarizer</h1>
        <p style={{color:"#9ca3af",marginBottom:"1.5rem"}}>Login to your account</p>
        {error && <p style={{color:"#f87171",marginBottom:"1rem"}}>{error}</p>}
        <input style={{width:"100%",padding:"0.75rem",marginBottom:"0.75rem",borderRadius:"0.5rem",backgroundColor:"#374151",color:"white",border:"none",boxSizing:"border-box"}}
          placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" style={{width:"100%",padding:"0.75rem",marginBottom:"1rem",borderRadius:"0.5rem",backgroundColor:"#374151",color:"white",border:"none",boxSizing:"border-box"}}
          placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={handleLogin}
          style={{width:"100%",padding:"0.75rem",backgroundColor:"#2563eb",color:"white",border:"none",borderRadius:"0.5rem",cursor:"pointer",fontWeight:"bold",fontSize:"1rem"}}>
          Login
        </button>
        <p style={{color:"#9ca3af",marginTop:"1rem",textAlign:"center"}}>
          No account? <Link to="/register" style={{color:"#60a5fa"}}>Register here</Link>
        </p>
      </div>
    </div>
  );
}