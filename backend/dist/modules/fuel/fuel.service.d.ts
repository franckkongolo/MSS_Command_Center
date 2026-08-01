import { DatabaseService } from '../../common/database.service';
export declare class FuelService {
    private readonly db;
    constructor(db: DatabaseService);
    findAll(): Promise<any[]>;
    create(input: any): Promise<any>;
    remove(id: string): Promise<any>;
}
