import { Body, Controller, HttpStatus, NotFoundException, Param, Patch, Post, Res } from "@nestjs/common";
import { QueuecustomersService } from "./queuecustomers.service";
import CreateQueueCustomersDto from "./dtos/create-queuecustomers";
import { Response } from "express";

@Controller("queuecustomers")
export class QueuecustomersController {
  constructor(private readonly queuecustomersService: QueuecustomersService) {}

  
  @Post()
  async addCustomer(@Body() data: CreateQueueCustomersDto, @Res() res: Response) {
    
     const queueExists = await this.queuecustomersService.getExpertQueueToday(data.expertId);

     if (!queueExists) {
      throw new NotFoundException('Fila não encontrada');
     }

    const customer = await this.queuecustomersService.addCustomer({
      name: data.name,
      service: data.service,
      queueId: queueExists.id,
    });

    return res.status(HttpStatus.CREATED).json(customer); 

  }
  @Patch('id')
  async attendCustomer(@Param('id') id: string, @Res() res: Response) {
    const customer = await this.queuecustomersService.findCustomer(+id)

    if (!customer) {
      throw new NotFoundException('Fila não encontrada');
     }

     await this.queuecustomersService.attendCustomer(customer.Id);
     return res.status(HttpStatus.NO_CONTENT).send();
  }
}
