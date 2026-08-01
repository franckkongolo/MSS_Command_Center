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
  private readonly seedPath = join(process.cwd(), 'data', 'db.json');

  private readonly runtimePath =
    process.env.VERCEL
      ? '/tmp/mss-command-center-db.json'
      : this.seedPath;

  private empty(): DatabaseShape {
    return {
      clients: [],
      missions: [],
      vehicles: [],
      drivers: [],
      maintenance: [],
      fuelLogs: [],
      notifications: [],
    };
  }

  private normalize(parsed: any): DatabaseShape {
    return {
      clients: Array.isArray(parsed?.clients) ? parsed.clients : [],
      missions: Array.isArray(parsed?.missions) ? parsed.missions : [],
      vehicles: Array.isArray(parsed?.vehicles) ? parsed.vehicles : [],
      drivers: Array.isArray(parsed?.drivers) ? parsed.drivers : [],
      maintenance: Array.isArray(parsed?.maintenance) ? parsed.maintenance : [],
      fuelLogs: Array.isArray(parsed?.fuelLogs) ? parsed.fuelLogs : [],
      notifications: Array.isArray(parsed?.notifications)
        ? parsed.notifications
        : [],
    };
  }

  async read(): Promise<DatabaseShape> {
    try {
      const raw = await fs.readFile(this.runtimePath, 'utf8');
      return this.normalize(JSON.parse(raw));
    } catch {}

    try {
      const raw = await fs.readFile(this.seedPath, 'utf8');
      const data = this.normalize(JSON.parse(raw));

      if (process.env.VERCEL) {
        await fs.writeFile(
          this.runtimePath,
          JSON.stringify(data, null, 2),
          'utf8',
        );
      }

      return data;
    } catch {
      return this.empty();
    }
  }

  async write(data: DatabaseShape): Promise<void> {
    if (!process.env.VERCEL) {
      await fs.mkdir(join(process.cwd(), 'data'), { recursive: true });
    }

    await fs.writeFile(
      this.runtimePath,
      JSON.stringify(data, null, 2),
      'utf8',
    );
  }
}
