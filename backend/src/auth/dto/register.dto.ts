import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword({
    minLength: 8,
    minSymbols: 0,
  })
  password: string;
}
