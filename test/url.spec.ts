import { Test, TestingModule } from '@nestjs/testing'
import { UrlShortenerController } from 'src/url-shortener/url-shortener.controller'
import { ShortUrl } from 'src/url-shortener/entity/short-url.entity'
import { UrlShortenerService } from 'src/url-shortener/url-shortener.service'
import { NotFoundException } from '@nestjs/common'

describe('UrlShortenerController', () => {
  let controller: UrlShortenerController
  let service: UrlShortenerService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrlShortenerController],
      providers: [UrlShortenerService],
    }).compile()

    controller = module.get<UrlShortenerController>(UrlShortenerController)
    service = module.get<UrlShortenerService>(UrlShortenerService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('shortenUrl', () => {
    it('should create a short URL', () => {
      const longUrl = 'https://www.example.com'
      const expectedShortUrl: ShortUrl = new ShortUrl('abc123', longUrl)
      jest.spyOn(service, 'shortenUrl').mockReturnValue(expectedShortUrl)

      const result = controller.shortenUrl({ longUrl })
      expect(result).toEqual(expectedShortUrl)
    })
  })

  describe('redirect', () => {
    it('should redirect to the long URL', async () => {
      const shortId = 'abc123'
      const longUrl = 'https://www.example.com'
      jest.spyOn(service, 'getLongUrl').mockResolvedValue(longUrl as never)

      const response = await controller.redirect(shortId)
      expect(response.url).toBe(longUrl)
    })

    it('should throw NotFoundException for non-existing short URL', async () => {
      const shortId = 'non_existing_id'
      jest.spyOn(service, 'getLongUrl').mockRejectedValue(new NotFoundException('Short URL not found.') as never)

      await expect(controller.redirect(shortId)).rejects.toThrow(NotFoundException)
    })
  })
})
