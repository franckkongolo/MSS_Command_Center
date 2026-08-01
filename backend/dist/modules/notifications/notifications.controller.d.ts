import { DatabaseService } from '../../common/database.service';
export declare class NotificationsController {
    private readonly db;
    constructor(db: DatabaseService);
    all(): Promise<any[]>;
}
