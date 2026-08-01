import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { dashboardApi,notificationsApi } from '../lib/api';
import type { DashboardSummary,NotificationItem } from '../types';

const data=[{name:'Lun',missions:4},{name:'Mar',missions:7},{name:'Mer',missions:5},{name:'Jeu',missions:9},{name:'Ven',missions:6}];

export default function Dashboard(){
  const [summary,setSummary]=useState<DashboardSummary|null>(null);const[alerts,setAlerts]=useState<NotificationItem[]>([]);
  useEffect(()=>{dashboardApi.summary().then(setSummary).catch(()=>setSummary(null));notificationsApi.list().then(setAlerts)},[]);
  const kpis=[
    ['Clients',summary?.clients ?? '—'],
    ['Missions actives',summary?.activeMissions ?? '—'],
    ['Chiffre d’affaires',summary?`${summary.revenue.toLocaleString()} USD`:'—'],
    ['Marge',summary?`${summary.margin.toLocaleString()} USD`:'—'],['Véhicules disponibles',summary?.availableVehicles??'—'],['Chauffeurs disponibles',summary?.availableDrivers??'—']
  ];
  return <><div className="top"><div><h1>Operations Control Tower</h1><p>Données dynamiques du backend MSS</p></div></div>
  <div className="grid">{kpis.map(([l,v])=><div className="card" key={String(l)}><small>{l}</small><div className="value">{v}</div></div>)}</div>
  <div className="layout"><div className="card"><h3>Live Operations Map</h3><div className="map"><div className="route"/><div className="pin p1">🚚 Kolwezi</div><div className="pin p2">🚚 Fungurume</div><div className="pin p3">🚚 Likasi</div></div></div>
  <div className="card"><h3>Missions cette semaine</h3><ResponsiveContainer width="100%" height={300}><BarChart data={data}><XAxis dataKey="name"/><YAxis/><Tooltip/><Bar dataKey="missions"/></BarChart></ResponsiveContainer></div><div className="card"><h3>Alertes prioritaires</h3>{alerts.slice(0,5).map((a,i)=><div className="alert-row" key={i}><div><strong>{a.title}</strong><p>{a.description}</p></div><span className="badge">{a.severity}</span></div>)}</div></div></>
}
