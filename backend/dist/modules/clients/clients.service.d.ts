import { DatabaseService } from '../../common/database.service';
export type Client = {
    id: string;
    company: string;
    contactName?: string;
    phone?: string;
    email?: string;
    address?: string;
    sector?: string;
    paymentTerms?: string;
    createdAt: string;
};
export declare class ClientsService {
    private readonly db;
    constructor(db: DatabaseService);
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    create(input: Omit<Client, 'id' | 'createdAt'>): Promise<Client>;
    update(id: string, input: Partial<Client>): Promise<any>;
    remove(id: string): Promise<any>;
}
