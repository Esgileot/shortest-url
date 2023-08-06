import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { LongUrlDto } from 'src/url-shortener/dto/urls.dto'
import { ShortUrl } from './entity/short-url.entity'

@Injectable()
export class UrlShortenerService {
  private readonly shortUrls: ShortUrl[] = []

  shortenUrl(longUrl: LongUrlDto): ShortUrl {
    if (!longUrl) {
      throw new BadRequestException('Provide url')
    }
    const shortId = this.generateRandomShortId()
    const shortUrl = new ShortUrl(shortId, longUrl)
    this.shortUrls.push(shortUrl)
    return shortUrl
  }

  getLongUrl(shortId: string): LongUrlDto {
    const shortUrl = this.shortUrls.find(url => url.shortId === shortId)
    if (!shortUrl) {
      throw new NotFoundException('Short URL not found.')
    }
    return shortUrl.longUrl as LongUrlDto
  }

  private generateRandomShortId(): string {
    // Implement your logic to generate a unique and short ID here
    // For simplicity, we'll use a random 6-character string
    return Math.random().toString(36).slice(2, 8)
  }
}
