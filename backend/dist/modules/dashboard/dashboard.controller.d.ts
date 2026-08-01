import { DatabaseService } from '../../common/database.service';
export declare class DashboardController {
    private readonly db;
    constructor(db: DatabaseService);
    summary(): Promise<{
        clients: number;
        missions: number;
        activeMissions: number;
        completedMissions: number;
        revenue: any;
        cost: any;
        margin: number;
        vehicles: number;
        availableVehicles: number;
        maintenanceVehicles: number;
        drivers: number;
        availableDrivers: number;
        fuelCost: any;
        maintenanceCost: any;
    }>;
}
