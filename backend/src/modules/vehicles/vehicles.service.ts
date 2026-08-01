import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../common/database.service';

@Injectable()
export class VehiclesService {
  constructor(private readonly db: DatabaseService) {}
  async findAll() {
    const data=await this.db.read();
    return data.vehicles.sort((a,b)=>String(a.code).localeCompare(String(b.code)));
  }
  async findOne(id:string) {
    const data=await this.db.read();
    const item=data.vehicles.find(v=>v.id===id);
    if(!item) throw new NotFoundException('Véhicule introuvable');
    return {...item, missions:data.missions.filter(m=>m.vehicleId===id), maintenance:data.maintenance.filter(m=>m.vehicleId===id), fuelLogs:data.fuelLogs.filter(f=>f.vehicleId===id)};
  }
  async create(input:any) {
    const data=await this.db.read();
    const item={...input,id:crypto.randomUUID(),createdAt:new Date().toISOString()};
    data.vehicles.push(item);await this.db.write(data);return item;
  }
  async update(id:string,input:any) {
    const data=await this.db.read();const i=data.vehicles.findIndex(v=>v.id===id);
    if(i<0) throw new NotFoundException('Véhicule introuvable');
    data.vehicles[i]={...data.vehicles[i],...input,id};await this.db.write(data);return data.vehicles[i];
  }
  async remove(id:string) {
    const data=await this.db.read();
    if(data.missions.some(m=>m.vehicleId===id)) throw new Error('Véhicule lié à une mission');
    const i=data.vehicles.findIndex(v=>v.id===id);if(i<0) throw new NotFoundException('Véhicule introuvable');
    const [removed]=data.vehicles.splice(i,1);await this.db.write(data);return removed;
  }
}