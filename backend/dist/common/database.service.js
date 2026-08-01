"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const common_1 = require("@nestjs/common");
const serverless_1 = require("@neondatabase/serverless");
let DatabaseService = class DatabaseService {
    empty() {
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
    async onModuleInit() {
        const connectionString = process.env.STORAGE_URL ||
            process.env.DATABASE_URL;
        if (!connectionString) {
            throw new Error('Variable PostgreSQL absente : STORAGE_URL ou DATABASE_URL.');
        }
        this.sql = (0, serverless_1.neon)(connectionString);
        await this.sql `
      CREATE TABLE IF NOT EXISTS mss_application_state (
        id INTEGER PRIMARY KEY,
        payload JSONB NOT NULL,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;
        await this.sql `
      INSERT INTO mss_application_state (id, payload)
      VALUES (1, ${JSON.stringify(this.empty())}::jsonb)
      ON CONFLICT (id) DO NOTHING
    `;
    }
    normalize(value) {
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
    async read() {
        const rows = (await this.sql `
      SELECT payload
      FROM mss_application_state
      WHERE id = 1
      LIMIT 1
    `);
        if (!rows.length) {
            const initial = this.empty();
            await this.write(initial);
            return initial;
        }
        return this.normalize(rows[0].payload);
    }
    async write(data) {
        const normalized = this.normalize(data);
        await this.sql `
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
};
exports.DatabaseService = DatabaseService;
exports.DatabaseService = DatabaseService = __decorate([
    (0, common_1.Injectable)()
], DatabaseService);
//# sourceMappingURL=database.service.js.map