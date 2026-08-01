import { useState } from 'react';
export default function Login({onLogin}:{onLogin:()=>void}){
 const [email,setEmail]=useState('admin@mssdrc.com');const [password,setPassword]=useState('admin123');
 return <div className="login"><form className="login-card" onSubmit={e=>{e.preventDefault();if(email==='admin@mssdrc.com'&&password==='admin123')onLogin();}}><h1>MSS Command Center</h1><p>Cloud Ready V3.1</p><label>Email<input value={email} onChange={e=>setEmail(e.target.value)}/></label><label>Mot de passe<input type="password" value={password} onChange={e=>setPassword(e.target.value)}/></label><button className="btn" style={{width:'100%'}}>Se connecter</button></form></div>
}