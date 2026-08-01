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
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
let DatabaseService = class DatabaseService {
    constructor() {
        this.filePath = (0, node_path_1.join)(process.cwd(), 'data', 'db.json');
    }
    async read() {
        try {
            const raw = await node_fs_1.promises.readFile(this.filePath, 'utf8');
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
        }
        catch {
            const empty = {
                clients: [], missions: [], vehicles: [], drivers: [],
                maintenance: [], fuelLogs: [], notifications: [],
            };
            await this.write(empty);
            return empty;
        }
    }
    async write(data) {
        await node_fs_1.promises.mkdir((0, node_path_1.join)(process.cwd(), 'data'), { recursive: true });
        await node_fs_1.promises.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf8');
    }
};
exports.DatabaseService = DatabaseService;
exports.DatabaseService = DatabaseService = __decorate([
    (0, common_1.Injectable)()
], DatabaseService);
//# sourceMappingURL=database.service.js.map