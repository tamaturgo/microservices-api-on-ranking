import { IsNotEmpty } from "class-validator"

export class UpdatePlayerDTO{
    
    @IsNotEmpty()
    readonly phoneNumber:string;
    
    @IsNotEmpty()
    readonly name:string;
}   