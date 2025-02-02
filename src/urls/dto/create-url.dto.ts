import { IsUrl, IsString } from 'class-validator';

export class CreateUrlDto {
    @IsString()
    @IsUrl()
    longUrl: string;
}