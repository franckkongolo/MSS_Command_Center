import { Controller,Get } from '@nestjs/common';@Controller('health')export class HealthController{@Get()check(){return{status:'ok',service:'MSS Digital Platform API',version:'3.1.0-alpha'}}}
