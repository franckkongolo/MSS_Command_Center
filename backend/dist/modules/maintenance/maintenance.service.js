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
exports.MaintenanceService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../common/database.service");
let MaintenanceService = class MaintenanceService {
    constructor(db) {
        this.db = db;
    }
    async findAll() { const d = await this.db.read(); return d.maintenance.map(x => ({ ...x, vehicle: d.vehicles.find(v => v.id === x.vehicleId) })).sort((a, b) => String(b.serviceDate).localeCompare(String(a.serviceDate))); }
    async create(input) { const d = await this.db.read(); const n = String(d.maintenance.length + 1).padStart(3, '0'); const x = { ...input, id: crypto.randomUUID(), number: `MNT-${new Date().getFullYear()}-${n}`, cost: Number(input.cost || 0), nextMileage: Number(input.nextMileage || 0), createdAt: new Date().toISOString() }; d.maintenance.push(x); if (x.status === 'En cours') {
        const v = d.vehicles.find(v => v.id === x.vehicleId);
        if (v)
            v.status = 'Maintenance';
    } await this.db.write(d); return x; }
    async update(id, input) { const d = await this.db.read(); const i = d.maintenance.findIndex(x => x.id === id); if (i < 0)
        throw new common_1.NotFoundException('Maintenance introuvable'); d.maintenance[i] = { ...d.maintenance[i], ...input, id }; const x = d.maintenance[i]; const v = d.vehicles.find(v => v.id === x.vehicleId); if (v)
        v.status = x.status === 'Clôturée' ? 'Disponible' : 'Maintenance'; await this.db.write(d); return x; }
    async remove(id) { const d = await this.db.read(); const i = d.maintenance.findIndex(x => x.id === id); if (i < 0)
        throw new common_1.NotFoundException('Maintenance introuvable'); const [x] = d.maintenance.splice(i, 1); await this.db.write(d); return x; }
};
exports.MaintenanceService = MaintenanceService;
exports.MaintenanceService = MaintenanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], MaintenanceService);
//# sourceMappingURL=maintenance.service.js.map