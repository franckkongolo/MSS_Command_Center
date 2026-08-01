import { Injectable } from '@nestjs/common';
import { promises as fs } from 'node:fs';
import { join } from 'node:path';

export type DatabaseShape = {
  clients: any[];
  missions: any[];
  vehicles: any[];
  drivers: any[];
  maintenance: any[];
  fuelLogs: any[];
  notifications: any[];
};

@Injectable()
export class DatabaseService {
  private readonly filePath = join(process.cwd(), 'data', 'db.json');

  async read(): Promise<DatabaseShape> {
    try {
      const raw = await fs.readFile(this.filePath, 'utf8');
      const parsed = JSON.parse(raw);
      return {
        clients: Array.isArray(parsed.clients) ? parsed.clients : [],
        missions: Array.isArray(parsed.missions) ? parsed.missions : [],
        vehicles: Array.isArray(parsed.vehicles) ? parsed.vehicles : [],
        drivers: Array.isArray(parsed.drivers) ? parsed.drivers : [],
        maintenance: Array.isArray(parsed.maintenance) ? parsed.maintenance : [],
        fuelLogs: Array.isArray(parsed.fuelLogs) ? parsed.fuelLogs : [],
        notifications: Array.isArray(parsed.notifications) ? parsed.notifications : [],
      };
    } catch {
      const empty: DatabaseShape = {
        clients: [], missions: [], vehicles: [], drivers: [],
        maintenance: [], fuelLogs: [], notifications: [],
      };
      await this.write(empty);
      return empty;
    }
  }

  async write(data: DatabaseShape): Promise<void> {
    await fs.mkdir(join(process.cwd(), 'data'), { recursive: true });
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf8');
  }
}
