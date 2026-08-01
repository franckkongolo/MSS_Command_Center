import { Injectable, OnModuleInit } from '@nestjs/common';
import { neon } from '@neondatabase/serverless';

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
export class DatabaseService implements OnModuleInit {
  private sql!: ReturnType<typeof neon>;

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

  async onModuleInit(): Promise<void> {
    const connectionString =
      process.env.STORAGE_URL ||
      process.env.DATABASE_URL;

    if (!connectionString) {
      throw new Error(
        'Variable PostgreSQL absente : STORAGE_URL ou DATABASE_URL.',
      );
    }

    this.sql = neon(connectionString);

    await this.sql`
      CREATE TABLE IF NOT EXISTS mss_application_state (
        id INTEGER PRIMARY KEY,
        payload JSONB NOT NULL,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;

    await this.sql`
      INSERT INTO mss_application_state (id, payload)
      VALUES (1, ${JSON.stringify(this.empty())}::jsonb)
      ON CONFLICT (id) DO NOTHING
    `;
  }

  private normalize(value: any): DatabaseShape {
    return {
      clients: Array.isArray(value?.clients) ? value.clients : [],
      missions: Array.isArray(value?.missions) ? value.missions : [],
      vehicles: Array.isArray(value?.vehicles) ? value.vehicles : [],
      drivers: Array.isArray(value?.drivers) ? value.drivers : [],
      maintenance: Array.isArray(value?.maintenance)
        ? value.maintenance
        : [],
      fuelLogs: Array.isArray(value?.fuelLogs) ? value.fuelLogs : [],
      notifications: Array.isArray(value?.notifications)
        ? value.notifications
        : [],
    };
  }

  async read(): Promise<DatabaseShape> {
    const rows = (await this.sql`
      SELECT payload
      FROM mss_application_state
      WHERE id = 1
      LIMIT 1
    `) as Array<{ payload: unknown }>;

    if (!rows.length) {
      const initial = this.empty();
      await this.write(initial);
      return initial;
    }

    return this.normalize(rows[0].payload);
  }

  async write(data: DatabaseShape): Promise<void> {
    const normalized = this.normalize(data);

    await this.sql`
      INSERT INTO mss_application_state (id, payload, updated_at)
      VALUES (
        1,
        ${JSON.stringify(normalized)}::jsonb,
        NOW()
      )
      ON CONFLICT (id)
      DO UPDATE SET
        payload = EXCLUDED.payload,
        updated_at = NOW()
    `;
  }
}
