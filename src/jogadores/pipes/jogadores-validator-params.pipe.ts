import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class JogadorValidatorParamsPipe implements PipeTransform {

    transform(value: any, metadata: ArgumentMetadata) {

        if(!value){
            throw new BadRequestException (`O parametro (${metadata.data}) deve ser informado.`);

        } 
       
        return value;
    }
}