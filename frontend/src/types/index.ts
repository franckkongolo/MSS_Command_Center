export type Role='ADMIN'|'DIRECTION'|'DISPATCHER'|'COMMERCIAL'|'FINANCE'|'DRIVER'|'CLIENT';

export interface Client {
  id:string;
  company:string;
  contactName?:string;
  phone?:string;
  email?:string;
  address?:string;
  sector?:string;
  paymentTerms?:string;
  createdAt:string;
}

export interface MissionEvent { status:string; at:string; }

export interface Mission {
  id:string;
  number:string;
  clientId:string;
  client:string;
  service:string;
  origin:string;
  destination:string;
  missionDate:string;
  vehicle?:string;
  driver?:string;
  revenue:number;
  cost:number;
  status:string;
  createdAt:string;
  timeline:MissionEvent[];
}

export interface DashboardSummary {
  clients:number;
  missions:number;
  activeMissions:number;
  completedMissions:number;
  revenue:number;
  cost:number;
  margin:number; vehicles:number; availableVehicles:number; maintenanceVehicles:number; drivers:number; availableDrivers:number; fuelCost:number; maintenanceCost:number;
}

export interface Vehicle {
  id:string; code:string; registration:string; brand:string; model:string; year:number;
  type:string; capacityTons:number; mileageKm:number; status:string; location?:string;
  insuranceExpiry?:string; inspectionExpiry?:string; nextServiceKm?:number; fuelType?:string; createdAt:string;
  missions?:Mission[]; maintenance?:Maintenance[]; fuelLogs?:FuelLog[];
}
export interface Driver {
  id:string; employeeCode:string; name:string; phone?:string; email?:string; licenseNumber?:string;
  licenseCategory?:string; licenseExpiry?:string; medicalExpiry?:string; hseStatus?:string;
  status:string; rating?:number; createdAt:string; missions?:Mission[];
}
export interface Maintenance {
  id:string; number:string; vehicleId:string; vehicle?:Vehicle; serviceDate:string; type:string;
  description?:string; garage?:string; cost:number; nextDate?:string; nextMileage?:number; status:string; createdAt:string;
}
export interface FuelLog {
  id:string; number:string; vehicleId:string; vehicle?:Vehicle; fuelDate:string; liters:number;
  pricePerLiter:number; totalCost:number; mileage:number; station?:string; reference?:string; createdAt:string;
}
export interface NotificationItem { type:string; severity:string; title:string; description:string; }
