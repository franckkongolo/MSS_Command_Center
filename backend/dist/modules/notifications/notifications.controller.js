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
exports.NotificationsController = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../common/database.service");
let NotificationsController = class NotificationsController {
    constructor(db) {
        this.db = db;
    }
    async all() { const d = await this.db.read(); const today = new Date(); const days = (date) => date ? Math.ceil((new Date(date).getTime() - today.getTime()) / 86400000) : 9999; const alerts = []; d.vehicles.forEach(v => { if (days(v.insuranceExpiry) <= 30)
        alerts.push({ type: 'Assurance', severity: days(v.insuranceExpiry) < 0 ? 'Critique' : 'Alerte', title: `Assurance ${v.code}`, description: `Expire le ${v.insuranceExpiry}` }); if (days(v.inspectionExpiry) <= 30)
        alerts.push({ type: 'Contrôle technique', severity: days(v.inspectionExpiry) < 0 ? 'Critique' : 'Alerte', title: `Contrôle ${v.code}`, description: `Expire le ${v.inspectionExpiry}` }); if (Number(v.nextServiceKm || 0) <= Number(v.mileageKm || 0) + 500)
        alerts.push({ type: 'Maintenance', severity: 'Alerte', title: `Entretien ${v.code}`, description: `Prévu à ${v.nextServiceKm} km` }); }); d.drivers.forEach(x => { if (days(x.licenseExpiry) <= 30)
        alerts.push({ type: 'Permis', severity: days(x.licenseExpiry) < 0 ? 'Critique' : 'Alerte', title: x.name, description: `Permis expire le ${x.licenseExpiry}` }); }); return alerts; }
};
exports.NotificationsController = NotificationsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "all", null);
exports.NotificationsController = NotificationsController = __decorate([
    (0, common_1.Controller)('notifications'),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], NotificationsController);
//# sourceMappingURL=notifications.controller.js.map