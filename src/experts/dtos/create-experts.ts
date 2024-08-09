import { IsEmail, IsNotEmpty } from "class-validator";

export default class CreateExpertsDto {
  @IsNotEmpty({message: 'O campo é obrigatório'})
  name: string;

  @IsNotEmpty({message: 'O campo é obrigatório'})
  @IsEmail({},{message: 'O campo precisa ter um formato de e-mail válido'})
  email: string;
  phone: string;
}