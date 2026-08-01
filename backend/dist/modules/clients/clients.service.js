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
exports.ClientsService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../common/database.service");
let ClientsService = class ClientsService {
    constructor(db) {
        this.db = db;
    }
    async findAll() {
        const data = await this.db.read();
        return data.clients.sort((a, b) => String(a.company).localeCompare(String(b.company)));
    }
    async findOne(id) {
        const data = await this.db.read();
        const client = data.clients.find(c => c.id === id);
        if (!client)
            throw new common_1.NotFoundException('Client introuvable');
        return client;
    }
    async create(input) {
        const data = await this.db.read();
        const client = {
            ...input,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
        };
        data.clients.push(client);
        await this.db.write(data);
        return client;
    }
    async update(id, input) {
        const data = await this.db.read();
        const index = data.clients.findIndex(c => c.id === id);
        if (index < 0)
            throw new common_1.NotFoundException('Client introuvable');
        data.clients[index] = { ...data.clients[index], ...input, id };
        await this.db.write(data);
        return data.clients[index];
    }
    async remove(id) {
        const data = await this.db.read();
        const index = data.clients.findIndex(c => c.id === id);
        if (index < 0)
            throw new common_1.NotFoundException('Client introuvable');
        const used = data.missions.some(m => m.clientId === id);
        if (used)
            throw new Error('Ce client est lié à une mission et ne peut pas être supprimé.');
        const [removed] = data.clients.splice(index, 1);
        await this.db.write(data);
        return removed;
    }
};
exports.ClientsService = ClientsService;
exports.ClientsService = ClientsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], ClientsService);
//# sourceMappingURL=clients.service.js.map