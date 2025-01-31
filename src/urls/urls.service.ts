import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Url } from './entities/url.entity';
import { Model } from 'mongoose';
import { CreateUrlDto } from './dto/create-url.dto';
import * as crypto from 'crypto';

@Injectable()
export class UrlsService {

  /**
   * The constructor for the UrlsService.
   * @param shortenedUrlModel The Url model that is used to create, read, update, and delete URLs.
  */
  constructor(@InjectModel(Url.name)private readonly urlModel: Model<Url>) {}
  

  /**
   * Given a long URL, generates a shortened ID that is unique to the long URL.
   * @param longUrl The long URL to generate a shortened ID for.
   * @returns The shortened ID for the given long URL.
   */
    private generateShortenedId(longUrl: string): string {
    const hash = crypto.createHash('sha256').update(longUrl).digest('hex');
    return parseInt(hash.substring(0, 8), 16).toString(36); 
  }
  
  /**
   * Shortens a URL and saves it to the database.
   * @param createShortenedUrlDto The CreateUrlDto that contains the long URL.
   * @returns The Url object that was saved to the database.
  */
  async shortenUrl(createShortenedUrlDto: CreateUrlDto): Promise<Url> {
    
    const { longUrl } = createShortenedUrlDto;
    const shortenedId = this.generateShortenedId(longUrl);
    
    const existingUrl = await this.urlModel.findOne({ shortenedId });
    if (existingUrl) {
      throw new BadRequestException('This url already been shortened, please try again');
    }

    const shortenedUrl = new this.urlModel({longUrl, shortenedId });

    await shortenedUrl.save();

    return shortenedUrl;
  }


  /**
   * Given a shortenedId, redirect to the original URL.
   * @param shortenedId The shortenedId of the URL to redirect to.
   * @returns The original URL.
   * @throws {NotFoundException} If the URL is not found.
  */
  async redirect(shortenedId: string): Promise<string> {

    const url = await this.urlModel.findOne({ shortenedId });

    if (!url) {
      throw new NotFoundException('URL not found');
    }

    return url.longUrl;
  }

}
