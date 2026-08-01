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
exports.FuelService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../common/database.service");
let FuelService = class FuelService {
    constructor(db) {
        this.db = db;
    }
    async findAll() { const d = await this.db.read(); return d.fuelLogs.map(x => ({ ...x, vehicle: d.vehicles.find(v => v.id === x.vehicleId) })).sort((a, b) => String(b.fuelDate).localeCompare(String(a.fuelDate))); }
    async create(input) { const d = await this.db.read(); const n = String(d.fuelLogs.length + 1).padStart(3, '0'); const x = { ...input, id: crypto.randomUUID(), number: `FUEL-${new Date().getFullYear()}-${n}`, liters: Number(input.liters || 0), pricePerLiter: Number(input.pricePerLiter || 0), mileage: Number(input.mileage || 0), createdAt: new Date().toISOString() }; x.totalCost = x.liters * x.pricePerLiter; d.fuelLogs.push(x); const v = d.vehicles.find(v => v.id === x.vehicleId); if (v && x.mileage > Number(v.mileageKm || 0))
        v.mileageKm = x.mileage; await this.db.write(d); return x; }
    async remove(id) { const d = await this.db.read(); const i = d.fuelLogs.findIndex(x => x.id === id); if (i < 0)
        throw new common_1.NotFoundException('Ravitaillement introuvable'); const [x] = d.fuelLogs.splice(i, 1); await this.db.write(d); return x; }
};
exports.FuelService = FuelService;
exports.FuelService = FuelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], FuelService);
//# sourceMappingURL=fuel.service.js.map