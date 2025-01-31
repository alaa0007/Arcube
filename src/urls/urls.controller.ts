import { Body, Controller, Get, Param, Post, Redirect } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { CreateUrlDto } from './dto/create-url.dto';


@Controller()
export class UrlsController {

  constructor(private readonly urlsService: UrlsService) {}

  /**
   * Given a long URL, shorten it and return a shortened URL.
   * @param createShortenedUrlDto The long URL to shorten.
   * @returns The shortened URL.
  */
  @Post("/shorten")
  async shorten(@Body() createShortenedUrlDto: CreateUrlDto) {
    const shortenedUrl = await this.urlsService.shortenUrl(createShortenedUrlDto);
    return { 
      code : 200,
      message: "Success",
      shortenedUrl: shortenedUrl.shortenedId
    };
  }

  /**
   * Given a shortenedId, redirect to the original URL.
   * @param shortenedId The shortenedId of the URL to redirect to.
   * @returns The original URL.
   * @throws {NotFoundException} If the URL is not found.
  */
  @Get(':id')
  @Redirect()
  async redirect(@Param('id') shortenedId: string) {
    const longUrl = await this.urlsService.redirect(shortenedId);
    return  {
      code : 301,
      message: "Success",
      url: longUrl
    }
  }

}
