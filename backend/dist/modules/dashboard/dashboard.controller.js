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
exports.DashboardController = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../common/database.service");
let DashboardController = class DashboardController {
    constructor(db) {
        this.db = db;
    }
    async summary() { const d = await this.db.read(); const revenue = d.missions.reduce((a, m) => a + Number(m.revenue || 0), 0), cost = d.missions.reduce((a, m) => a + Number(m.cost || 0), 0), fuelCost = d.fuelLogs.reduce((a, x) => a + Number(x.totalCost || 0), 0), maintenanceCost = d.maintenance.reduce((a, x) => a + Number(x.cost || 0), 0); return { clients: d.clients.length, missions: d.missions.length, activeMissions: d.missions.filter(m => !['Terminée', 'Annulée'].includes(m.status)).length, completedMissions: d.missions.filter(m => m.status === 'Terminée').length, revenue, cost, margin: revenue - cost, vehicles: d.vehicles.length, availableVehicles: d.vehicles.filter(v => v.status === 'Disponible').length, maintenanceVehicles: d.vehicles.filter(v => v.status === 'Maintenance').length, drivers: d.drivers.length, availableDrivers: d.drivers.filter(x => x.status === 'Disponible').length, fuelCost, maintenanceCost }; }
};
exports.DashboardController = DashboardController;
__decorate([
    (0, common_1.Get)('summary'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "summary", null);
exports.DashboardController = DashboardController = __decorate([
    (0, common_1.Controller)('dashboard'),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], DashboardController);
//# sourceMappingURL=dashboard.controller.js.map