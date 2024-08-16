import { Controller } from '@nestjs/common';
import { QueuecustomersService } from './queuecustomers.service';

@Controller('queuecustomers')
export class QueuecustomersController {
  constructor(private readonly queuecustomersService: QueuecustomersService) {}
}
