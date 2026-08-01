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
exports.VehiclesService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../common/database.service");
let VehiclesService = class VehiclesService {
    constructor(db) {
        this.db = db;
    }
    async findAll() {
        const data = await this.db.read();
        return data.vehicles.sort((a, b) => String(a.code).localeCompare(String(b.code)));
    }
    async findOne(id) {
        const data = await this.db.read();
        const item = data.vehicles.find(v => v.id === id);
        if (!item)
            throw new common_1.NotFoundException('Véhicule introuvable');
        return { ...item, missions: data.missions.filter(m => m.vehicleId === id), maintenance: data.maintenance.filter(m => m.vehicleId === id), fuelLogs: data.fuelLogs.filter(f => f.vehicleId === id) };
    }
    async create(input) {
        const data = await this.db.read();
        const item = { ...input, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
        data.vehicles.push(item);
        await this.db.write(data);
        return item;
    }
    async update(id, input) {
        const data = await this.db.read();
        const i = data.vehicles.findIndex(v => v.id === id);
        if (i < 0)
            throw new common_1.NotFoundException('Véhicule introuvable');
        data.vehicles[i] = { ...data.vehicles[i], ...input, id };
        await this.db.write(data);
        return data.vehicles[i];
    }
    async remove(id) {
        const data = await this.db.read();
        if (data.missions.some(m => m.vehicleId === id))
            throw new Error('Véhicule lié à une mission');
        const i = data.vehicles.findIndex(v => v.id === id);
        if (i < 0)
            throw new common_1.NotFoundException('Véhicule introuvable');
        const [removed] = data.vehicles.splice(i, 1);
        await this.db.write(data);
        return removed;
    }
};
exports.VehiclesService = VehiclesService;
exports.VehiclesService = VehiclesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], VehiclesService);
//# sourceMappingURL=vehicles.service.js.map