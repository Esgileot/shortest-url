import { LongUrlDto } from 'src/url-shortener/dto/urls.dto'

export class ShortUrl {
  shortId: string
  longUrl: LongUrlDto | string
  createdAt: Date

  constructor(shortId: string, longUrl: LongUrlDto | string) {
    this.shortId = shortId
    this.longUrl = longUrl
    this.createdAt = new Date()
  }
}
