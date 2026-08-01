import { OnModuleInit } from '@nestjs/common';
export type DatabaseShape = {
    clients: any[];
    missions: any[];
    vehicles: any[];
    drivers: any[];
    maintenance: any[];
    fuelLogs: any[];
    notifications: any[];
};
export declare class DatabaseService implements OnModuleInit {
    private sql;
    private empty;
    onModuleInit(): Promise<void>;
    private normalize;
    read(): Promise<DatabaseShape>;
    write(data: DatabaseShape): Promise<void>;
}
