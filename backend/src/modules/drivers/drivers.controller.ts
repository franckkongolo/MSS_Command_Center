import { Body,Controller,Delete,Get,Param,Patch,Post } from '@nestjs/common';
import { DriversService } from './drivers.service';
@Controller('drivers')
export class DriversController{constructor(private readonly service:DriversService){}@Get()findAll(){return this.service.findAll()}@Get(':id')findOne(@Param('id')id:string){return this.service.findOne(id)}@Post()create(@Body()b:any){return this.service.create(b)}@Patch(':id')update(@Param('id')id:string,@Body()b:any){return this.service.update(id,b)}@Delete(':id')remove(@Param('id')id:string){return this.service.remove(id)}}