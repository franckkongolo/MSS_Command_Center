import { FuelService } from './fuel.service';
export declare class FuelController {
    private readonly s;
    constructor(s: FuelService);
    all(): Promise<any[]>;
    create(b: any): Promise<any>;
    remove(id: string): Promise<any>;
}
