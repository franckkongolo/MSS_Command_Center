import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../common/database.service';
@Injectable()
export class DriversService {
  constructor(private readonly db:DatabaseService){}
  async findAll(){const d=await this.db.read();return d.drivers.sort((a,b)=>String(a.name).localeCompare(String(b.name)))}
  async findOne(id:string){const d=await this.db.read();const x=d.drivers.find(v=>v.id===id);if(!x)throw new NotFoundException('Chauffeur introuvable');return {...x,missions:d.missions.filter(m=>m.driverId===id)}}
  async create(input:any){const d=await this.db.read();const x={...input,id:crypto.randomUUID(),createdAt:new Date().toISOString()};d.drivers.push(x);await this.db.write(d);return x}
  async update(id:string,input:any){const d=await this.db.read();const i=d.drivers.findIndex(v=>v.id===id);if(i<0)throw new NotFoundException('Chauffeur introuvable');d.drivers[i]={...d.drivers[i],...input,id};await this.db.write(d);return d.drivers[i]}
  async remove(id:string){const d=await this.db.read();if(d.missions.some(m=>m.driverId===id))throw new Error('Chauffeur lié à une mission');const i=d.drivers.findIndex(v=>v.id===id);if(i<0)throw new NotFoundException('Chauffeur introuvable');const[x]=d.drivers.splice(i,1);await this.db.write(d);return x}
}