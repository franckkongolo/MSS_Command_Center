export type DatabaseShape = {
    clients: any[];
    missions: any[];
    vehicles: any[];
    drivers: any[];
    maintenance: any[];
    fuelLogs: any[];
    notifications: any[];
};
export declare class DatabaseService {
    private readonly filePath;
    read(): Promise<DatabaseShape>;
    write(data: DatabaseShape): Promise<void>;
}
