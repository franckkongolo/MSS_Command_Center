import { Client, ClientsService } from './clients.service';
export declare class ClientsController {
    private readonly service;
    constructor(service: ClientsService);
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    create(body: Omit<Client, 'id' | 'createdAt'>): Promise<Client>;
    update(id: string, body: Partial<Client>): Promise<any>;
    remove(id: string): Promise<any>;
}
