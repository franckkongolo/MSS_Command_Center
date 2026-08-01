import { DatabaseService } from '../../common/database.service';
export declare class VehiclesService {
    private readonly db;
    constructor(db: DatabaseService);
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    create(input: any): Promise<any>;
    update(id: string, input: any): Promise<any>;
    remove(id: string): Promise<any>;
}
