import type { Client, DashboardSummary, Mission, Vehicle, Driver, Maintenance, FuelLog, NotificationItem } from '../types';

const API=import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

async function request<T>(path:string,init?:RequestInit):Promise<T>{
  const r=await fetch(`${API}${path}`,{
    headers:{'Content-Type':'application/json'},
    ...init
  });
  if(!r.ok){
    const message=await r.text();
    throw new Error(message || `Erreur HTTP ${r.status}`);
  }
  return r.json();
}

export const clientsApi={
  list:()=>request<Client[]>('/clients'),
  get:(id:string)=>request<Client>(`/clients/${id}`),
  create:(data:Omit<Client,'id'|'createdAt'>)=>request<Client>('/clients',{method:'POST',body:JSON.stringify(data)}),
  update:(id:string,data:Partial<Client>)=>request<Client>(`/clients/${id}`,{method:'PATCH',body:JSON.stringify(data)}),
  remove:(id:string)=>request<Client>(`/clients/${id}`,{method:'DELETE'}),
};

export const missionsApi={
  list:()=>request<Mission[]>('/missions'),
  get:(id:string)=>request<Mission>(`/missions/${id}`),
  create:(data:Omit<Mission,'id'|'number'|'createdAt'|'timeline'|'client'>)=>request<Mission>('/missions',{method:'POST',body:JSON.stringify(data)}),
  update:(id:string,data:Partial<Mission>)=>request<Mission>(`/missions/${id}`,{method:'PATCH',body:JSON.stringify(data)}),
  remove:(id:string)=>request<Mission>(`/missions/${id}`,{method:'DELETE'}),
};

export const dashboardApi={
  summary:()=>request<DashboardSummary>('/dashboard/summary'),
};

export const vehiclesApi={
  list:()=>request<Vehicle[]>('/vehicles'),
  get:(id:string)=>request<Vehicle>(`/vehicles/${id}`),
  create:(data:Omit<Vehicle,'id'|'createdAt'>)=>request<Vehicle>('/vehicles',{method:'POST',body:JSON.stringify(data)}),
  update:(id:string,data:Partial<Vehicle>)=>request<Vehicle>(`/vehicles/${id}`,{method:'PATCH',body:JSON.stringify(data)}),
  remove:(id:string)=>request<Vehicle>(`/vehicles/${id}`,{method:'DELETE'}),
};
export const driversApi={
  list:()=>request<Driver[]>('/drivers'),
  get:(id:string)=>request<Driver>(`/drivers/${id}`),
  create:(data:Omit<Driver,'id'|'createdAt'>)=>request<Driver>('/drivers',{method:'POST',body:JSON.stringify(data)}),
  update:(id:string,data:Partial<Driver>)=>request<Driver>(`/drivers/${id}`,{method:'PATCH',body:JSON.stringify(data)}),
  remove:(id:string)=>request<Driver>(`/drivers/${id}`,{method:'DELETE'}),
};
export const maintenanceApi={
  list:()=>request<Maintenance[]>('/maintenance'),
  create:(data:any)=>request<Maintenance>('/maintenance',{method:'POST',body:JSON.stringify(data)}),
  update:(id:string,data:any)=>request<Maintenance>(`/maintenance/${id}`,{method:'PATCH',body:JSON.stringify(data)}),
  remove:(id:string)=>request<Maintenance>(`/maintenance/${id}`,{method:'DELETE'}),
};
export const fuelApi={
  list:()=>request<FuelLog[]>('/fuel'),
  create:(data:any)=>request<FuelLog>('/fuel',{method:'POST',body:JSON.stringify(data)}),
  remove:(id:string)=>request<FuelLog>(`/fuel/${id}`,{method:'DELETE'}),
};
export const notificationsApi={list:()=>request<NotificationItem[]>('/notifications')};
