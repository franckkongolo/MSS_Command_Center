import { VehiclesService } from './vehicles.service';
export declare class VehiclesController {
    private readonly service;
    constructor(service: VehiclesService);
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    create(body: any): Promise<any>;
    update(id: string, body: any): Promise<any>;
    remove(id: string): Promise<any>;
}
