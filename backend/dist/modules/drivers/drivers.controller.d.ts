import { DriversService } from './drivers.service';
export declare class DriversController {
    private readonly service;
    constructor(service: DriversService);
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    create(b: any): Promise<any>;
    update(id: string, b: any): Promise<any>;
    remove(id: string): Promise<any>;
}
