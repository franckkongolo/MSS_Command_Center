import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DatabaseService } from '../../common/database.service';

@Module({ controllers:[DashboardController], providers:[DatabaseService] })
export class DashboardModule {}
