import { DatabaseService } from '../../common/database.service';
export type MissionEvent = {
    status: string;
    at: string;
};
export type Mission = {
    id: string;
    number: string;
    clientId: string;
    service: string;
    origin: string;
    destination: string;
    missionDate: string;
    vehicleId?: string;
    vehicle?: string;
    driverId?: string;
    driver?: string;
    revenue: number;
    cost: number;
    status: string;
    createdAt: string;
    timeline: MissionEvent[];
};
export declare class MissionsService {
    private readonly db;
    constructor(db: DatabaseService);
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    create(input: Omit<Mission, 'id' | 'number' | 'createdAt' | 'timeline'>): Promise<{
        client: any;
        vehicleData: any;
        driverData: any;
        id: string;
        number: string;
        clientId: string;
        service: string;
        origin: string;
        destination: string;
        missionDate: string;
        vehicleId?: string;
        vehicle?: string;
        driverId?: string;
        driver?: string;
        revenue: number;
        cost: number;
        status: string;
        createdAt: string;
        timeline: MissionEvent[];
    }>;
    update(id: string, input: Partial<Mission>): Promise<any>;
    remove(id: string): Promise<any>;
}
