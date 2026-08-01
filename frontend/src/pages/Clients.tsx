import { FormEvent, useEffect, useState } from 'react';
import { clientsApi } from '../lib/api';
import type { Client } from '../types';

const blank={company:'',contactName:'',phone:'',email:'',address:'',sector:'',paymentTerms:'30 jours'};

export default function Clients(){
  const [clients,setClients]=useState<Client[]>([]);
  const [form,setForm]=useState(blank);
  const [open,setOpen]=useState(false);
  const [editing,setEditing]=useState<Client|null>(null);
  const [error,setError]=useState('');

  const load=async()=>{try{setClients(await clientsApi.list());setError('')}catch(e){setError('API indisponible. Vérifie le backend.')}};
  useEffect(()=>{void load()},[]);

  function startEdit(c:Client){
    setEditing(c);
    setForm({
      company:c.company,contactName:c.contactName||'',phone:c.phone||'',email:c.email||'',
      address:c.address||'',sector:c.sector||'',paymentTerms:c.paymentTerms||''
    });
    setOpen(true);
  }

  async function submit(e:FormEvent){
    e.preventDefault();
    if(editing) await clientsApi.update(editing.id,form);
    else await clientsApi.create(form);
    setForm(blank);setEditing(null);setOpen(false);await load();
  }

  async function remove(id:string){
    if(!confirm('Supprimer ce client ?'))return;
    try{await clientsApi.remove(id);await load()}catch{alert('Impossible de supprimer ce client car il est lié à une mission.')}
  }

  return <><div className="top"><div><h1>CRM Clients</h1><p>Clients, contacts et conditions commerciales</p></div><button className="btn" onClick={()=>{setEditing(null);setForm(blank);setOpen(true)}}>＋ Nouveau client</button></div>
  {error&&<div className="card" style={{color:'#b42318'}}>{error}</div>}
  <div className="grid"><div className="card"><small>Total clients</small><div className="value">{clients.length}</div></div><div className="card"><small>Secteurs représentés</small><div className="value">{new Set(clients.map(c=>c.sector).filter(Boolean)).size}</div></div></div>
  <div className="card"><table className="table"><thead><tr><th>Entreprise</th><th>Contact</th><th>Téléphone</th><th>Email</th><th>Secteur</th><th>Conditions</th><th>Actions</th></tr></thead><tbody>
  {clients.map(c=><tr key={c.id}><td><strong>{c.company}</strong><br/><small>{c.address||'—'}</small></td><td>{c.contactName||'—'}</td><td>{c.phone||'—'}</td><td>{c.email||'—'}</td><td><span className="badge">{c.sector||'Non défini'}</span></td><td>{c.paymentTerms||'—'}</td><td><button className="mini" onClick={()=>startEdit(c)}>Modifier</button> <button className="mini danger" onClick={()=>remove(c.id)}>Supprimer</button></td></tr>)}
  </tbody></table></div>
  {open&&<div className="overlay"><form className="modal-form" onSubmit={submit}><h2>{editing?'Modifier le client':'Nouveau client'}</h2>
    <label>Entreprise<input required value={form.company} onChange={e=>setForm({...form,company:e.target.value})}/></label>
    <label>Contact principal<input value={form.contactName} onChange={e=>setForm({...form,contactName:e.target.value})}/></label>
    <label>Téléphone<input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></label>
    <label>Email<input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label>
    <label>Adresse<input value={form.address} onChange={e=>setForm({...form,address:e.target.value})}/></label>
    <label>Secteur<input placeholder="Mine, importateur, industrie..." value={form.sector} onChange={e=>setForm({...form,sector:e.target.value})}/></label>
    <label>Conditions de paiement<input value={form.paymentTerms} onChange={e=>setForm({...form,paymentTerms:e.target.value})}/></label>
    <div className="modal-actions"><button type="button" className="mini" onClick={()=>setOpen(false)}>Annuler</button><button className="btn">Enregistrer</button></div>
  </form></div>}
  </>
}
