import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import CreateQueueCustomersDto from "./dtos/create-queuecustomers";

type CreateCustomer = {
  name: string
  service: string
  queueId: string
}

@Injectable()
export class QueuecustomersService {
  constructor(private readonly prisma: PrismaService) {}

  async addCustomer(data: CreateCustomer) {
    return await this.prisma.queueCustomer.create({
      data: {
        name: data.name,
        services: data.service,
        queueId: data.queueId,
      },
    })
  }

  async getExpertQueueToday(expertId: string) {
    return await this.prisma.queue.findFirst({
      where: {
        expertId,
        createdAt: {
          equals: new Date(),
        },
      },
    });
  }

  async attendCustomer(cutomerId: number) {
    await this.prisma.queueCustomer.update({
      where: {
       Id: cutomerId
      },
      data: {
        isAwaiting: false,
      }
    })
  }

  async findCustomer(cutomerId: number) {
    return await this.prisma.queueCustomer.findFirst({
      where: {
        Id: cutomerId,
      },
    });

  }

  async deleteCustomer(cutomerId: number) {
    await this.prisma.queueCustomer.delete({
      where: {
        Id: cutomerId,
      },
    });
  }
}
