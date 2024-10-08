import { BadRequestException, Body, Controller, Get, HttpStatus, NotFoundException, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { QueuesService } from './queues.service';
import CreateQueueDto from './dtos/create-queue';
import { ExpertsService } from 'src/experts/experts.service';

@Controller('queues')
export class QueuesController {
  constructor(
    private readonly queuesService: QueuesService,
    private readonly expertsServices: ExpertsService
  ) {}

  @Post()
  async createQueue(@Body() data: CreateQueueDto, @Res() res: Response) {
    const expert = await this.expertsServices.findExpert(data.expertId);
    if (!expert) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Profissional não encontrado' });
    }

    const queueExists = await this.queuesService.queueExpertExistsToday(data.expertId);
    if (queueExists) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Já existe uma fila para o profissional hoje' });
    }

    const queue = await this.queuesService.createQueue(data);
    return res.status(HttpStatus.CREATED).json(queue);
  }

 
  @Get()
  async getExpertQueues(@Query('expertId') expertId: string, @Res() res: Response) {
    
    if (expertId) {
      const expert = await this.expertsServices.findExpert(expertId);

      if (!expert) {
        throw new NotFoundException('Profissional não encontrado');
      }

      const queues = await this.queuesService.getExpertQueues(expertId);
      return res.json(queues);

    }
  }
  @Get('today')
  async getQueuesToday(@Res() res: Response) {
    const queues = await this.queuesService.getQueuesToday();
    return res.json(queues);
  }
}
