import { Controller, Get, Post, Param, Body, Redirect } from '@nestjs/common'
import { LongUrlDto } from './dto/urls.dto'
import { UrlShortenerService } from './url-shortener.service'

@Controller('shorten')
export class UrlShortenerController {
  constructor(private readonly urlShortenerService: UrlShortenerService) {}

  @Post()
  shortenUrl(@Body('longUrl') longUrl: LongUrlDto) {
    console.log('http://localhost:3000/shorten/hug9'.length)
    return this.urlShortenerService.shortenUrl(longUrl)
  }

  @Get(':id')
  @Redirect()
  async redirect(@Param('id') shortId: string) {
    const longUrl = this.urlShortenerService.getLongUrl(shortId)
    return { url: longUrl }
  }
}
