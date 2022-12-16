import { IsEmail, IsNotEmpty } from "class-validator"

export class CreatePlayerDTO{
    
    @IsNotEmpty()
    readonly phoneNumber:string;
    
    @IsNotEmpty()
    @IsEmail()
    readonly email:string;

    @IsNotEmpty()
    readonly name:string;
}   