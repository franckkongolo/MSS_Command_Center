import { DatabaseService } from '../../common/database.service';
export declare class MaintenanceService {
    private readonly db;
    constructor(db: DatabaseService);
    findAll(): Promise<any[]>;
    create(input: any): Promise<any>;
    update(id: string, input: any): Promise<any>;
    remove(id: string): Promise<any>;
}
