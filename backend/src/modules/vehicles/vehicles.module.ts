import { Module } from '@nestjs/common';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';
import { DatabaseService } from '../../common/database.service';
@Module({controllers:[VehiclesController],providers:[VehiclesService,DatabaseService]})
export class VehiclesModule {}