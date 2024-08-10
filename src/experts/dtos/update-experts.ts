import { PartialType } from "@nestjs/mapped-types";
import { IsEmail, IsNotEmpty } from "class-validator";
import CreateExpertsDto from "./create-experts";

export default class updateExpertDto extends PartialType(CreateExpertsDto) {
  
}