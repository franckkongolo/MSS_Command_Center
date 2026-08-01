import { FormEvent, useEffect, useMemo, useState } from 'react';
import { clientsApi, missionsApi, vehiclesApi, driversApi } from '../lib/api';
import type { Client, Mission, Vehicle, Driver } from '../types';

const blank={clientId:'',service:'Transport',origin:'Kolwezi',destination:'',missionDate:new Date().toISOString().slice(0,10),vehicleId:'',driverId:'',revenue:0,cost:0,status:'Planifiée'};

export default function Operations(){
  const [missions,setMissions]=useState<Mission[]>([]);
  const [clients,setClients]=useState<Client[]>([]);const [vehicles,setVehicles]=useState<Vehicle[]>([]);const [drivers,setDrivers]=useState<Driver[]>([]);
  const [form,setForm]=useState(blank);
  const [open,setOpen]=useState(false);
  const [selected,setSelected]=useState<Mission|null>(null);
  const [editing,setEditing]=useState<Mission|null>(null);
  const [error,setError]=useState('');

  const load=async()=>{try{const [m,c,v,d]=await Promise.all([missionsApi.list(),clientsApi.list(),vehiclesApi.list(),driversApi.list()]);setMissions(m);setClients(c);setVehicles(v);setDrivers(d);setError('')}catch{setError('API indisponible. Vérifie que le backend fonctionne sur le port 3000.')}};
  useEffect(()=>{void load()},[]);
  const totalMargin=useMemo(()=>missions.reduce((a,m)=>a+m.revenue-m.cost,0),[missions]);

  function newMission(){setEditing(null);setForm({...blank,clientId:clients[0]?.id||''});setOpen(true)}
  function editMission(m:Mission){setEditing(m);setForm({clientId:m.clientId,service:m.service,origin:m.origin,destination:m.destination,missionDate:m.missionDate,vehicleId:(m as any).vehicleId||'',driverId:(m as any).driverId||'',revenue:m.revenue,cost:m.cost,status:m.status});setOpen(true)}

  async function submit(e:FormEvent){
    e.preventDefault();
    const payload={...form,revenue:Number(form.revenue),cost:Number(form.cost)};
    if(editing)await missionsApi.update(editing.id,payload);
    else await missionsApi.create(payload);
    setForm(blank);setEditing(null);setOpen(false);await load();
  }

  async function advance(m:Mission){
    const flow=['Planifiée','Confirmée','Chargement','En route','Arrivée','POD signé','Terminée'];
    const i=flow.indexOf(m.status);
    if(i<flow.length-1){await missionsApi.update(m.id,{status:flow[i+1]});await load()}
  }
  async function remove(id:string){if(confirm('Supprimer cette mission ?')){await missionsApi.remove(id);setSelected(null);await load()}}

  return <><div className="top"><div><h1>Operations</h1><p>Missions et clients connectés à l’API</p></div><button className="btn" onClick={newMission}>＋ Nouvelle mission</button></div>
  {error&&<div className="card" style={{color:'#b42318'}}>{error}</div>}
  <div className="grid"><div className="card"><small>Total missions</small><div className="value">{missions.length}</div></div><div className="card"><small>En cours</small><div className="value">{missions.filter(m=>!['Terminée','Annulée'].includes(m.status)).length}</div></div><div className="card"><small>Revenu</small><div className="value">{missions.reduce((a,m)=>a+m.revenue,0).toLocaleString()} USD</div></div><div className="card"><small>Marge</small><div className="value">{totalMargin.toLocaleString()} USD</div></div></div>

  <div className="ops-layout"><div className="card"><table className="table"><thead><tr><th>Mission</th><th>Client</th><th>Trajet</th><th>Revenu</th><th>Statut</th><th>Actions</th></tr></thead><tbody>
  {missions.map(m=><tr key={m.id} onClick={()=>setSelected(m)} style={{cursor:'pointer'}}><td><strong>{m.number}</strong><br/><small>{m.service}</small></td><td>{m.client}</td><td>{m.origin} → {m.destination}</td><td>{m.revenue.toLocaleString()} USD</td><td><span className="badge">{m.status}</span></td><td onClick={e=>e.stopPropagation()}><button className="mini" onClick={()=>advance(m)}>Avancer</button> <button className="mini" onClick={()=>editMission(m)}>Modifier</button> <button className="mini danger" onClick={()=>remove(m.id)}>Supprimer</button></td></tr>)}
  </tbody></table></div>

  <div className="card detail-panel">{selected?<><h3>{selected.number}</h3><p><strong>Client :</strong> {selected.client}</p><p><strong>Service :</strong> {selected.service}</p><p><strong>Trajet :</strong> {selected.origin} → {selected.destination}</p><p><strong>Véhicule :</strong> {(selected as any).vehicleData?`${(selected as any).vehicleData.code} — ${(selected as any).vehicleData.model}`:'Non affecté'}</p><p><strong>Chauffeur :</strong> {(selected as any).driverData?.name||'Non affecté'}</p><p><strong>Marge :</strong> {(selected.revenue-selected.cost).toLocaleString()} USD</p><h4>Timeline</h4><div className="timeline">{(selected.timeline||[]).map((e,i)=><div className="timeline-row" key={i}><span>●</span><div><strong>{e.status}</strong><small>{new Date(e.at).toLocaleString('fr-FR')}</small></div></div>)}</div></>:<div style={{color:'#6b778c'}}>Clique sur une mission pour voir les détails.</div>}</div></div>

  {open&&<div className="overlay"><form className="modal-form" onSubmit={submit}><h2>{editing?'Modifier la mission':'Nouvelle mission'}</h2>
    <label>Client<select required value={form.clientId} onChange={e=>setForm({...form,clientId:e.target.value})}><option value="">Sélectionner</option>{clients.map(c=><option key={c.id} value={c.id}>{c.company}</option>)}</select></label>
    <label>Service<select value={form.service} onChange={e=>setForm({...form,service:e.target.value})}><option>Transport</option><option>Distribution</option><option>Cold Chain</option><option>Location</option><option>Levage</option></select></label>
    <label>Origine<input required value={form.origin} onChange={e=>setForm({...form,origin:e.target.value})}/></label>
    <label>Destination<input required value={form.destination} onChange={e=>setForm({...form,destination:e.target.value})}/></label>
    <label>Date<input type="date" value={form.missionDate} onChange={e=>setForm({...form,missionDate:e.target.value})}/></label>
    <label>Véhicule<select value={form.vehicleId} onChange={e=>setForm({...form,vehicleId:e.target.value})}><option value="">Non affecté</option>{vehicles.filter(v=>v.status==="Disponible"||v.id===form.vehicleId).map(v=><option value={v.id}>{v.code} — {v.brand} {v.model}</option>)}</select></label>
    <label>Chauffeur<select value={form.driverId} onChange={e=>setForm({...form,driverId:e.target.value})}><option value="">Non affecté</option>{drivers.filter(d=>d.status==="Disponible"||d.id===form.driverId).map(d=><option value={d.id}>{d.employeeCode} — {d.name}</option>)}</select></label>
    <label>Revenu USD<input type="number" value={form.revenue} onChange={e=>setForm({...form,revenue:Number(e.target.value)})}/></label>
    <label>Coût USD<input type="number" value={form.cost} onChange={e=>setForm({...form,cost:Number(e.target.value)})}/></label>
    <label>Statut<select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}><option>Planifiée</option><option>Confirmée</option><option>Chargement</option><option>En route</option><option>Arrivée</option><option>POD signé</option><option>Terminée</option></select></label>
    <div className="modal-actions"><button type="button" className="mini" onClick={()=>setOpen(false)}>Annuler</button><button className="btn">Enregistrer</button></div>
  </form></div>}
  </>
}
