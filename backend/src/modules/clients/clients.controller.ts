import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Client, ClientsService } from './clients.service';

@Controller('clients')
export class ClientsController {
  constructor(private readonly service: ClientsService) {}
  @Get() findAll() { return this.service.findAll(); }
  @Get(':id') findOne(@Param('id') id: string) { return this.service.findOne(id); }
  @Post() create(@Body() body: Omit<Client,'id'|'createdAt'>) { return this.service.create(body); }
  @Patch(':id') update(@Param('id') id: string, @Body() body: Partial<Client>) { return this.service.update(id, body); }
  @Delete(':id') remove(@Param('id') id: string) { return this.service.remove(id); }
}
