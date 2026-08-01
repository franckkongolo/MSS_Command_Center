import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../common/database.service';

export type MissionEvent = { status: string; at: string };

export type Mission = {
  id: string;
  number: string;
  clientId: string;
  service: string;
  origin: string;
  destination: string;
  missionDate: string;
  vehicleId?: string;
  vehicle?: string;
  driverId?: string;
  driver?: string;
  revenue: number;
  cost: number;
  status: string;
  createdAt: string;
  timeline: MissionEvent[];
};

@Injectable()
export class MissionsService {
  constructor(private readonly db: DatabaseService) {}

  async findAll() {
    const data = await this.db.read();
    return data.missions
      .map(m => ({ ...m, client: data.clients.find(c => c.id === m.clientId)?.company || 'Client inconnu', vehicleData:data.vehicles.find(v=>v.id===m.vehicleId), driverData:data.drivers.find(x=>x.id===m.driverId) }))
      .sort((a,b)=>String(b.createdAt).localeCompare(String(a.createdAt)));
  }

  async findOne(id: string) {
    const data = await this.db.read();
    const mission = data.missions.find(m => m.id === id);
    if (!mission) throw new NotFoundException('Mission introuvable');
    return { ...mission, client: data.clients.find(c => c.id === mission.clientId)?.company || 'Client inconnu', vehicleData:data.vehicles.find(v=>v.id===mission.vehicleId), driverData:data.drivers.find(x=>x.id===mission.driverId) };
  }

  async create(input: Omit<Mission,'id'|'number'|'createdAt'|'timeline'>) {
    const data = await this.db.read();
    if (!data.clients.some(c => c.id === input.clientId)) throw new NotFoundException('Client introuvable');
    const year = new Date().getFullYear();
    const sequence = String(data.missions.length + 1).padStart(3,'0');
    const mission: Mission = {
      ...input,
      id: crypto.randomUUID(),
      number: `MIS-${year}-${sequence}`,
      createdAt: new Date().toISOString(),
      timeline: [{ status: input.status, at: new Date().toISOString() }],
    };
    data.missions.unshift(mission);
    await this.db.write(data);
    return { ...mission, client: data.clients.find(c => c.id === mission.clientId)?.company || 'Client inconnu', vehicleData:data.vehicles.find(v=>v.id===mission.vehicleId), driverData:data.drivers.find(x=>x.id===mission.driverId) };
  }

  async update(id: string, input: Partial<Mission>) {
    const data = await this.db.read();
    const index = data.missions.findIndex(m => m.id === id);
    if (index < 0) throw new NotFoundException('Mission introuvable');
    const previous = data.missions[index];
    const next = { ...previous, ...input, id };
    if (input.status && input.status !== previous.status) {
      next.timeline = [...(previous.timeline || []), { status: input.status, at: new Date().toISOString() }];
    }
    data.missions[index] = next;
    await this.db.write(data);
    return { ...next, client: data.clients.find(c => c.id === next.clientId)?.company || 'Client inconnu', vehicleData:data.vehicles.find(v=>v.id===next.vehicleId), driverData:data.drivers.find(x=>x.id===next.driverId) };
  }

  async remove(id: string) {
    const data = await this.db.read();
    const index = data.missions.findIndex(m => m.id === id);
    if (index < 0) throw new NotFoundException('Mission introuvable');
    const [removed] = data.missions.splice(index, 1);
    await this.db.write(data);
    return removed;
  }
}
