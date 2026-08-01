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
exports.DriversService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../common/database.service");
let DriversService = class DriversService {
    constructor(db) {
        this.db = db;
    }
    async findAll() { const d = await this.db.read(); return d.drivers.sort((a, b) => String(a.name).localeCompare(String(b.name))); }
    async findOne(id) { const d = await this.db.read(); const x = d.drivers.find(v => v.id === id); if (!x)
        throw new common_1.NotFoundException('Chauffeur introuvable'); return { ...x, missions: d.missions.filter(m => m.driverId === id) }; }
    async create(input) { const d = await this.db.read(); const x = { ...input, id: crypto.randomUUID(), createdAt: new Date().toISOString() }; d.drivers.push(x); await this.db.write(d); return x; }
    async update(id, input) { const d = await this.db.read(); const i = d.drivers.findIndex(v => v.id === id); if (i < 0)
        throw new common_1.NotFoundException('Chauffeur introuvable'); d.drivers[i] = { ...d.drivers[i], ...input, id }; await this.db.write(d); return d.drivers[i]; }
    async remove(id) { const d = await this.db.read(); if (d.missions.some(m => m.driverId === id))
        throw new Error('Chauffeur lié à une mission'); const i = d.drivers.findIndex(v => v.id === id); if (i < 0)
        throw new common_1.NotFoundException('Chauffeur introuvable'); const [x] = d.drivers.splice(i, 1); await this.db.write(d); return x; }
};
exports.DriversService = DriversService;
exports.DriversService = DriversService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], DriversService);
//# sourceMappingURL=drivers.service.js.map