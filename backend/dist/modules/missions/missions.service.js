"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissionsService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../common/database.service");
let MissionsService = class MissionsService {
    constructor(db) {
        this.db = db;
    }
    async findAll() {
        const data = await this.db.read();
        return data.missions
            .map(m => ({ ...m, client: data.clients.find(c => c.id === m.clientId)?.company || 'Client inconnu', vehicleData: data.vehicles.find(v => v.id === m.vehicleId), driverData: data.drivers.find(x => x.id === m.driverId) }))
            .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
    }
    async findOne(id) {
        const data = await this.db.read();
        const mission = data.missions.find(m => m.id === id);
        if (!mission)
            throw new common_1.NotFoundException('Mission introuvable');
        return { ...mission, client: data.clients.find(c => c.id === mission.clientId)?.company || 'Client inconnu', vehicleData: data.vehicles.find(v => v.id === mission.vehicleId), driverData: data.drivers.find(x => x.id === mission.driverId) };
    }
    async create(input) {
        const data = await this.db.read();
        if (!data.clients.some(c => c.id === input.clientId))
            throw new common_1.NotFoundException('Client introuvable');
        const year = new Date().getFullYear();
        const sequence = String(data.missions.length + 1).padStart(3, '0');
        const mission = {
            ...input,
            id: crypto.randomUUID(),
            number: `MIS-${year}-${sequence}`,
            createdAt: new Date().toISOString(),
            timeline: [{ status: input.status, at: new Date().toISOString() }],
        };
        data.missions.unshift(mission);
        await this.db.write(data);
        return { ...mission, client: data.clients.find(c => c.id === mission.clientId)?.company || 'Client inconnu', vehicleData: data.vehicles.find(v => v.id === mission.vehicleId), driverData: data.drivers.find(x => x.id === mission.driverId) };
    }
    async update(id, input) {
        const data = await this.db.read();
        const index = data.missions.findIndex(m => m.id === id);
        if (index < 0)
            throw new common_1.NotFoundException('Mission introuvable');
        const previous = data.missions[index];
        const next = { ...previous, ...input, id };
        if (input.status && input.status !== previous.status) {
            next.timeline = [...(previous.timeline || []), { status: input.status, at: new Date().toISOString() }];
        }
        data.missions[index] = next;
        await this.db.write(data);
        return { ...next, client: data.clients.find(c => c.id === next.clientId)?.company || 'Client inconnu', vehicleData: data.vehicles.find(v => v.id === next.vehicleId), driverData: data.drivers.find(x => x.id === next.driverId) };
    }
    async remove(id) {
        const data = await this.db.read();
        const index = data.missions.findIndex(m => m.id === id);
        if (index < 0)
            throw new common_1.NotFoundException('Mission introuvable');
        const [removed] = data.missions.splice(index, 1);
        await this.db.write(data);
        return removed;
    }
};
exports.MissionsService = MissionsService;
exports.MissionsService = MissionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], MissionsService);
//# sourceMappingURL=missions.service.js.map