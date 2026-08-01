import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { DatabaseService } from '../../common/database.service';

@Module({ controllers:[ClientsController], providers:[ClientsService, DatabaseService], exports:[ClientsService] })
export class ClientsModule {}
