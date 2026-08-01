import { Mission, MissionsService } from './missions.service';
export declare class MissionsController {
    private readonly service;
    constructor(service: MissionsService);
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    create(body: Omit<Mission, 'id' | 'number' | 'createdAt' | 'timeline'>): Promise<{
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
        timeline: import("./missions.service").MissionEvent[];
    }>;
    update(id: string, body: Partial<Mission>): Promise<any>;
    remove(id: string): Promise<any>;
}
