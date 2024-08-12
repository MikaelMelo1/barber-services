import { IsNotEmpty } from "class-validator";

export default class CreateQueueDto {
  @IsNotEmpty({
    message: 'O campo expert é obrigatório'
  })
  expertId: string
}