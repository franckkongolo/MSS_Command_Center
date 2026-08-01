import { MaintenanceService } from './maintenance.service';
export declare class MaintenanceController {
    private readonly s;
    constructor(s: MaintenanceService);
    all(): Promise<any[]>;
    create(b: any): Promise<any>;
    update(id: string, b: any): Promise<any>;
    remove(id: string): Promise<any>;
}
